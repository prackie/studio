
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const hospitalsData = [
  { "id": "hosp1", "name_th": "โรงพยาบาลมหาราชนครเชียงใหม่ (รพ.สวนดอก)", "name_en": "Maharaj Nakorn Chiang Mai Hospital (Suandok Hospital)", "address": "110 ถนนอินทวโรรส ตำบลศรีภูมิ อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200", "type": "รัฐบาล", "contact": "053-936XXX" },
  { "id": "hosp2", "name_th": "โรงพยาบาลนครพิงค์", "name_en": "Nakornping Hospital", "address": "159 หมู่ 10 ถนนโชตนา ตำบลดอนแก้ว อำเภอแม่ริม เชียงใหม่ 50180", "type": "รัฐบาล", "contact": "053-999XXX" },
  { "id": "hosp3", "name_th": "โรงพยาบาลกรุงเทพเชียงใหม่", "name_en": "Bangkok Hospital Chiang Mai", "address": "88 หมู่ 6 ถนนเชียงใหม่-ลำปาง ตำบลหนองป่าครั่ง อำเภอเมืองเชียงใหม่ เชียงใหม่ 50000", "type": "เอกชน", "contact": "052-089XXX" },
  { "id": "hosp4", "name_th": "โรงพยาบาลเชียงใหม่ราม", "name_en": "Chiangmai Ram Hospital", "address": "8 ถนนบุญเรืองฤทธิ์ ตำบลศรีภูมิ อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200", "type": "เอกชน", "contact": "053-920XXX" }
];

export default function ChiangMaiHospitalsPage() {
  const jsonData = JSON.stringify(hospitalsData, null, 2);

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-4 bg-background">
      <Card className="w-full max-w-3xl shadow-xl rounded-xl my-8">
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
          <div className="w-10 h-10"></div> {}
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-4 text-muted-foreground">
            ด้านล่างนี้คือรายชื่อโรงพยาบาลในจังหวัดเชียงใหม่ในรูปแบบ JSON:
          </p>
          <div className="bg-muted/50 p-4 rounded-md overflow-x-auto">
            <pre className="text-sm text-foreground whitespace-pre-wrap break-words">
              {jsonData}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
