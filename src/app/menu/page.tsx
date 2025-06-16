
"use client";

import { MenuCard } from "@/components/menu/menu-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserCircle2, BookOpenText, Hospital, MessageSquare, Globe, FileText, History, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const menuItems = [
  { 
    id: "a", 
    icon: FileText,
    title: "ทำแบบประเมิน",
    description: "ทำแบบประเมินสุขภาพจิตเบื้องต้น",
    bgColorClass: "bg-blue-500/10",
    iconColorClass: "text-blue-600",
    href: "/assessment"
  },
  { 
    id: "b", 
    icon: History, 
    title: "ประวัติการประเมิน",
    description: "ดูผลการประเมินสุขภาพจิตย้อนหลัง",
    bgColorClass: "bg-purple-500/10",
    iconColorClass: "text-purple-600",
    href: "/assessment-history"
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
  const router = useRouter();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setLoggedInUsername(storedUsername);
      }
    } catch (error) {
      console.error("Failed to load username from local storage:", error);
    }
  }, []);

  const handleLogout = () => {
    setShowLogoutDialog(false);
    try {
      localStorage.removeItem("username");
      // Clearing of specific data like chat/assessment history is now handled in the settings page.
    } catch (error) {
      console.error("Failed to remove data from local storage during logout:", error);
    }
    router.push("/");
  };

  return (
    <>
      <div className="w-full max-w-md bg-card rounded-xl shadow-lg m-4 sm:m-6 md:m-8 flex flex-col h-[calc(100vh-4rem)] max-h-[700px]">
        <header className="w-full bg-primary text-primary-foreground p-4 rounded-t-xl shadow-md flex items-center justify-between">
          <div className="w-10 h-10"></div> {/* Placeholder for balance */}
          <h2 className="text-xl font-semibold font-headline">เลือกเมนูที่สนใจ</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/80">
                <UserCircle2 className="h-6 w-6" aria-label="โปรไฟล์ผู้ใช้" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>ชื่อผู้ใช้: {loggedInUsername || ""}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>การตั้งค่า</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>ออกจากระบบ</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
        <footer className="p-4 border-t border-border text-center text-xs">
          Health AI Plus v0.0.1
        </footer>
      </div>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการออกจากระบบ</AlertDialogTitle>
            <AlertDialogDescription>
              คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowLogoutDialog(false)}>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              ออกจากระบบ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
