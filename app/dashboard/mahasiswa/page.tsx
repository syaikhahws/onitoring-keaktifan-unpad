"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const mataKuliah = [
  { kode: "IF-301", nama: "Basis Data", hadir: 92, tugas: 88, uts: 84, status: "Aktif" },
  { kode: "IF-303", nama: "Pemrograman Web", hadir: 86, tugas: 82, uts: 79, status: "Aktif" },
  { kode: "IF-305", nama: "Algoritma & Pemrograman", hadir: 68, tugas: 64, uts: 58, status: "Perlu Perhatian" },
];

function DashboardMahasiswaContent() {
  const params = useSearchParams();
  const nama = params.get("nama") || "Mahasiswa Unpad";
  const skor = 79;

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-stone-900">
      <header className="border-b border-stone-200 bg-white px-5 py-3 sm:px-8"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4"><div className="flex items-center gap-3"><img src="/logo-unpad.jpg" alt="Logo Unpad" className="h-11 w-11 rounded-lg object-contain" /><div><p className="text-sm font-extrabold tracking-wide">PORTAL MAHASISWA</p><p className="text-xs text-stone-500">Monitoring Keaktifan Belajar</p></div></div><div className="text-right"><p className="text-sm font-bold">{nama}</p><a href="/login" className="text-xs font-semibold text-orange-700 hover:underline">Keluar</a></div></div></header>
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-700">Periode Ganjil 2026/2027</p><h1 className="mt-1 text-2xl font-extrabold">Ringkasan Keaktifan Saya</h1><p className="mt-1 text-sm text-stone-600">Pantau kehadiran, tugas, nilai UTS, dan peringatan dini untuk mata kuliah Anda.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3"><section className="rounded-2xl bg-stone-900 p-6 text-white"><p className="text-xs font-bold uppercase tracking-wider text-stone-300">Skor Keaktifan</p><p className="mt-2 text-4xl font-extrabold">{skor}%</p><p className="mt-2 text-sm text-stone-300">Perlu Perhatian</p></section><section className="rounded-2xl border border-stone-200 bg-white p-6"><p className="text-xs font-bold uppercase tracking-wider text-stone-500">Kehadiran rata-rata</p><p className="mt-2 text-4xl font-extrabold text-emerald-700">82%</p><p className="mt-2 text-sm text-stone-500">Ada 1 kelas yang perlu diperbaiki</p></section><section className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><p className="text-xs font-bold uppercase tracking-wider text-amber-800">Peringatan dini</p><p className="mt-2 text-lg font-extrabold">Perhatikan Algoritma</p><p className="mt-2 text-sm text-amber-900">Kehadiran dan tugas mendekati batas perhatian.</p></section></div>
        <section className="mt-6 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"><div className="border-b border-stone-100 px-6 py-4"><h2 className="font-bold">Keaktifan per Mata Kuliah</h2><p className="mt-1 text-xs text-stone-500">Anda hanya dapat melihat data akademik milik sendiri.</p></div><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500"><tr><th className="p-4">Mata kuliah</th><th className="p-4">Kehadiran</th><th className="p-4">Tugas</th><th className="p-4">UTS</th><th className="p-4">Status</th></tr></thead><tbody>{mataKuliah.map((mk) => <tr key={mk.kode} className="border-t border-stone-100"><td className="p-4 font-semibold">{mk.nama}<span className="block text-xs font-normal text-stone-500">{mk.kode}</span></td><td className="p-4">{mk.hadir}%</td><td className="p-4">{mk.tugas}%</td><td className="p-4">{mk.uts}%</td><td className="p-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${mk.status === "Aktif" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>{mk.status}</span></td></tr>)}</tbody></table></div></section>
        <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"><h2 className="font-bold">Riwayat Presensi Terakhir</h2><div className="mt-4 space-y-3 text-sm"><div className="flex justify-between rounded-lg bg-emerald-50 p-3"><span><b>Basis Data</b> · Pertemuan 8</span><span className="font-bold text-emerald-800">Hadir · 08.02 WIB</span></div><div className="flex justify-between rounded-lg bg-stone-50 p-3"><span><b>Pemrograman Web</b> · Pertemuan 7</span><span className="font-bold text-emerald-800">Hadir · 13.01 WIB</span></div><div className="flex justify-between rounded-lg bg-red-50 p-3"><span><b>Algoritma & Pemrograman</b> · Pertemuan 7</span><span className="font-bold text-red-800">Alpa</span></div></div></section>
      </div>
    </main>
  );
}

export default function DashboardMahasiswa() {
  return <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Memuat dashboard…</div>}><DashboardMahasiswaContent /></Suspense>;
}
