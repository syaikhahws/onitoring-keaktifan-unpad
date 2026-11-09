"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal melakukan login.");
        setLoading(false);
        return;
      }

      // Jika sukses, arahkan ke dashboard dosen dengan membawa nama & NIP/ID dari database
      router.push(`/dashboard/dosen?nama=${encodeURIComponent(data.user.name)}&nip=197805122005011002`);
    } catch (err) {
      setError("Terjadi kesalahan koneksi ke server.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl border border-stone-200 shadow-xs p-8">
        
        {/* Header Logo & Identitas */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-3">
            <img 
              src="/logo-unpad.jpg" 
              alt="Logo Unpad" 
              className="w-14 h-14 object-contain rounded-xl shadow-xs" 
            />
          </div>
          <h1 className="text-xl font-bold text-stone-900">Masuk ke Sistem Monitoring</h1>
          <p className="text-xs text-stone-500 mt-1">Universitas Padjadjaran</p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-medium text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Email Kampus
            </label>
            <input
              type="email"
              required
              placeholder="dewi@mail.unpad.ac.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-xl bg-orange-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 transition disabled:opacity-50"
          >
            {loading ? "Memeriksa Database..." : "Masuk"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-stone-500">
          Belum punya akun?{' '}
          <a href="/register" className="font-semibold text-orange-600 hover:underline">
            Daftar di sini
          </a>
        </div>
      </div>
    </div>
  );
}