const harga = 150000;
const diskonPersen = 20;
const potongan = harga * (diskonPersen / 100);
const hargaAkhir = harga - potongan;

console.log(`Harga awal: Rp${harga}`);
console.log(`Diskon ${diskonPersen}% = Rp${potongan}`);
console.log(`Harga akhir: Rp${hargaAkhir}`);

const status = hargaAkhir < 100000 ? "Murah" : "Mahal";
console.log(`Status: ${status}`);

// for: mencetak angka 1 sampai 5
for (let i = 1; i <= 5; i++) {
console.log(Perulangan ke-${i});
}
// while: menghitung mundur
let sisa = 3;
while (sisa > 0) {
console.log(Hitung mundur: ${sisa});
sisa--;
}
// for...of: mengulang isi array
const buah = ["apel", "jeruk", "mangga"];
for (const item of buah) {
console.log(Buah: ${item});
}

