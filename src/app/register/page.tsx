
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary font-headline">ลงทะเบียน</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">หน้านี้ยังอยู่ในระหว่างการพัฒนา</p>
          <Link href="/" className="text-primary hover:underline">
            กลับไปหน้าเข้าสู่ระบบ
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
