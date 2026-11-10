-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 09 Nov 2026 pada 15.50
-- Versi server: 8.0.43
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_monitoring_unpad`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('Dosen Pengampu','Mahasiswa','Admin Pusat') COLLATE utf8mb4_general_ci NOT NULL,
  `fakultas` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `dosen_wali_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `fakultas`, `dosen_wali_id`) VALUES
('DOSEN-01', 'Dr. Budi Santoso, M.T.', 'budi@mail.unpad.ac.id', 'password123', 'Dosen Pengampu', 'FMIPA', NULL),
('DOSEN-02', 'Dr. Dewi Lestari, M.T.', 'dewi@mail.unpad.ac.id', 'password123', 'Dosen Pengampu', 'FMIPA', NULL),
('ADMIN-01', 'Admin Dirmik Pusat', 'admin.dirmik@mail.unpad.ac.id', 'password123', 'Admin Pusat', 'Universitas Padjadjaran', NULL),
('MHS-002', 'Aisha Kinasih Susanto', 'aisha24002@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-003', 'M. Razky Nur', 'razky24003@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-012', 'Rian Pratama', 'rian24012@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-025', 'Syaikha Habibtiana Widi Sukamto', 'syaikha24025@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-055', 'Peter Pettigrew', 'peter24055@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-01', 'Harry Potter', 'harry2401@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-02', 'Hermione Granger', 'hermione2402@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-03', 'Ron Weasley', 'ron2403@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-04', 'Draco Malfoy', 'draco2404@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-05', 'Luna Lovegood', 'luna2405@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-06', 'Neville Longbottom', 'neville2406@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-07', 'Ginny Weasley', 'ginny2407@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-08', 'Cedric Diggory', 'cedric2408@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-09', 'Cho Chang', 'cho2409@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-10', 'Sirius Black', 'sirius2410@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-11', 'Remus Lupin', 'remus2411@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-12', 'Severus Snape', 'severus2412@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-13', 'Albus Dumbledore', 'albus2413@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-14', 'Minerva McGonagall', 'minerva2414@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-15', 'Rubeus Hagrid', 'hagrid2415@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-16', 'Bellatrix Lestrange', 'bellatrix2416@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-17', 'Nymphadora Tonks', 'tonks2417@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-18', 'George Weasley', 'george2418@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-19', 'Fred Weasley', 'fred2419@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-HP-20', 'Peter Pettigrew', 'peter2420@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-02'),
('MHS-LOTR-01', 'Aragorn Elessar', 'aragorn2401@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-02', 'Legolas Greenleaf', 'legolas2402@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-03', 'Gimli Gloin', 'gimli2403@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-04', 'Frodo Baggins', 'frodo2404@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-05', 'Samwise Gamgee', 'samwise2405@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-06', 'Meriadoc Brandybuck', 'merry2406@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-07', 'Peregrin Took', 'pippin2407@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-08', 'Boromir Denethor', 'boromir2408@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-09', 'Faramir Denethor', 'faramir2409@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-10', 'Gandalf Grey', 'gandalf2410@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-11', 'Elrond Peredhel', 'elrond2411@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-12', 'Arwen Undomiel', 'arwen2412@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-13', 'Galadriel Lorien', 'galadriel2413@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-14', 'Thranduil Oropher', 'thranduil2414@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-15', 'Eomer Eomund', 'eomer2415@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-16', 'Eowyn Thengel', 'eowyn2416@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-17', 'Theoden Thengel', 'theoden2417@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-18', 'Treebeard Fangorn', 'treebeard2418@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-19', 'Bilbo Baggins', 'bilbo2419@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01'),
('MHS-LOTR-20', 'Gollum Smeagol', 'gollum2420@mail.unpad.ac.id', 'password123', 'Mahasiswa', 'FMIPA', 'DOSEN-01');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
