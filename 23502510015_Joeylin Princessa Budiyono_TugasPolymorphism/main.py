from animal import Kuda, Bangau, Ikan, Bebek

daftar_hewan = [
    Kuda("Bima", 5, "Padang rumput", 350),
    Bangau("Banu", 3, "Daerah rawa", 4),
    Ikan("Nemo", 2, "Laut", 1),
    Bebek("Doni", 1, "Danau", 2),
]

for hewan in daftar_hewan:
    hewan.tampilkan_info()
    hewan.bergerak()
    hewan.bersuara()
    hewan.makan()
    hewan.tidur()
    print(f"Kebutuhan makan harian: {hewan.kebutuhan_makan()} kg")
    print("=" * 40)
    print()