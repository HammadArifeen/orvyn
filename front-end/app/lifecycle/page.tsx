"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockTasks } from "@/lib/mock-data"
import { Task } from "@/types/task"
import { IconGripVertical } from "@tabler/icons-react"

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
}

const statusColumns = ["open", "in_progress", "review", "closed"]
const statusLabels: Record<string, string> = {
  open: "Open",
  in_progress: "In Progress",
  review: "Review",
  closed: "Closed",
}

const getTasksByStatus = (tasks: Task[], status: string) => {
  return tasks.filter(task => {
    if (task.status === "closed") return status === "closed"
    if (task.status === "open") {
      const progress = task.progress || 0
      if (progress === 0) return status === "open"
      if (progress < 80) return status === "in_progress"
      if (progress < 100) return status === "review"
    }
    return false
  })
}

interface TaskCardProps {
  task: Task
}

function TaskCardComponent({ task }: TaskCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-semibold line-clamp-2">
            {task.title}
          </CardTitle>
          <IconGripVertical className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2">
          {task.description}
        </p>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className={priorityColors[task.priority]}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
          <span className="text-xs font-medium text-muted-foreground">
            {task.progress || 0}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all"
            style={{ width: `${task.progress || 0}%` }}
          />
        </div>
        {task.assignedMembers && task.assignedMembers.length > 0 && (
          <div className="flex items-center gap-1 pt-1">
            <span className="text-xs text-muted-foreground">Assigned:</span>
            <div className="flex -space-x-1">
              {task.assignedMembers.slice(0, 3).map((member) => (
                <img
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  title={member.name}
                  className="w-5 h-5 rounded-full border border-background"
                />
              ))}
              {task.assignedMembers.length > 3 && (
                <div className="w-5 h-5 rounded-full border border-background bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium">+{task.assignedMembers.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function LifecyclePage() {
  const tasks = mockTasks

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
            <h1 className="text-3xl font-bold tracking-tight">Task Lifecycle</h1>
            <p className="text-muted-foreground mt-1">Manage tasks across different stages</p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 min-h-96">
            {statusColumns.map((status) => {
              const columnTasks = getTasksByStatus(tasks, status)
              return (
                <div key={status} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold flex items-center gap-2">
                      {statusLabels[status]}
                      <Badge variant="secondary" className="text-xs">
                        {columnTasks.length}
                      </Badge>
                    </h2>
                  </div>
                  <div className="flex-1 space-y-3 pb-4">
                    {columnTasks.length > 0 ? (
                      columnTasks.map((task) => (
                        <TaskCardComponent key={task.id} task={task} />
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-32 rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/30">
                        <p className="text-xs text-muted-foreground">No tasks</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
    }
