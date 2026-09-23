const FREE_SHIPPING_THRESHOLD = 500000;
const SHIPPING_COST = 15000;
const VOUCHERS = { "TOKOLAB10": 0.10, "HEMAT20": 0.20 };

const products = [
  { id: 1, name: "Keyboard Mekanik TKL",       category: "Peripheral", price: 450000,  stock: 12 },
  { id: 2, name: "Mouse Gaming Wireless",       category: "Peripheral", price: 275000,  stock: 8  },
  { id: 3, name: "Monitor IPS 24 Inch",         category: "Display",    price: 1850000, stock: 5  },
  { id: 4, name: "Webcam HD 1080p",             category: "Peripheral", price: 320000,  stock: 15 },
  { id: 5, name: "Headset Gaming Surround",     category: "Audio",      price: 410000,  stock: 20 },
  { id: 6, name: "SSD NVMe 512GB",              category: "Storage",    price: 650000,  stock: 10 },
  { id: 7, name: "Speaker Bluetooth Portable",  category: "Audio",      price: 380000,  stock: 7  },
  { id: 8, name: "Mousepad XL Gaming",          category: "Peripheral", price: 95000,   stock: 30 },
  { id: 9, name: "RAM DDR4 16GB",               category: "Component",  price: 720000,  stock: 6  },
  { id: 10, name: "Cooling Pad Laptop",         category: "Aksesoris",  price: 210000,  stock: 0  },
  { id: 11, name: "Hub USB-C 6-in-1",           category: "Aksesoris",  price: 265000,  stock: 14 },
  { id: 12, name: "Flashdisk 64GB",             category: "Storage",    price: 85000,   stock: 40 },
];

const cart = {}; // id -> qty
let voucherApplied = null;

const rupiah = (n) => "Rp" + Math.round(n).toLocaleString("id-ID");
const initial = (name) => name.trim().charAt(0).toUpperCase();

// Populate category dropdown
const categorySelect = document.getElementById("categorySelect");
[...new Set(products.map(p => p.category))].sort().forEach(cat => {
  const opt = document.createElement("option");
  opt.value = cat; opt.textContent = cat;
  categorySelect.appendChild(opt);
});

const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const productGrid = document.getElementById("productGrid");
const resultCount = document.getElementById("resultCount");

function getFilteredProducts(){
  let list = products.filter(p =>
    p.name.toLowerCase().includes(searchInput.value.trim().toLowerCase()) &&
    (categorySelect.value === "semua" || p.category === categorySelect.value)
  );
  switch(sortSelect.value){
    case "harga-asc": list.sort((a,b)=>a.price-b.price); break;
    case "harga-desc": list.sort((a,b)=>b.price-a.price); break;
    case "nama-az": list.sort((a,b)=>a.name.localeCompare(b.name)); break;
    case "stok-desc": list.sort((a,b)=>b.stock-a.stock); break;
  }
  return list;
}

function renderProducts(){
  const list = getFilteredProducts();
  resultCount.innerHTML = `<b>${list.length}</b> produk ditampilkan dari total: <b>${products.length}</b>`;

  productGrid.innerHTML = "";
  if(list.length === 0){
    productGrid.innerHTML = `<div class="empty-state">Produk tidak ditemukan. Coba kata kunci atau kategori lain.</div>`;
    return;
  }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    const outOfStock = p.stock <= 0;
    card.innerHTML = `
      <div class="initial-badge">${initial(p.name)}</div>
      <div class="product-category">${p.category}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-price">${rupiah(p.price)}</div>
      <div class="product-stock">Stok tersisa: ${p.stock}</div>
      <button class="add-btn" data-id="${p.id}" ${outOfStock ? "disabled" : ""}>${outOfStock ? "Stok Habis" : "Tambahkan"}</button>
    `;
    productGrid.appendChild(card);
  });

  productGrid.querySelectorAll(".add-btn:not(:disabled)").forEach(btn=>{
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
  });
}

function addToCart(id){
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
}
function changeQty(id, delta){
  if(!cart[id]) return;
  cart[id] += delta;
  if(cart[id] <= 0) delete cart[id];
  renderCart();
}

