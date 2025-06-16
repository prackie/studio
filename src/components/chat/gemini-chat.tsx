
"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, User, Sparkles, Loader2 } from "lucide-react";
import { chatWithGemini, type ChatInput, type ChatOutput } from "@/ai/flows/chat-flow";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const LOCAL_STORAGE_KEY = "geminiChatHistory";

export function GeminiChat() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    try {
      const storedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.error("Failed to load messages from local storage:", error);
      // Clear corrupted storage
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  React.useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save messages to local storage:", error);
      }
    }
  }, [messages]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessageContent = inputValue.trim();
    const newUserMessage: Message = {
      id: Date.now().toString() + "-user",
      role: "user",
      content: userMessageContent,
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const result: ChatOutput = await chatWithGemini({ message: userMessageContent });
      const aiMessage: Message = {
        id: Date.now().toString() + "-assistant",
        role: "assistant",
        content: result.response,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error chatting with Gemini:", error);
      const errorMessage: Message = {
        id: Date.now().toString() + "-error",
        role: "assistant",
        content: "ขออภัยค่ะ เกิดข้อผิดพลาดในการสื่อสารกับ AI กรุณาลองใหม่อีกครั้ง",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-card text-card-foreground rounded-b-xl">
      <ScrollArea className="flex-grow mb-4 pr-3">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "p-3 rounded-xl max-w-[85%] flex items-start space-x-3 shadow",
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "mr-auto bg-muted text-muted-foreground border"
              )}
            >
              <Avatar className={cn(
                "h-8 w-8 text-sm",
                message.role === "user" ? "bg-primary-foreground text-primary" : "bg-accent text-accent-foreground"
              )}>
                <AvatarFallback>
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>
              <p className="whitespace-pre-wrap text-sm leading-relaxed pt-1">{message.content}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 pt-2 border-t">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="พิมพ์ข้อความของคุณ..."
          className="flex-grow h-10 text-base"
          disabled={isLoading}
          aria-label="Message input"
        />
        <Button type="submit" size="icon" className="h-10 w-10" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          <span className="sr-only">ส่งข้อความ</span>
        </Button>
      </form>
    </div>
  );
}
