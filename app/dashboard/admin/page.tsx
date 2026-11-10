"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function DashboardAdminContent() {
  const params = useSearchParams();
  const nama = params.get("nama") || "Admin Dirmik Pusat";
  const [tab, setTab] = useState<"ringkasan" | "parameter" | "integrasi" | "master">("ringkasan");
  const [ringkasan, setRingkasan] = useState({ total_users: 0, total_mahasiswa: 0, total_dosen: 0, total_admin: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/ringkasan")
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok || !payload.success) throw new Error(payload.message || "Gagal memuat data.");
        setRingkasan(payload.data);
      })
      .catch((requestError) => setError(requestError.message || "Gagal memuat data database."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-stone-900"><header className="border-b border-stone-200 bg-white px-5 py-3 sm:px-8"><div className="mx-auto flex max-w-6xl items-center justify-between"><div className="flex items-center gap-3"><img src="/logo-unpad.jpg" alt="Logo Unpad" className="h-11 w-11 rounded-lg object-contain" /><div><p className="text-sm font-extrabold tracking-wide">ADMIN DIRMlK</p><p className="text-xs text-stone-500">Monitoring Keaktifan Universitas</p></div></div><div className="text-right"><p className="text-sm font-bold">{nama}</p><a href="/login" className="text-xs font-semibold text-orange-700 hover:underline">Keluar</a></div></div></header>
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-700">Admin Pusat</p><h1 className="mt-1 text-2xl font-extrabold">Konfigurasi & Monitoring Sistem</h1></div><nav className="flex flex-wrap rounded-xl border border-stone-200 bg-white p-1">{(["ringkasan", "parameter", "integrasi", "master"] as const).map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-lg px-3 py-2 text-xs font-bold capitalize ${tab === item ? "bg-stone-900 text-white" : "text-stone-600"}`}>{item}</button>)}</nav></div>
        {tab === "ringkasan" && <><div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[["Mahasiswa terdaftar", ringkasan.total_mahasiswa, "text-stone-900"], ["Dosen pengampu", ringkasan.total_dosen, "text-orange-700"], ["Admin pusat", ringkasan.total_admin, "text-emerald-700"], ["Total akun", ringkasan.total_users, "text-stone-900"]].map(([title, value, color]) => <section key={title} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wide text-stone-500">{title}</p><p className={`mt-2 text-2xl font-extrabold ${color}`}>{loading ? "…" : value}</p></section>)}</div><p className={`mt-3 text-xs ${error ? "text-red-700" : "text-stone-500"}`}>{error || "Jumlah diambil langsung dari tabel users pada database MySQL."}</p></>}
        {tab === "parameter" && <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-extrabold">Parameter Keaktifan</h2><p className="mt-1 text-sm text-stone-600">Parameter universitas dan ambang kategori. Konfigurasi per kelas oleh dosen tersedia pada dashboard dosen.</p><div className="mt-5 grid gap-4 sm:grid-cols-3"><div className="rounded-xl bg-emerald-50 p-4"><p className="text-xs font-bold text-emerald-800">AKTIF</p><p className="mt-2 text-xl font-extrabold">≥ 80%</p></div><div className="rounded-xl bg-amber-50 p-4"><p className="text-xs font-bold text-amber-800">PERLU PERHATIAN</p><p className="mt-2 text-xl font-extrabold">50–79%</p></div><div className="rounded-xl bg-red-50 p-4"><p className="text-xs font-bold text-red-800">TIDAK AKTIF</p><p className="mt-2 text-xl font-extrabold">&lt; 50% / alpa ≥ 3</p></div></div></section>}
        {tab === "integrasi" && <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-extrabold">Integrasi Sumber Data</h2><div className="mt-5 space-y-3">{[["SIAT", "Nilai tugas, UTS, kelas, dan perwalian", "Berhasil disinkronkan 08.30 WIB"], ["Live Unpad", "Aktivitas pembelajaran", "Menunggu implementasi konektor"], ["Presensi QR", "Kehadiran per pertemuan", "Menunggu API presensi"]].map(([source, detail, status]) => <div key={source} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200 p-4"><div><h3 className="font-bold">{source}</h3><p className="text-sm text-stone-600">{detail}</p></div><span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-700">{status}</span></div>)}</div></section>}
        {tab === "master" && <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-extrabold">Master Data</h2><p className="mt-1 text-sm text-stone-600">Fakultas, prodi, mata kuliah, kelas, dan periode semester akan dikelola melalui API khusus dengan audit trail.</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{["Fakultas", "Program Studi", "Mata Kuliah", "Kelas", "Periode Semester", "Akun & Peran"].map((item) => <button key={item} className="rounded-xl border border-stone-200 p-4 text-left text-sm font-bold hover:border-orange-300 hover:bg-orange-50">Kelola {item}<span className="mt-1 block text-xs font-normal text-stone-500">Tahap backend</span></button>)}</div></section>}
      </div>
    </main>
  );
}

export default function DashboardAdmin() {
  return <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Memuat dashboard…</div>}><DashboardAdminContent /></Suspense>;
}
