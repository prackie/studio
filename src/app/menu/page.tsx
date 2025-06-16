
"use client";

import { MenuCard } from "@/components/menu/menu-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu as MenuIcon, UserCircle2, Star, BookOpenText, Settings, Hospital, MessageSquare, ArrowLeft } from "lucide-react"; // Added MessageSquare
import Link from "next/link";

const menuItems = [
  { id: "a", icon: Star, title: "เมนู A", description: "คำอธิบายสำหรับเมนู A", bgColorClass: "bg-primary/10", iconColorClass: "text-primary" },
  { id: "b", icon: BookOpenText, title: "เมนู B", description: "คำอธิบายสำหรับเมนู B", bgColorClass: "bg-accent/10", iconColorClass: "text-accent" },
  { id: "c", icon: Settings, title: "เมนู C", description: "คำอธิบายสำหรับเมนู C", bgColorClass: "bg-green-500/10", iconColorClass: "text-green-600" },
  { 
    id: "d", 
    icon: Hospital, 
    title: "รายชื่อโรงพยาบาล", 
    description: "ในจังหวัดเชียงใหม่", 
    bgColorClass: "bg-yellow-500/10", 
    iconColorClass: "text-yellow-600",
    href: "/hospitals" // Corrected path
  },
  { 
    id: "e", 
    icon: MessageSquare, // Changed icon
    title: "คุยกับผู้เชี่ยวชาญ", // Changed title
    description: "พูดคุยกับผู้เชี่ยวชาญด้านสุขภาพ", // Changed description
    bgColorClass: "bg-red-500/10", 
    iconColorClass: "text-red-600",
    href: "/chat" // Added href to the new chat page
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
