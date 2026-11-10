"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Menu = "ringkasan" | "kelas" | "perwalian" | "bobot" | "audit";
type Weights = { kehadiran: number; tugas: number; uts: number };

const mahasiswa = [
  { nim: "140810240025", nama: "Syaikha Habibtiana Widi Sukamto", kehadiran: 96, tugas: 90, uts: 86, alpa: 0 },
  { nim: "140810240002", nama: "Aisha Kinasih Susanto", kehadiran: 91, tugas: 88, uts: 84, alpa: 0 },
  { nim: "140810240003", nama: "M. Razky Nur", kehadiran: 82, tugas: 75, uts: 70, alpa: 1 },
  { nim: "140810240012", nama: "Rian Pratama", kehadiran: 68, tugas: 64, uts: 58, alpa: 3 },
  { nim: "140810240055", nama: "Peter Pettigrew", kehadiran: 42, tugas: 55, uts: 48, alpa: 5 },
];

const mataKuliah = [
  { kode: "IF-301", nama: "Basis Data", kelas: "Kelas A", jadwal: "Senin, 08.00 - 10.30", peserta: 40 },
  { kode: "IF-303", nama: "Pemrograman Web", kelas: "Kelas B", jadwal: "Selasa, 13.00 - 15.30", peserta: 38 },
  { kode: "IF-305", nama: "Algoritma & Pemrograman", kelas: "Kelas A", jadwal: "Rabu, 10.00 - 12.30", peserta: 42 },
];

function kategori(skor: number, alpa: number) {
  if (skor < 50 || alpa >= 3) return "Tidak Aktif";
  if (skor < 80) return "Perlu Perhatian";
  return "Aktif";
}

function badge(status: string) {
  if (status === "Aktif") return "bg-emerald-100 text-emerald-800";
  if (status === "Perlu Perhatian") return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
}

