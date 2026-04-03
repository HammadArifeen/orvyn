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
              <Badge variant="outline" className="text-xs">+{user.skills.length - 3}</Badge>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <IconCircleCheck className="size-4 text-green-600" />
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <p className="text-lg font-semibold">{user.engagement.completedTasks}</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <IconClock className="size-4 text-blue-600" />
              <span className="text-xs text-muted-foreground">Response</span>
            </div>
            <p className="text-lg font-semibold">{user.engagement.avgResponseTime}h</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <IconTrendingUp className="size-4 text-purple-600" />
              <span className="text-xs text-muted-foreground">Active</span>
            </div>
            <p className="text-lg font-semibold">{user.engagement.activeSubtasks}</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-sm text-muted-foreground">Total Contributions</span>
          <span className="font-semibold text-lg">{user.engagement.totalContributions}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TeamPage() {
  const totalMembers = mockUsers.length
  const totalCompletedTasks = mockUsers.reduce((sum, u) => sum + u.engagement.completedTasks, 0)
  const avgResponseTime = (
    mockUsers.reduce((sum, u) => sum + u.engagement.avgResponseTime, 0) / mockUsers.length
  ).toFixed(1)

  return (
    <SidebarProvider
      className="w-full min-h-svh md:grid md:grid-cols-[minmax(0,var(--sidebar-width))_minmax(0,1fr)]"
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="min-w-0">
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
            <p className="text-muted-foreground mt-1">Manage and view team member profiles</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Members</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{totalMembers}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Tasks Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{totalCompletedTasks}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{avgResponseTime}h</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {mockUsers.map((user) => (
              <TeamMemberCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