const cartStatus = document.getElementById("cartStatus");
const cartItemsEl = document.getElementById("cartItems");
const shippingNote = document.getElementById("shippingNote");
const progressFill = document.getElementById("progressFill");
const sumSubtotal = document.getElementById("sumSubtotal");
const sumDiscount = document.getElementById("sumDiscount");
const sumShipping = document.getElementById("sumShipping");
const sumTotal = document.getElementById("sumTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const voucherInput = document.getElementById("voucherInput");
const voucherBtn = document.getElementById("voucherBtn");
const voucherMsg = document.getElementById("voucherMsg");

function renderCart(){
  const entries = Object.entries(cart);
  const totalQty = entries.reduce((s,[,q])=>s+q,0);

  cartStatus.textContent = totalQty === 0
    ? "Keranjang masih kosong"
    : `${totalQty} produk di keranjang`;

  cartItemsEl.innerHTML = "";
  entries.forEach(([id, qty]) => {
    const p = products.find(pr => pr.id === Number(id));
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="ci-badge">${initial(p.name)}</div>
      <div class="ci-info">
        <div class="ci-name">${p.name}</div>
        <div class="ci-meta">${rupiah(p.price)}</div>
      </div>
      <div class="qty-ctrl">
        <button data-act="dec" data-id="${p.id}">−</button>
        <span>${qty}</span>
        <button data-act="inc" data-id="${p.id}">+</button>
      </div>
    `;
    cartItemsEl.appendChild(row);
  });
  cartItemsEl.querySelectorAll("button").forEach(b=>{
    b.addEventListener("click", ()=> changeQty(Number(b.dataset.id), b.dataset.act === "inc" ? 1 : -1));
  });

  const subtotal = entries.reduce((s,[id,qty]) => {
    const p = products.find(pr => pr.id === Number(id));
    return s + p.price * qty;
  }, 0);

  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const pct = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  progressFill.style.width = pct + "%";
  shippingNote.innerHTML = remaining > 0
    ? `Belanja <b>${rupiah(remaining)}</b> lagi untuk gratis ongkir`
    : `<b>Selamat, kamu dapat gratis ongkir!</b>`;

  const discount = voucherApplied ? subtotal * voucherApplied.rate : 0;
  const shippingCost = (totalQty === 0) ? 0 : (remaining > 0 ? SHIPPING_COST : 0);
  const total = subtotal - discount + shippingCost;

  sumSubtotal.textContent = rupiah(subtotal);
  sumDiscount.textContent = "-" + rupiah(discount);
  sumShipping.textContent = totalQty === 0 ? rupiah(0) : (shippingCost === 0 ? "Gratis" : rupiah(shippingCost));
  sumTotal.textContent = rupiah(total);

  checkoutBtn.disabled = totalQty === 0;
}

voucherBtn.addEventListener("click", () => {
  const code = voucherInput.value.trim().toUpperCase();
  if(!code){
    voucherMsg.textContent = "";
    return;
  }
  if(VOUCHERS[code]){
    voucherApplied = { code, rate: VOUCHERS[code] };
    voucherMsg.textContent = `Voucher "${code}" diterapkan (-${VOUCHERS[code]*100}%)`;
    voucherMsg.className = "voucher-msg ok";
  } else {
    voucherApplied = null;
    voucherMsg.textContent = "Kode voucher tidak valid";
    voucherMsg.className = "voucher-msg err";
  }
  renderCart();
});

checkoutBtn.addEventListener("click", () => {
  if(checkoutBtn.disabled) return;
  alert("Checkout berhasil! Terima kasih sudah berbelanja di TokoLab.");
  for(const k in cart) delete cart[k];
  voucherApplied = null;
  voucherInput.value = "";
  voucherMsg.textContent = "";
  renderCart();
});

searchInput.addEventListener("input", renderProducts);
categorySelect.addEventListener("change", renderProducts);
sortSelect.addEventListener("change", renderProducts);

renderProducts();
renderCart();