function EwsTable({ students, onReview }: { students: Array<(typeof mahasiswa)[number] & { skor: number; status: string }>; onReview: (nim: string) => void }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 px-6 py-4">
        <div><h2 className="font-bold">Daftar Pantauan Khusus</h2><p className="text-xs text-stone-500">Status ditentukan dari skor dan jumlah alpa berturut-turut.</p></div>
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">{students.length} perlu perhatian</span>
      </div>
      <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500"><tr><th className="p-4">Mahasiswa</th><th className="p-4">Kehadiran</th><th className="p-4">Skor</th><th className="p-4">Status</th><th className="p-4 text-right">Tindakan</th></tr></thead><tbody>{students.map((m) => <tr key={m.nim} className="border-t border-stone-100"><td className="p-4 font-semibold">{m.nama}<span className="block text-xs font-normal text-stone-500">{m.nim}</span></td><td className="p-4">{m.kehadiran}% · {m.alpa} alpa</td><td className="p-4 font-bold">{m.skor}%</td><td className="p-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${badge(m.status)}`}>{m.status}</span></td><td className="p-4 text-right"><button onClick={() => onReview(m.nim)} className="text-xs font-bold text-orange-700 hover:underline">Tinjau</button></td></tr>)}</tbody></table></div>
    </section>
  );
}

function DosenDashboardContent() {
  const params = useSearchParams();
  const nama = params.get("nama") || "Dr. Dewi Lestari, M.T.";
  const [menu, setMenu] = useState<Menu>("ringkasan");
  const [mode, setMode] = useState<"pengampu" | "wali">("pengampu");
  const [selectedMatkul, setSelectedMatkul] = useState(mataKuliah[0].kode);
  const [weightsByMatkul, setWeightsByMatkul] = useState<Record<string, Weights>>({
    "IF-301": { kehadiran: 40, tugas: 35, uts: 25 },
    "IF-303": { kehadiran: 25, tugas: 45, uts: 30 },
    "IF-305": { kehadiran: 50, tugas: 30, uts: 20 },
  });
  const [saved, setSaved] = useState(false);
  const [qrKelas, setQrKelas] = useState<string | null>(null);
  const [durasi, setDurasi] = useState(15);
  const [koreksi, setKoreksi] = useState<string | null>(null);

  const weights = weightsByMatkul[selectedMatkul];
  const selectedCourse = mataKuliah.find((matkul) => matkul.kode === selectedMatkul) ?? mataKuliah[0];
  const totalBobot = weights.kehadiran + weights.tugas + weights.uts;
  const daftarSkor = useMemo(() => mahasiswa.map((m) => {
    const skor = totalBobot > 0 ? Math.round((m.kehadiran * weights.kehadiran + m.tugas * weights.tugas + m.uts * weights.uts) / totalBobot) : 0;
    return { ...m, skor, status: kategori(skor, m.alpa) };
  }), [totalBobot, weights]);
  const berisiko = daftarSkor.filter((m) => m.status !== "Aktif");
  const aktif = daftarSkor.filter((m) => m.status === "Aktif").length;
  const rataRata = Math.round(daftarSkor.reduce((total, m) => total + m.skor, 0) / daftarSkor.length);
  const nav = [["ringkasan", "Ringkasan", "▦"], ["kelas", "Kelas & Presensi", "▤"], ["perwalian", "Perwalian & EWS", "◎"], ["bobot", "Bobot Keaktifan", "⚖"], ["audit", "Kesiapan Audit", "✓"]] as const;

  const updateWeight = (key: keyof Weights, value: string) => {
    setSaved(false);
    setWeightsByMatkul((current) => ({
      ...current,
      [selectedMatkul]: { ...current[selectedMatkul], [key]: Math.max(0, Number(value) || 0) },
    }));
  };

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-stone-900">
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 px-5 py-3 backdrop-blur sm:px-8"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4"><div className="flex items-center gap-3"><img src="/logo-unpad.jpg" alt="Logo Unpad" className="h-11 w-11 rounded-lg object-contain" /><div><p className="text-sm font-extrabold tracking-wide text-stone-900">MONITORING KEAKTIFAN</p><p className="text-xs text-stone-500">Universitas Padjadjaran</p></div></div><div className="hidden text-right sm:block"><p className="text-sm font-bold">{nama}</p><p className="text-xs text-stone-500">Sesi dosen terverifikasi · FMIPA</p></div><a href="/login" className="rounded-lg border border-stone-300 px-3 py-2 text-xs font-bold text-stone-700 hover:bg-stone-50">Keluar</a></div></header>
      <div className="mx-auto flex max-w-7xl gap-7 px-4 py-6 sm:px-8">
        <aside className="hidden w-60 shrink-0 md:block"><div className="sticky top-24 rounded-2xl border border-stone-200 bg-white p-3 shadow-sm"><p className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-stone-400">Area kerja dosen</p>{nav.map(([id, label, icon]) => <button key={id} onClick={() => setMenu(id)} className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${menu === id ? "bg-orange-600 text-white shadow-sm" : "text-stone-700 hover:bg-orange-50"}`}><span className="text-base">{icon}</span>{label}</button>)}<div className="mt-4 rounded-xl bg-stone-50 p-3 text-xs leading-5 text-stone-600"><p className="font-bold text-stone-800">Cakupan akses</p>Tampilan ini membedakan data kelas yang diampu dan mahasiswa perwalian.</div></div></aside>
        <main className="min-w-0 flex-1 space-y-6">
          <div className="md:hidden"><select value={menu} onChange={(e) => setMenu(e.target.value as Menu)} className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-semibold">{nav.map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></div>
          <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-700">Dashboard dosen</p><h1 className="mt-1 text-2xl font-extrabold tracking-tight">{mode === "pengampu" ? "Pemantauan Kelas" : "Pemantauan Perwalian"}</h1><p className="mt-1 text-sm text-stone-600">Data contoh frontend untuk validasi rancangan fitur dan hak akses.</p></div><div className="rounded-xl border border-stone-200 bg-white p-1 shadow-sm"><button onClick={() => setMode("pengampu")} className={`rounded-lg px-3 py-2 text-xs font-bold ${mode === "pengampu" ? "bg-stone-900 text-white" : "text-stone-600"}`}>Dosen Pengampu</button><button onClick={() => setMode("wali")} className={`rounded-lg px-3 py-2 text-xs font-bold ${mode === "wali" ? "bg-stone-900 text-white" : "text-stone-600"}`}>Dosen Wali</button></div></div>

          {menu === "ringkasan" && <><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[[mode === "pengampu" ? "Kelas diampu" : "Mahasiswa wali", mode === "pengampu" ? "3 kelas" : `${daftarSkor.length} orang`, "text-stone-900"], ["Rata-rata skor", `${rataRata}%`, "text-orange-700"], ["Mahasiswa aktif", `${aktif} orang`, "text-emerald-700"], ["Perlu tindak lanjut", `${berisiko.length} orang`, "text-red-700"]].map(([label, value, color]) => <div key={label} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-stone-500">{label}</p><p className={`mt-2 text-3xl font-extrabold ${color}`}>{value}</p></div>)}</div><section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"><div className="flex flex-wrap justify-between gap-3"><div><h2 className="font-bold">Komposisi skor aktif</h2><p className="mt-1 text-sm text-stone-600">Bobot ditentukan dosen dan dinormalisasi otomatis dalam perhitungan.</p></div><button onClick={() => setMenu("bobot")} className="rounded-lg border border-orange-300 bg-orange-50 px-3 py-2 text-xs font-bold text-orange-800">Atur bobot</button></div><div className="mt-6 grid gap-4 sm:grid-cols-3">{Object.entries(weights).map(([key, value]) => <div key={key}><div className="mb-2 flex justify-between text-sm font-semibold"><span className="capitalize">{key}</span><span>{value}</span></div><div className="h-3 overflow-hidden rounded-full bg-stone-100"><div className="h-full rounded-full bg-orange-500" style={{ width: `${totalBobot ? (value / totalBobot) * 100 : 0}%` }} /></div></div>)}</div></section><EwsTable students={berisiko} onReview={(nim) => { setKoreksi(nim); setMenu("kelas"); }} /></>}

          {menu === "kelas" && <section className="space-y-5"><div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-extrabold">Kelas, QR Presensi, dan Koreksi Kehadiran</h2><p className="mt-1 text-sm text-stone-600">Hanya kelas yang diampu pada periode aktif ditampilkan.</p><div className="mt-5 space-y-3">{mataKuliah.map((mk) => <div key={mk.kode} className="rounded-xl border border-stone-200 p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold text-orange-700">{mk.kode} · {mk.kelas}</p><h3 className="font-bold">{mk.nama}</h3><p className="text-xs text-stone-500">{mk.jadwal} · {mk.peserta} peserta</p></div><button onClick={() => setQrKelas(qrKelas === mk.kode ? null : mk.kode)} className={`rounded-lg px-3 py-2 text-xs font-bold ${qrKelas === mk.kode ? "bg-red-600 text-white" : "bg-orange-600 text-white"}`}>{qrKelas === mk.kode ? "Tutup QR" : "Buat QR"}</button></div>{qrKelas === mk.kode && <div className="mt-4 flex flex-wrap items-end justify-between gap-4 rounded-xl bg-orange-50 p-4"><div><p className="text-xs font-bold text-orange-800">SESI PRESENSI AKTIF</p><p className="mt-1 text-sm text-stone-700">Token unik dan hitung mundur akan dihubungkan ke API presensi pada tahap backend.</p></div><label className="text-xs font-semibold">Masa berlaku (menit)<input min="1" max="120" value={durasi} onChange={(e) => setDurasi(Number(e.target.value))} type="number" className="mt-1 block w-28 rounded-lg border border-stone-300 px-2 py-2 text-sm" /></label></div>}</div>)}</div></div><section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"><h2 className="font-bold">Daftar hadir & koreksi presensi</h2><p className="mt-1 text-sm text-stone-600">Koreksi mensyaratkan status baru dan catatan audit pada implementasi backend.</p><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b text-xs uppercase tracking-wide text-stone-500"><tr><th className="p-3">Mahasiswa</th><th className="p-3">Kehadiran</th><th className="p-3">Alpa</th><th className="p-3 text-right">Aksi</th></tr></thead><tbody>{daftarSkor.map((m) => <tr key={m.nim} className="border-b border-stone-100"><td className="p-3 font-semibold">{m.nama}<span className="block text-xs font-normal text-stone-500">{m.nim}</span></td><td className="p-3">{m.kehadiran}%</td><td className="p-3">{m.alpa} kali</td><td className="p-3 text-right"><button onClick={() => setKoreksi(m.nim)} className="text-xs font-bold text-orange-700 hover:underline">Koreksi</button></td></tr>)}</tbody></table></div>{koreksi && <form onSubmit={(e) => { e.preventDefault(); setKoreksi(null); }} className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4"><p className="text-sm font-bold">Koreksi untuk {daftarSkor.find((m) => m.nim === koreksi)?.nama}</p><div className="mt-3 grid gap-3 sm:grid-cols-2"><select required className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"><option>Hadir</option><option>Izin</option><option>Sakit</option><option>Alpa</option></select><input required placeholder="Catatan koreksi wajib diisi" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" /></div><div className="mt-3 flex gap-2"><button className="rounded-lg bg-stone-900 px-3 py-2 text-xs font-bold text-white">Simpan koreksi</button><button type="button" onClick={() => setKoreksi(null)} className="rounded-lg border border-stone-300 px-3 py-2 text-xs font-bold">Batal</button></div></form>}</section></section>}

          {menu === "perwalian" && <><div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-extrabold">Matriks Anak Wali & Early Warning System</h2><p className="mt-1 text-sm text-stone-600">Cakupan perwalian dipisahkan dari peserta kelas yang diampu.</p><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-emerald-50 p-4"><p className="text-xs font-bold text-emerald-800">AKTIF</p><p className="mt-1 text-2xl font-extrabold">{aktif}</p></div><div className="rounded-xl bg-amber-50 p-4"><p className="text-xs font-bold text-amber-800">PERLU PERHATIAN</p><p className="mt-1 text-2xl font-extrabold">{daftarSkor.filter((m) => m.status === "Perlu Perhatian").length}</p></div><div className="rounded-xl bg-red-50 p-4"><p className="text-xs font-bold text-red-800">TIDAK AKTIF</p><p className="mt-1 text-2xl font-extrabold">{daftarSkor.filter((m) => m.status === "Tidak Aktif").length}</p></div></div></div><EwsTable students={berisiko} onReview={() => undefined} /></>}

          {menu === "bobot" && <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-orange-700">Konfigurasi oleh dosen</p><h2 className="mt-1 text-xl font-extrabold">Bobot Skor Keaktifan per Mata Kuliah</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">Setiap mata kuliah memiliki bobot yang berbeda. Dosen bebas mengisi bobot kehadiran, tugas, dan UTS; totalnya tidak wajib 100 karena skor dinormalisasi terhadap total bobot.</p><label className="mt-5 block max-w-xl text-sm font-bold">Pilih mata kuliah<select value={selectedMatkul} onChange={(event) => { setSelectedMatkul(event.target.value); setSaved(false); }} className="mt-2 block w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm font-semibold">{mataKuliah.map((matkul) => <option key={matkul.kode} value={matkul.kode}>{matkul.kode} · {matkul.nama} ({matkul.kelas})</option>)}</select></label><div className="mt-6 grid gap-4 md:grid-cols-3">{(["kehadiran", "tugas", "uts"] as const).map((key) => <label key={key} className="rounded-xl border border-stone-200 p-4"><span className="text-sm font-bold capitalize">{key === "uts" ? "UTS" : key}</span><input type="number" min="0" value={weights[key]} onChange={(e) => updateWeight(key, e.target.value)} className="mt-3 block w-full rounded-lg border border-stone-300 px-3 py-2 text-lg font-bold" /><span className="mt-2 block text-xs text-stone-500">Nilai bebas, minimal 0</span></label>)}</div><div className={`mt-5 rounded-xl p-4 text-sm ${totalBobot > 0 ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"}`}><b>{selectedCourse.nama} · total bobot: {totalBobot}</b><br />{totalBobot > 0 ? "Rumus: (Kehadiran × bobot + Tugas × bobot + UTS × bobot) ÷ total bobot." : "Isi minimal satu bobot di atas 0 agar skor dapat dihitung."}</div><button disabled={totalBobot <= 0} onClick={() => setSaved(true)} className="mt-5 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">Simpan bobot {selectedCourse.kode}</button>{saved && <p className="mt-3 text-sm font-semibold text-emerald-700">Bobot {selectedCourse.kode} tersimpan di tampilan ini dan tidak mengubah bobot mata kuliah lain.</p>}</section>}

          {menu === "audit" && <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-extrabold">Kesiapan Refactoring & Audit</h2><p className="mt-1 text-sm text-stone-600">Daftar pekerjaan backend yang sengaja belum diubah dalam revisi frontend ini.</p><div className="mt-5 space-y-3">{[["1", "Autentikasi & RBAC", "Session aman, middleware, dan pembatasan data berdasarkan peran."], ["2", "Skema database", "Entitas kelas, pertemuan, presensi, skor, parameter, notifikasi, dan audit log."], ["3", "Sumber data", "Ganti data/aturan hard-coded dengan query dan service domain."], ["4", "Pemisahan peran", "Hak Dosen Pengampu dan Dosen Wali divalidasi di server."], ["5", "API domain", "Endpoint kelas, QR, scan, koreksi, skor, dan EWS."], ["6", "Keamanan", "Hash password, validasi input, HTTPS, pembatasan rate, dan log audit."], ["7", "Pengujian FSD", "Test AC-001 s.d. AC-015 serta integrasi alur presensi."]].map(([number, title, detail]) => <div key={number} className="flex gap-4 rounded-xl border border-stone-200 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-bold text-white">{number}</span><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm text-stone-600">{detail}</p></div><span className="ml-auto h-fit rounded-full bg-amber-100 px-2 py-1 text-[11px] font-bold text-amber-800">Tahap backend</span></div>)}</div></section>}
        </main>
      </div>
    </div>
  );
}

export default function DosenDashboard() {
  return <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#f7f7f4] font-semibold text-stone-600">Memuat dashboard…</div>}><DosenDashboardContent /></Suspense>;
}
