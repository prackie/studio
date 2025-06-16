
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  // Default values for testing purposes
  const defaultUsername = "user";
  const defaultPassword = "";
  const [username, setUsername] = React.useState(defaultUsername);
  const [password, setPassword] = React.useState(defaultPassword);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    if (username && password) {
      // Store username in local storage
      try {
        localStorage.setItem("username", username);
      } catch (error) {
        console.error("Failed to save username to local storage:", error);
        // Optionally, inform the user or handle the error appropriately
      }
      router.push("/menu");
    } else {
      // Handle empty fields, show error, etc.
      alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-md bg-card shadow-lg rounded-xl m-4 sm:m-6 md:m-8">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold text-primary font-headline">Health AI Plus+</CardTitle>
        <CardDescription className="text-muted-foreground mt-2">ยินดีต้อนรับ</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Label htmlFor="username" className="sr-only">ชื่อผู้ใช้ หรือ อีเมล</Label>
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                placeholder="ชื่อผู้ใช้ หรือ อีเมล"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg h-auto"
                required
                aria-label="ชื่อผู้ใช้ หรือ อีเมล"
              />
            </div>
            <div className="relative">
              <Label htmlFor="password" className="sr-only">รหัสผ่าน</Label>
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-12 py-3 text-lg h-auto"
                required
                aria-label="รหัสผ่าน"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-7 w-7 text-muted-foreground hover:bg-transparent"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full font-semibold py-3 text-lg h-auto transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            เข้าสู่ระบบ
          </Button>

          <div className="text-center">
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              ลืมรหัสผ่าน?
            </Link>
          </div>

          <p className="text-muted-foreground text-sm text-center">
            ยังไม่มีบัญชี?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              ลงทะเบียนที่นี่
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
