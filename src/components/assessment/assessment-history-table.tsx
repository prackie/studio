
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import questionsData from "@/data/questions.json"; // To get localStorageKey

interface AssessmentRecord {
  timestamp: string;
  // questionsUsed: any[]; // Not displayed directly in table, but part of the record
  // answers: { [key: string]: number }; // Not displayed directly in table
  totalScore: number;
  result: {
    level: string;
    description: string;
  };
}

export function AssessmentHistoryTable() {
  const [history, setHistory] = useState<AssessmentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { localStorageKey } = questionsData;
    try {
      const storedHistoryRaw = localStorage.getItem(localStorageKey);
      if (storedHistoryRaw) {
        const parsedHistory: AssessmentRecord[] = JSON.parse(storedHistoryRaw);
        // Sort by timestamp descending (newest first)
        parsedHistory.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setHistory(parsedHistory);
      }
    } catch (error) {
      console.error("Error loading assessment history from local storage:", error);
      // Potentially clear corrupted storage or notify user
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-muted-foreground">กำลังโหลดประวัติ...</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground text-lg">ยังไม่มีประวัติการทำแบบประเมิน</p>
        <p className="text-sm text-muted-foreground">ลองทำแบบประเมินเพื่อดูประวัติของคุณที่นี่</p>
      </div>
    );
  }

  return (
        <Table>
          <TableCaption>รายการผลการประเมินสุขภาพจิตของคุณ</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">วันที่และเวลา</TableHead>
              <TableHead className="text-center">คะแนนรวม</TableHead>
              <TableHead>ระดับผลลัพธ์</TableHead>
              <TableHead className="text-right">คำแนะนำเบื้องต้น</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((record, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {new Date(record.timestamp).toLocaleString("th-TH", {
                    year: 'numeric', month: 'short', day: 'numeric', 
                    hour: '2-digit', minute: '2-digit' 
                  })}
                </TableCell>
                <TableCell className="text-center">{record.totalScore}</TableCell>
                <TableCell>{record.result.level}</TableCell>
                <TableCell className="text-sm max-w-xs">{record.result.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  );
}
