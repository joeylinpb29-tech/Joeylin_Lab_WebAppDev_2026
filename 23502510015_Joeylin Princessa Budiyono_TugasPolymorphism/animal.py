class Animal:
    def __init__(self, nama, umur, habitat, berat):
        self.nama = nama
        self.umur = umur
        self.habitat = habitat
        self.berat = berat

    def bergerak(self):
        print(f"{self.nama} bergerak dengan caranya sendiri.")

    def bersuara(self):
        print(f"{self.nama} mengeluarkan suara.")

    def makan(self):
        print(f"{self.nama} sedang makan.")

    def tidur(self):
        print(f"{self.nama} tidur untuk memulihkan energi.")

    def kebutuhan_makan(self):
        kebutuhan = self.berat * 0.05 + (1 if self.umur < 2 else 0.5)
        return round(kebutuhan, 2)

    def tampilkan_info(self):
        print("=" * 40)
        print(f"Nama    : {self.nama}")
        print(f"Jenis   : {self.__class__.__name__}")
        print(f"Umur    : {self.umur} tahun")
        print(f"Berat   : {self.berat} kg")
        print(f"Habitat : {self.habitat}")


class Kuda(Animal):
    def bergerak(self):
        print(f"{self.nama} berlari cepat menggunakan empat kaki.")

    def bersuara(self):
        print(f"{self.nama} bersuara meringkik.")

    def makan(self):
        print(f"{self.nama} sedang memakan rumput.")

    def tidur(self):
        print(f"{self.nama} tidur sambil berdiri di kandangnya.")


class Bangau(Animal):
    def bergerak(self):
        print(f"{self.nama} terbang menggunakan kedua sayapnya.")

    def bersuara(self):
        print(f"{self.nama} mengeluarkan suara berkaok.")

    def makan(self):
        print(f"{self.nama} sedang mencari ikan kecil.")

    def tidur(self):
        print(f"{self.nama} tidur berdiri dengan satu kaki di rawa.")


class Ikan(Animal):
    def bergerak(self):
        print(f"{self.nama} berenang menggunakan siripnya.")

    def bersuara(self):
        print(f"{self.nama} tidak bersuara, tetapi menghasilkan gelembung.")

    def makan(self):
        print(f"{self.nama} sedang memakan plankton.")

    def tidur(self):
        print(f"{self.nama} tidur dengan mata tetap terbuka di dalam air.")


class Bebek(Animal):
    def bergerak(self):
        print(f"{self.nama} berjalan dan berenang di permukaan air.")

    def bersuara(self):
        print(f"{self.nama} bersuara kwek-kwek.")

    def makan(self):
        print(f"{self.nama} sedang memakan biji-bijian.")

    def tidur(self):
        print(f"{self.nama} tidur mengapung di atas air danau.")