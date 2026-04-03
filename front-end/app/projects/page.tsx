"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockUsers } from "@/lib/mock-data"
import { IconArrowRight } from "@tabler/icons-react"

interface Project {
  id: string
  name: string
  description: string
  progress: number
  taskCount: number
  completedCount: number
  status: "active" | "planning" | "review" | "completed"
  teamMembers: string[]
  dueDate: string
}

const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "Orvyn Platform",
    description: "Complete redesign of the core Orvyn platform with new architecture and features",
    progress: 65,
    taskCount: 24,
    completedCount: 16,
    status: "active",
    teamMembers: ["user-1", "user-2", "user-4"],
    dueDate: "2026-06-30",
  },
  {
    id: "proj-2",
    name: "Mobile App",
    description: "Native iOS and Android applications for enhanced mobile user experience",
    progress: 30,
    taskCount: 18,
    completedCount: 5,
    status: "active",
    teamMembers: ["user-0", "user-3", "user-5"],
    dueDate: "2026-08-15",
  },
  {
    id: "proj-3",
    name: "API Gateway",
    description: "Scalable API gateway with advanced routing, rate limiting, and monitoring",
    progress: 85,
    taskCount: 14,
    completedCount: 12,
    status: "review",
    teamMembers: ["user-2", "user-5"],
    dueDate: "2026-04-30",
  },
  {
    id: "proj-4",
    name: "Design System 2.0",
    description: "Next generation design system with improved components and accessibility",
    progress: 45,
    taskCount: 20,
    completedCount: 9,
    status: "active",
    teamMembers: ["user-4", "user-1"],
    dueDate: "2026-07-15",
  },
]

const statusColors: Record<string, string> = {
  active: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  planning: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  review: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
}

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const teamMemberObjects = mockUsers.filter(u =>
    project.teamMembers.includes(u.id)
  )
  const daysUntilDue = Math.ceil(
    (new Date(project.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )
  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <CardDescription className="mt-1">{project.description}</CardDescription>
          </div>
          <Badge className={statusColors[project.status]}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Tasks</p>
            <p className="font-semibold text-lg">{project.completedCount}/{project.taskCount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Due Date</p>
            <p className="font-semibold">
              {daysUntilDue > 0 ? `${daysUntilDue}d` : "Overdue"}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Team ({teamMemberObjects.length})</p>
          <div className="flex items-center gap-1">
            {teamMemberObjects.map((member) => (
              <img key={member.id} src={member.avatar} alt={member.name} title={member.name} className="w-7 h-7 rounded-full border border-background" />
            ))}
          </div>
        </div>
        <button className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mt-2">
          View Details
          <IconArrowRight className="size-4" />
        </button>
      </CardContent>
    </Card>
  )
}

export default function ProjectsPage() {
  const activeProjects = mockProjects.filter(p => p.status === "active").length
  const totalTasks = mockProjects.reduce((sum, p) => sum + p.taskCount, 0)
  const completedTasks = mockProjects.reduce((sum, p) => sum + p.completedCount, 0)
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
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-1">Manage and track all active projects</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{activeProjects}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{completedTasks}/{totalTasks}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {Math.round((completedTasks / totalTasks) * 100)}%
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {mockProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
      }
