
"use client"; // This page itself can be a client component if it uses hooks or state directly, or a server component if GeminiChat handles all client interactions.
              // For simplicity with potential future page-level state, marking as client.

import { GeminiChat } from "@/components/chat/gemini-chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center p-4 bg-background">
      <Card className="w-full max-w-2xl h-[calc(100vh-6rem)] max-h-[800px] flex flex-col shadow-xl rounded-xl my-8">
        <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground p-4 rounded-t-xl">
          <Link href="/menu" passHref>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">กลับไปเมนูหลัก</span>
            </Button>
          </Link>
          <CardTitle className="text-xl font-semibold font-headline text-center flex-grow">
            คุยกับผู้เชี่ยวชาญ
          </CardTitle>
          <div className="w-10"></div> {/* Placeholder to balance the title */}
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden p-0">
          <GeminiChat />
        </CardContent>
      </Card>
    </div>
  );
}
