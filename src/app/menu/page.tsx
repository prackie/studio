
"use client";

import { MenuCard } from "@/components/menu/menu-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu as MenuIcon, UserCircle2, BookOpenText, Hospital, MessageSquare, Globe, FileText, History } from "lucide-react"; // Added History
import Link from "next/link";

const menuItems = [
  { 
    id: "a", 
    icon: FileText,
    title: "แบบประเมินสุขภาพจิต",
    description: "ทำแบบประเมินสุขภาพจิตเบื้องต้น",
    bgColorClass: "bg-blue-500/10", // Changed color
    iconColorClass: "text-blue-600",  // Changed color
    href: "/assessment"
  },
  { 
    id: "b", 
    icon: History, // Changed icon
    title: "ประวัติการประเมิน", // Changed title
    description: "ดูผลการประเมินสุขภาพจิตย้อนหลัง", // Changed description
    bgColorClass: "bg-purple-500/10", // Changed color
    iconColorClass: "text-purple-600", // Changed color
    href: "/assessment-history" // Added href
  },
  { 
    id: "c", 
    icon: Globe, 
    title: "ข้อมูลสุขภาพจิต (DMH)", 
    description: "จากเว็บไซต์กรมสุขภาพจิต", 
    bgColorClass: "bg-green-500/10", 
    iconColorClass: "text-green-600",
    href: "/dmh" 
  },
  { 
    id: "d", 
    icon: Hospital, 
    title: "รายชื่อโรงพยาบาล", 
    description: "ในจังหวัดเชียงใหม่", 
    bgColorClass: "bg-yellow-500/10", 
    iconColorClass: "text-yellow-600",
    href: "/hospitals"
  },
  { 
    id: "e", 
    icon: MessageSquare, 
    title: "คุยกับผู้เชี่ยวชาญ", 
    description: "พูดคุยกับผู้เชี่ยวชาญด้านสุขภาพ", 
    bgColorClass: "bg-red-500/10", 
    iconColorClass: "text-red-600",
    href: "/chat"
  },
];

export default function MenuPage() {
  return (
    <div className="w-full max-w-md bg-card rounded-xl shadow-lg m-4 sm:m-6 md:m-8 flex flex-col h-[calc(100vh-4rem)] max-h-[700px]">
      <header className="w-full bg-primary text-primary-foreground p-4 rounded-t-xl shadow-md flex items-center justify-between">
        <Button variant="ghost" size="icon" className="hover:bg-primary/80">
          <MenuIcon className="h-6 w-6" aria-label="ตัวเลือกเมนู" />
        </Button>
        <h2 className="text-xl font-semibold font-headline">เมนูหลัก</h2>
        <Button variant="ghost" size="icon" className="hover:bg-primary/80">
          <UserCircle2 className="h-6 w-6" aria-label="โปรไฟล์ผู้ใช้" />
        </Button>
      </header>

      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {menuItems.map((item) => (
            <MenuCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
              bgColorClass={item.bgColorClass}
              iconColorClass={item.iconColorClass}
              href={item.href}
            />
          ))}
        </div>
      </ScrollArea>
      <footer className="p-4 border-t border-border text-center">
        <Link href="/" className="text-sm text-primary hover:underline">
          ออกจากระบบ
        </Link>
      </footer>
    </div>
  );
}
