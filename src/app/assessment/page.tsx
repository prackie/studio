
"use client";

import { MentalHealthAssessment } from "@/components/assessment/mental-health-assessment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AssessmentPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-background">
       <div className="absolute top-4 left-4">
         <Link href="/menu" passHref>
           <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
             <ArrowLeft className="h-6 w-6" />
             <span className="sr-only">กลับไปเมนูหลัก</span>
           </Button>
         </Link>
       </div>
      <MentalHealthAssessment />
    </div>
  );
}
