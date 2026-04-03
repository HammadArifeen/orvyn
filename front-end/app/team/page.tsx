"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockUsers } from "@/lib/mock-data"
import { User } from "@/types/user"
import { IconTrendingUp, IconClock, IconCircleCheck } from "@tabler/icons-react"

interface TeamMemberCardProps {
  user: User
}

function TeamMemberCard({ user }: TeamMemberCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <CardTitle className="text-lg">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Skills</p>
          <div className="flex flex-wrap gap-1">
            {user.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
            ))}
            {user.skills.length > 3 && (
