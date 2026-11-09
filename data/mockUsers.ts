export interface User {
  id: string;
  name: string;
  email: string;
  role: "Dosen Pengampu" | "Mahasiswa" | "Admin Pusat";
  fakultas: string;
}

export const mockUsers: User[] = [
  // --- DOSEN (Format: nama_depan@mail.unpad.ac.id) ---
  {
    id: "DOSEN-01",
    name: "Dr. Budi Santoso, M.T.",
    email: "budi@mail.unpad.ac.id",
    role: "Dosen Pengampu",
    fakultas: "FMIPA",
  },
  {
    id: "DOSEN-02",
    name: "Dr. Siti Nurhaliza, M.Si.",
    email: "siti@mail.unpad.ac.id",
    role: "Dosen Pengampu",
    fakultas: "FMIPA",
  },
  {
    id: "DOSEN-03",
    name: "Prof. Dr. Asep Setiawan, M.Sc.",
    email: "asep@mail.unpad.ac.id",
    role: "Dosen Pengampu",
    fakultas: "FMIPA",
  },
  {
    id: "DOSEN-04",
    name: "Dr. Dewi Lestari, M.T.",
    email: "dewi@mail.unpad.ac.id",
    role: "Dosen Pengampu",
    fakultas: "FMIPA",
  },
  {
    id: "DOSEN-05",
    name: "Ir. Eko Prasetyo, Ph.D.",
    email: "eko@mail.unpad.ac.id",
    role: "Dosen Pengampu",
    fakultas: "FMIPA",
  },

  // --- ADMINISTRATOR ---
  {
    id: "ADMIN-01",
    name: "Admin Dirmik Pusat",
    email: "admin.dirmik@mail.unpad.ac.id",
    role: "Admin Pusat",
    fakultas: "Universitas Padjadjaran",
  },

  // --- MAHASISWA (Format: nama + tahun angkatan + nomor urut, misal: syaikha24025@mail.unpad.ac.id) ---
  {
    id: "140810240025",
    name: "Syaikha Habibtiana Widi Sukamto",
    email: "syaikha24025@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240001",
    name: "Rian Pratama",
    email: "rian24001@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240002",
    name: "Aisha Kinasih Susanto",
    email: "aisha24002@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240003",
    name: "M. Razky Nur",
    email: "razky24003@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240004",
    name: "Azhar Fathin Tsuraya",
    email: "azhar24004@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240005",
    name: "Rehan Aziz Hardiansyah",
    email: "rehan24005@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240006",
    name: "Syifa Azzahra",
    email: "syifa24006@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240007",
    name: "Raynard Wijaya",
    email: "raynard24007@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240008",
    name: "Rafie Ahmad",
    email: "rafie24008@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240009",
    name: "Laudzan Al Ghifari",
    email: "laudzan24009@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240010",
    name: "Banung Nugroho",
    email: "banung24010@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240011",
    name: "Nabilah Putri",
    email: "nabilah24011@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240012",
    name: "Fajar Ramadhan",
    email: "fajar24012@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240013",
    name: "Zahra Aulia",
    email: "zahra24013@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240014",
    name: "Rizki Fauzi",
    email: "rizki24014@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240015",
    name: "Anisa Nurul",
    email: "anisa24015@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240016",
    name: "Dimas Anggara",
    email: "dimas24016@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240017",
    name: "Citra Kirana",
    email: "citra24017@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240018",
    name: "Fauzan Al Farizi",
    email: "fauzan24018@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  },
  {
    id: "140810240019",
    name: "Intan Permata",
    email: "intan24019@mail.unpad.ac.id",
    role: "Mahasiswa",
    fakultas: "FMIPA",
  }
];