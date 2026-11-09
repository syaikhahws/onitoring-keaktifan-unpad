"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function DosenDashboardContent() {
  const [activeMenu, setActiveMenu] = useState<'dashboard' | 'matkul' | 'mahasiswa'>('dashboard');
  const searchParams = useSearchParams();

  const namaDosen = searchParams.get('nama') || "Dr. Dewi Lestari, M.T.";
  const nipDosen = searchParams.get('nip') || "197805122005011002";

  // Tentukan ID dosen berdasarkan nama untuk memfilter data mahasiswa wali dari database
  const dosenId = namaDosen.includes("Dewi") ? "DOSEN-02" : "DOSEN-01";

  const [mahasiswaList, setMahasiswaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [qrStatus, setQrStatus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetch(`/api/mahasiswa?dosen_id=${dosenId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMahasiswaList(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat mahasiswa:", err);
        setLoading(false);
      });
  }, [dosenId]);

  // Data Mata Kuliah yang Diampu oleh Dosen
  const daftarMataKuliah = [
    { id: "IF-301", nama: "Basis Data (Kelas A)", jadwal: "Senin, 08:00 - 10:30 WIB", ruang: "Lab Komputer 1", peserta: 40 },
    { id: "IF-303", nama: "Pemrograman Web (Kelas B)", jadwal: "Selasa, 13:00 - 15:30 WIB", ruang: "R. Kuliah 2.04", peserta: 38 },
    { id: "IF-305", nama: "Algoritma & Pemrograman (Kelas A)", jadwal: "Rabu, 10:00 - 12:30 WIB", ruang: "Lab RPL", peserta: 42 },
  ];

  const toggleQr = (id: string) => {
    setQrStatus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const mahasiswaBerisiko = mahasiswaList.filter(m => m.status_risiko !== 'Aktif');
  const totalMahasiswa = mahasiswaList.length;
  const jumlahAktif = totalMahasiswa - mahasiswaBerisiko.length;
  const persenAktif = totalMahasiswa > 0 ? Math.round((jumlahAktif / totalMahasiswa) * 100) : 0;
  const persenBerisiko = totalMahasiswa > 0 ? Math.round((mahasiswaBerisiko.length / totalMahasiswa) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans flex flex-col">
      
      {/* Top Navbar Kampus */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 h-16 flex items-center justify-between px-6 shadow-xs">
        <div className="flex items-center space-x-3">
          <img 
            src="/logo-unpad.jpg" 
            alt="Logo Unpad" 
            className="w-10 h-10 object-contain rounded-lg shadow-xs" 
          />
          <div>
            <h1 className="text-sm font-extrabold text-stone-900 tracking-wide uppercase">Portal Dosen Unpad</h1>
            <p className="text-xs text-stone-500 font-medium">Universitas Padjadjaran</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-stone-900">{namaDosen}</p>
            <p className="text-xs text-stone-500 font-medium">NIP. {nipDosen}</p>
          </div>
          <a
            href="/login"
            className="px-4 py-2 text-xs font-bold text-orange-700 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition shadow-xs"
          >
            Keluar
          </a>
        </div>
      </header>

      {/* Main Container dengan Sidebar Kiri */}
      <div className="flex flex-1">
        
        {/* Sidebar Kiri */}
        <aside className="w-72 bg-white border-r border-stone-200 hidden md:flex flex-col p-5 space-y-3 sticky top-16 h-[calc(100vh-4rem)] shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400 px-3 mb-1">Menu Utama</p>
          
          <button
            onClick={() => setActiveMenu('dashboard')}
            className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-bold transition shadow-xs ${
              activeMenu === 'dashboard'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-stone-700 hover:bg-orange-50 hover:text-orange-700'
            }`}
          >
            <span className="text-base">📊</span>
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveMenu('matkul')}
            className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-bold transition shadow-xs ${
              activeMenu === 'matkul'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-stone-700 hover:bg-orange-50 hover:text-orange-700'
            }`}
          >
            <span className="text-base">📚</span>
            <span>Mata Kuliah & Buat QR</span>
          </button>

          <button
            onClick={() => setActiveMenu('mahasiswa')}
            className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-bold transition shadow-xs ${
              activeMenu === 'mahasiswa'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-stone-700 hover:bg-orange-50 hover:text-orange-700'
            }`}
          >
            <span className="text-base">🎓</span>
            <span>Mahasiswa Wali</span>
          </button>
        </aside>

        {/* Konten Utama di Sebelah Kanan */}
        <main className="flex-1 p-8 max-w-6xl mx-auto">
          
          {/* MENU 1: DASHBOARD */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">Dashboard & Early Warning System (EWS)</h2>
                <p className="text-sm text-stone-600 mt-1">Ringkasan aktivitas akademik serta pemantauan mahasiswa bimbingan yang memerlukan perhatian khusus.</p>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Mata Kuliah Diampu</p>
                  <p className="text-3xl font-extrabold text-stone-900 mt-2">3 Kelas</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Mahasiswa Wali</p>
                  <p className="text-3xl font-extrabold text-stone-900 mt-2">{totalMahasiswa} Orang</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Perlu Perhatian (EWS)</p>
                  <p className="text-3xl font-extrabold text-orange-600 mt-2">{mahasiswaBerisiko.length} Mahasiswa</p>
                </div>
              </div>

              {/* Grafik Ringkasan Keaktifan */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6">
                <h3 className="text-base font-bold text-stone-900 mb-1">Grafik Rasio Keaktifan Mahasiswa Wali</h3>
                <p className="text-xs text-stone-500 mb-6 font-medium">Persentase keseluruhan tingkat kehadiran dan keaktifan mahasiswa bimbingan.</p>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-stone-700">Mahasiswa Aktif & Hadir Optimal</span>
                      <span className="text-emerald-600">{persenAktif}% ({jumlahAktif} Orang)</span>
                    </div>
                    <div className="w-full bg-stone-100 h-3.5 rounded-full overflow-hidden shadow-inner">
                      <div className="bg-emerald-500 h-3.5 rounded-full transition-all duration-500" style={{ width: `${persenAktif}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-stone-700">Mahasiswa Perlu Perhatian / Tidak Aktif</span>
                      <span className="text-orange-600">{persenBerisiko}% ({mahasiswaBerisiko.length} Orang)</span>
                    </div>
                    <div className="w-full bg-stone-100 h-3.5 rounded-full overflow-hidden shadow-inner">
                      <div className="bg-orange-600 h-3.5 rounded-full transition-all duration-500" style={{ width: `${persenBerisiko}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabel EWS (Hanya Menampilkan yang Perlu Perhatian) */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
                <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/50 flex justify-between items-center">
                  <h3 className="text-base font-bold text-stone-900">Daftar Pantauan Khusus (EWS) Mahasiswa Wali</h3>
                  <span className="text-xs font-bold text-orange-700 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-xl">
                    {mahasiswaBerisiko.length} Mahasiswa Perlu Tindakan
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-stone-200 text-stone-500 text-xs font-extrabold uppercase bg-stone-50 tracking-wider">
                        <th className="py-3.5 px-6">Mahasiswa</th>
                        <th className="py-3.5 px-6">Kelas</th>
                        <th className="py-3.5 px-6">Alpa</th>
                        <th className="py-3.5 px-6">Skor</th>
                        <th className="py-3.5 px-6 text-right">Tindakan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-800">
                      {mahasiswaBerisiko.length === 0 ? (
                        <tr><td colSpan={5} className="py-6 text-center text-xs text-stone-400 font-medium">Tidak ada mahasiswa wali yang berisiko.</td></tr>
                      ) : (
                        mahasiswaBerisiko.map((mhs) => (
                          <tr key={mhs.nim} className="bg-orange-50/20 font-medium">
                            <td className="py-4 px-6">
                              <p className="font-bold text-stone-900">{mhs.nama_mhs}</p>
                              <p className="text-xs text-stone-500 font-semibold">NPM: {mhs.nim}</p>
                            </td>
                            <td className="py-4 px-6 font-semibold">{mhs.kelas}</td>
                            <td className="py-4 px-6 text-red-600 font-extrabold">{mhs.alpa} Pertemuan</td>
                            <td className="py-4 px-6 font-extrabold">{mhs.skor_keaktifan}%</td>
                            <td className="py-4 px-6 text-right">
                              <button className="px-3.5 py-2 text-xs font-bold text-white bg-orange-600 rounded-xl hover:bg-orange-700 transition shadow-xs">
                                Kirim Konseling
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* MENU 2: MATA KULIAH & BUAT QR ABSEN */}
          {activeMenu === 'matkul' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">Mata Kuliah Diampu & Buat QR Presensi</h2>
                <p className="text-sm text-stone-600 mt-1">Kelola jadwal perkuliahan dan aktifkan QR Code presensi kehadiran mahasiswa secara real-time.</p>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {daftarMataKuliah.map((mk) => {
                  const isQrActive = qrStatus[mk.id] || false;
                  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=UNPAD-PRESENSI-${mk.id}-${encodeURIComponent(mk.nama)}`;

                  return (
                    <div key={mk.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs transition">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <span className="text-xs font-extrabold text-orange-700 bg-orange-50 border border-orange-200 px-3 py-1 rounded-lg">Kode: {mk.id}</span>
                          <h3 className="text-lg font-extrabold text-stone-900 mt-2.5">{mk.nama}</h3>
                          <p className="text-xs font-semibold text-stone-500 mt-1">🕒 {mk.jadwal} &bull; 📍 {mk.ruang} &bull; 👥 {mk.peserta} Mahasiswa</p>
                        </div>

                        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                          <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold ${
                            isQrActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                          }`}>
                            {isQrActive ? '🟢 QR Absen Aktif' : '⚪ QR Ditutup'}
                          </span>
                          <button
                            onClick={() => toggleQr(mk.id)}
                            className={`px-4 py-2.5 text-xs font-extrabold rounded-xl transition shadow-xs ${
                              isQrActive 
                                ? 'bg-red-600 text-white hover:bg-red-700' 
                                : 'bg-orange-600 text-white hover:bg-orange-700'
                            }`}
                          >
                            {isQrActive ? 'Tutup QR Absen' : 'Buat QR Absen'}
                          </button>
                        </div>
                      </div>

                      {/* Kotak Munculnya Kode QR Asli */}
                      {isQrActive && (
                        <div className="mt-6 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between bg-orange-50/40 p-6 rounded-2xl">
                          <div className="space-y-2 text-center sm:text-left mb-4 sm:mb-0">
                            <span className="inline-block px-3 py-1 text-xs font-extrabold text-orange-800 bg-orange-100 rounded-lg">
                              SESI PRESENSI BERLANGSUNG
                            </span>
                            <h4 className="text-base font-extrabold text-stone-900">Scan QR Code untuk Absensi</h4>
                            <p className="text-xs font-medium text-stone-600 max-w-sm">
                              Mahasiswa dapat melakukan scan menggunakan aplikasi mobile Unpad atau Portal Student untuk mencatat kehadiran sesi ini.
                            </p>
                            <p className="text-xs font-mono font-bold text-stone-500">Token Sesi: UNPAD-{mk.id}-2026</p>
                          </div>

                          <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm flex flex-col items-center">
                            <img 
                              src={qrImageUrl} 
                              alt={`QR Code ${mk.nama}`} 
                              className="w-40 h-40 object-contain rounded-xl"
                            />
                            <span className="text-[11px] font-semibold text-stone-400 mt-2">Berlaku selama sesi perkuliahan</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* MENU 3: MAHASISWA WALI */}
          {activeMenu === 'mahasiswa' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">Daftar Mahasiswa Wali</h2>
                <p className="text-sm text-stone-600 mt-1">Daftar mahasiswa perwalian yang berada di bawah bimbingan akademik Anda.</p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-stone-200 text-stone-500 text-xs font-extrabold uppercase bg-stone-50 tracking-wider">
                        <th className="py-3.5 px-6">Mahasiswa</th>
                        <th className="py-3.5 px-6">NPM</th>
                        <th className="py-3.5 px-6">Email Kampus</th>
                        <th className="py-3.5 px-6">Status Akademik</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-800">
                      {loading ? (
                        <tr><td colSpan={4} className="p-6 text-center text-xs text-stone-400 font-medium">Memuat data...</td></tr>
                      ) : mahasiswaList.length === 0 ? (
                        <tr><td colSpan={4} className="p-6 text-center text-xs text-stone-400 font-medium">Tidak ada mahasiswa wali bimbingan.</td></tr>
                      ) : (
                        mahasiswaList.map((mhs) => (
                          <tr key={mhs.nim} className="hover:bg-orange-50/20 transition font-medium">
                            <td className="py-4 px-6 font-bold text-stone-900">{mhs.nama_mhs}</td>
                            <td className="py-4 px-6 text-stone-600 font-semibold">{mhs.nim}</td>
                            <td className="py-4 px-6 text-stone-600 font-semibold">{mhs.email}</td>
                            <td className="py-4 px-6">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                mhs.status_risiko === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                              }`}>
                                {mhs.status_risiko}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}

export default function DosenDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] font-bold text-stone-600">Memuat dashboard...</div>}>
      <DosenDashboardContent />
    </Suspense>
  );
}