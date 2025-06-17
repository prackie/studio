
"use client";

import { AssessmentHistoryTable } from "@/components/assessment/assessment-history-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AssessmentHistoryPage() {
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
        ประวัติการประเมิน
        </CardTitle>
        <div className="w-10 h-10"></div> {/* Placeholder */}
      </CardHeader>
      <CardContent className="p-6">
        <AssessmentHistoryTable />
      </CardContent>
    </Card>
  </div>
  );
}
