import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validasi domain email kampus
    if (!email.endsWith("@mail.unpad.ac.id")) {
      return NextResponse.json(
        { success: false, message: "Gunakan email resmi berdomain kampus (@mail.unpad.ac.id)!" },
        { status: 400 }
      );
    }

    // Query ke database MySQL AMPPS
    const [rows]: any = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Email tidak terdaftar di database." },
        { status: 404 }
      );
    }

    const user = rows[0];

    // Cek password sederhana (pada tahap produksi nanti gunakan bcrypt)
    if (user.password !== password) {
      return NextResponse.json(
        { success: false, message: "Password salah!" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Login berhasil!",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        fakultas: user.fakultas
      }
    });

  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server database." },
      { status: 500 }
    );
  }
}