import { NextResponse } from 'next/server';
import type { RowDataPacket } from 'mysql2';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dosenId = searchParams.get('dosen_id') || 'DOSEN-02';

    // Ambil data mahasiswa dan tentukan status risikonya berdasarkan nama karakter
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT 
        id as nim, 
        name as nama_mhs, 
        email, 
        'Basis Data (Kelas A)' as kelas,
        CASE 
          WHEN name IN ('Gollum Smeagol', 'Peter Pettigrew', 'Bellatrix Lestrange', 'Boromir Denethor') THEN 4
          WHEN name IN ('Draco Malfoy', 'Thranduil Oropher') THEN 2
          ELSE 0 
        END as alpa,
        CASE 
          WHEN name IN ('Gollum Smeagol', 'Peter Pettigrew', 'Bellatrix Lestrange', 'Boromir Denethor') THEN 48
          WHEN name IN ('Draco Malfoy', 'Thranduil Oropher') THEN 65
          ELSE 92 
        END as skor_keaktifan,
        CASE 
          WHEN name IN ('Gollum Smeagol', 'Peter Pettigrew', 'Bellatrix Lestrange', 'Boromir Denethor', 'Draco Malfoy', 'Thranduil Oropher') THEN 'Perlu Perhatian'
          ELSE 'Aktif' 
        END as status_risiko
      FROM users 
      WHERE role = 'Mahasiswa' AND dosen_wali_id = ?`,
      [dosenId]
    );
    
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil data mahasiswa" }, { status: 500 });
  }
}
