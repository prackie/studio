
"use client";

import { AssessmentHistoryTable } from "@/components/assessment/assessment-history-table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AssessmentHistoryPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center p-4 bg-background">
      <div className="absolute top-4 left-4">
        <Link href="/menu" passHref>
          <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">กลับไปเมนูหลัก</span>
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-3xl mt-16">
        <AssessmentHistoryTable />
      </div>
    </div>
  );
}
