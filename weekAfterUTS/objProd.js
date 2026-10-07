const produk = {
  nama: "Laptop",
  harga: 15000000,
  stok: 10,
  infoProduct() {
    console.log(`Nama: ${this.nama}`);
    console.log(`Harga: Rp${this.harga}`);
    console.log(`Stok: ${this.stok}`);
  }
};

produk.infoProduct();