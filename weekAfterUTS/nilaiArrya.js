const nilai = [70, 85, 60, 90, 55];
let total = 0;

for (const n of nilai) {
  total += n;
}

const rataRata = total / nilai.length;
console.log(`Total: ${total}, Rata-rata: ${rataRata}`);
//Total: 360, Rata-rata: 72