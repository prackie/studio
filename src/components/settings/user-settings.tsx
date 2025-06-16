
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useToast } from "@/hooks/use-toast";
import questionsData from "@/data/questions.json"; // To get localStorageKey for assessment

const CHAT_HISTORY_LOCAL_STORAGE_KEY = "geminiChatHistory"; // As defined in GeminiChat component

export function UserSettings() {
  const [showClearAssessmentDialog, setShowClearAssessmentDialog] = React.useState(false);
  const [showClearChatDialog, setShowClearChatDialog] = React.useState(false);
  const { toast } = useToast();

  const handleClearAssessmentHistory = () => {
    try {
      localStorage.removeItem(questionsData.localStorageKey);
      toast({
        title: "สำเร็จ",
        description: "ล้างประวัติการทำแบบประเมินเรียบร้อยแล้ว",
      });
    } catch (error) {
      console.error("Error clearing assessment history:", error);
      toast({
        variant: "destructive",
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถล้างประวัติการทำแบบประเมินได้",
      });
    }
    setShowClearAssessmentDialog(false);
  };

  const handleClearChatHistory = () => {
    try {
      localStorage.removeItem(CHAT_HISTORY_LOCAL_STORAGE_KEY);
      toast({
        title: "สำเร็จ",
        description: "ล้างข้อมูลแชทเรียบร้อยแล้ว",
      });
    } catch (error) {
      console.error("Error clearing chat history:", error);
      toast({
        variant: "destructive",
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถล้างข้อมูลแชทได้",
      });
    }
    setShowClearChatDialog(false);
  };

  return (
    <>
      <Card className="shadow-none border-0">
        <CardHeader className="px-0 pt-0">
          <CardTitle>ตั้งค่าบัญชีผู้ใช้</CardTitle>
          <CardDescription>
            จัดการข้อมูลและความเป็นส่วนตัวของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 pb-0 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">จัดการข้อมูล</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">ประวัติการทำแบบประเมิน</p>
                  <p className="text-sm text-muted-foreground">ลบข้อมูลผลการประเมินสุขภาพจิตทั้งหมดของคุณ</p>
                </div>
                <Button variant="destructive" onClick={() => setShowClearAssessmentDialog(true)}>
                  ล้างประวัติ
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">ข้อมูลแชท</p>
                  <p className="text-sm text-muted-foreground">ลบประวัติการสนทนากับผู้เชี่ยวชาญ AI ทั้งหมด</p>
                </div>
                <Button variant="destructive" onClick={() => setShowClearChatDialog(true)}>
                  ล้างข้อมูลแชท
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">การตั้งค่าอื่นๆ (เร็วๆ นี้)</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                <span className="text-sm font-medium">เปลี่ยนธีม</span>
                <span className="text-xs text-muted-foreground">ยังไม่พร้อมใช้งาน</span>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                <span className="text-sm font-medium">จัดการการแจ้งเตือน</span>
                <span className="text-xs text-muted-foreground">ยังไม่พร้อมใช้งาน</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showClearAssessmentDialog} onOpenChange={setShowClearAssessmentDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการล้างประวัติ</AlertDialogTitle>
            <AlertDialogDescription>
              คุณแน่ใจหรือไม่ว่าต้องการล้างประวัติการทำแบบประเมินทั้งหมด? การกระทำนี้ไม่สามารถย้อนกลับได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowClearAssessmentDialog(false)}>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearAssessmentHistory} className="bg-destructive hover:bg-destructive/90">
              ล้างประวัติ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showClearChatDialog} onOpenChange={setShowClearChatDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการล้างข้อมูลแชท</AlertDialogTitle>
            <AlertDialogDescription>
              คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลแชททั้งหมด? การกระทำนี้ไม่สามารถย้อนกลับได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowClearChatDialog(false)}>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearChatHistory} className="bg-destructive hover:bg-destructive/90">
              ล้างข้อมูลแชท
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
