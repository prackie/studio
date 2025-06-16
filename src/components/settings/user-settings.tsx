
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function UserSettings() {
  return (
    <Card className="shadow-none border-0">
      <CardHeader className="px-0 pt-0">
        <CardTitle>ตั้งค่าบัญชีผู้ใช้</CardTitle>
        <CardDescription>
          ส่วนนี้สำหรับการตั้งค่าบัญชีผู้ใช้ของคุณ (กำลังอยู่ในระหว่างการพัฒนา)
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <p className="text-muted-foreground mt-4">
          ตัวเลือกการตั้งค่าต่างๆ เช่น การเปลี่ยนรหัสผ่าน, การจัดการข้อมูลส่วนตัว, หรือการตั้งค่าการแจ้งเตือน จะปรากฏที่นี่ในอนาคต.
        </p>
        {/* Example placeholder for future settings items */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
            <span className="text-sm font-medium">เปลี่ยนธีม (เร็วๆ นี้)</span>
            <span className="text-xs text-muted-foreground">ยังไม่พร้อมใช้งาน</span>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
            <span className="text-sm font-medium">จัดการการแจ้งเตือน (เร็วๆ นี้)</span>
            <span className="text-xs text-muted-foreground">ยังไม่พร้อมใช้งาน</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
