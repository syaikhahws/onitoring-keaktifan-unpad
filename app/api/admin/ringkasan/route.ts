import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.execute<{
      total_users: number;
      total_mahasiswa: number;
      total_dosen: number;
      total_admin: number;
    }[]>(`
      SELECT
        COUNT(*) AS total_users,
        SUM(role = 'Mahasiswa') AS total_mahasiswa,
        SUM(role = 'Dosen Pengampu') AS total_dosen,
        SUM(role = 'Admin Pusat') AS total_admin
      FROM users
    `);

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("Gagal memuat ringkasan admin:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil ringkasan database." }, { status: 500 });
  }
}
