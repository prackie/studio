
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface MenuCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColorClass: string;
  iconColorClass: string;
  onClick?: () => void;
}

export function MenuCard({ icon: Icon, title, description, bgColorClass, iconColorClass, onClick }: MenuCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      alert(`คุณคลิกที่: ${title}`);
    }
  };

  return (
    <Card
      className={`w-full ${bgColorClass} p-4 mb-4 rounded-xl shadow-md flex items-center transform transition duration-300 ease-in-out hover:scale-105 cursor-pointer`}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick();}}
      role="button"
      aria-label={`เปิด ${title}`}
    >
      <CardContent className="flex items-center p-0 w-full">
        <Icon className={`w-8 h-8 ${iconColorClass} mr-4`} aria-hidden="true" />
        <div>
          <CardTitle className="text-xl font-semibold text-card-foreground font-headline">{title}</CardTitle>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
