"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { mockTasks, mockUsers } from "@/lib/mock-data"

const monthlyData = [
  { month: "Jan", completed: 24, inProgress: 10, pending: 5 },
  { month: "Feb", completed: 31, inProgress: 12, pending: 8 },
  { month: "Mar", completed: 28, inProgress: 15, pending: 6 },
  { month: "Apr", completed: 35, inProgress: 18, pending: 7 },
  { month: "May", completed: 42, inProgress: 16, pending: 4 },
  { month: "Jun", completed: 39, inProgress: 14, pending: 9 },
]

const priorityCounts = [
  { name: "High", value: mockTasks.filter(t => t.priority === "high").length, fill: "#ef4444" },
  { name: "Medium", value: mockTasks.filter(t => t.priority === "medium").length, fill: "#eab308" },
  { name: "Low", value: mockTasks.filter(t => t.priority === "low").length, fill: "#3b82f6" },
]

const teamWorkload = mockUsers.map((user) => ({
  name: user.name.split(" ")[0],
  tasks: Math.floor(Math.random() * 8) + 3,
  completed: Math.floor(Math.random() * 5) + 1,
}))

const completionChartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  inProgress: {
    label: "In Progress",
    color: "hsl(var(--chart-2))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

const workloadChartConfig = {
  tasks: {
    label: "Total Tasks",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

const completedTasksCount = mockTasks.filter(t => t.status === "closed").length
const avgProgress = Math.round(
  mockTasks.reduce((sum, t) => sum + (t.progress || 0), 0) / mockTasks.length
)
const avgTeamEngagement = Math.round(
  mockUsers.reduce((sum, u) => sum + u.engagement.completedTasks, 0) / mockUsers.length
)

interface MetricCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
}

function MetricCard({ title, value, description, icon }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-2xl font-bold">{value}</div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export default function AnalyticsPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground mt-1">Team performance and task metrics</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Total Tasks" value={mockTasks.length} description="Active and completed tasks" icon={null} />
            <MetricCard title="Completed" value={completedTasksCount} description={`${Math.round((completedTasksCount / mockTasks.length) * 100)}% completion rate`} icon={null} />
            <MetricCard title="Average Progress" value={`${avgProgress}%`} description="Across all open tasks" icon={null} />
            <MetricCard title="Team Engagement" value={`${avgTeamEngagement}`} description="Average tasks per member" icon={null} />
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Task Completion Over Time</CardTitle>
                <CardDescription>Monthly task completion trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={completionChartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="completed" fill={completionChartConfig.completed.color} />
                      <Bar dataKey="inProgress" fill={completionChartConfig.inProgress.color} />
                      <Bar dataKey="pending" fill={completionChartConfig.pending.color} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Priority Distribution</CardTitle>
                <CardDescription>Tasks by priority level</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Pie data={priorityCounts} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                        {priorityCounts.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Team Workload</CardTitle>
                <CardDescription>Tasks per team member</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={workloadChartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={teamWorkload} layout="vertical" margin={{ left: 100 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={90} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="tasks" fill={workloadChartConfig.tasks.color} />
                      <Bar dataKey="completed" fill={workloadChartConfig.completed.color} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
  }
