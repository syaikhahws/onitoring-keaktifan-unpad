"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Dosen Pengampu');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validasi domain email kampus
    if (!email.endsWith("@mail.unpad.ac.id")) {
      setError("Pendaftaran wajib menggunakan email berdomain @mail.unpad.ac.id!");
      return;
    }

    alert(`Registrasi berhasil sebagai ${role}! Silakan login.`);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 flex items-center justify-center px-4 py-8 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl border border-stone-200 shadow-xs p-8">
        
        {/* Header Logo & Identitas */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center mb-3">
            <img 
              src="/logo-unpad.jpg" 
              alt="Logo Unpad" 
              className="w-14 h-14 object-contain rounded-xl shadow-xs" 
            />
          </div>
          <h1 className="text-xl font-bold text-stone-900">Pendaftaran Akun Baru</h1>
          <p className="text-xs text-stone-500 mt-1">Dashboard Monitoring Keaktifan Unpad</p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-medium text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Dr. Budi Santoso, M.T."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Email Kampus (@mail.unpad.ac.id)
            </label>
            <input
              type="email"
              required
              placeholder="nama@mail.unpad.ac.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Peran (Role)
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 bg-white focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition"
            >
              <option value="Dosen Pengampu">Dosen Pengampu / Wali</option>
              <option value="Mahasiswa">Mahasiswa</option>
              <option value="Administrator">Administrator</option>
            </select>
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
            className="w-full mt-2 rounded-xl bg-orange-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 transition"
          >
            Daftar Sekarang
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-stone-500">
          Sudah punya akun?{' '}
          <a href="/login" className="font-semibold text-orange-600 hover:underline">
            Login di sini
          </a>
        </div>
      </div>
    </div>
  );
}