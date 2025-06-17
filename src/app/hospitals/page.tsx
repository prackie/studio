
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

// เพิ่มบรรทัดนี้เพื่อ import ข้อมูลจากไฟล์ JSON
import hospitalsData from '../../data/hospitals.json';

// กำหนด Interface สำหรับข้อมูลโรงพยาบาล (เพื่อให้โค้ดเข้าใจโครงสร้างข้อมูล)
interface Hospital {
  id: string;
  name_th: string;
  name_en: string;
  address: string;
  type: string;
  contact: string;
}

export default function HospitalsPage() {
  // ไม่ต้องประกาศ hospitalsData ตรงนี้แล้ว เพราะเรา import มาแล้ว

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-background">
      <Card className="w-full max-w-3xl shadow-xl rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground p-4 rounded-t-xl">
          <Link href="/menu" passHref>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">กลับไปเมนูหลัก</span>
            </Button>
          </Link>
          <CardTitle className="text-xl font-semibold font-headline text-center flex-grow">
            รายชื่อโรงพยาบาลในจังหวัดเชียงใหม่
          </CardTitle>
          <div className="w-10 h-10"></div> {/* Placeholder */}
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-4 text-muted-foreground">
            ด้านล่างนี้คือรายชื่อโรงพยาบาลในจังหวัดเชียงใหม่:
          </p>
          {/* แสดงข้อมูลในรูปแบบ List จาก hospitalsData ที่ import มา */}
          <ul>
            {/* ตรวจสอบว่า hospitalsData เป็น array และมีข้อมูลก่อน map */}
            {Array.isArray(hospitalsData) && hospitalsData.map((hospital: Hospital, index: number) => (
              <li key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold">{hospital.name_th}</h2>
                <p className="text-muted-foreground">ที่อยู่: {hospital.address}</p>
                <p className="text-muted-foreground">ประเภท: {hospital.type}</p>
                <p className="text-muted-foreground">ติดต่อ: {hospital.contact}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
