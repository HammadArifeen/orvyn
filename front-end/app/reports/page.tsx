"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  IconFileText,
  IconArrowRight,
  IconDownload,
  IconChartBar,
  IconUsers,
  IconCircleCheck,
} from "@tabler/icons-react"

interface Report {
  id: string
  title: string
  description: string
  type: "summary" | "performance" | "trends" | "analysis"
  generatedAt: string
  pages: number
  format: "PDF" | "CSV" | "HTML"
}

const mockReports: Report[] = [
  { id: "report-1", title: "Weekly Sprint Summary", description: "Overview of tasks completed, in progress, and planned for the current sprint", type: "summary", generatedAt: "2026-03-31", pages: 5, format: "PDF" },
  { id: "report-2", title: "Team Performance Report", description: "Detailed analysis of team productivity, response times, and task completion rates", type: "performance", generatedAt: "2026-03-28", pages: 8, format: "PDF" },
  { id: "report-3", title: "Task Completion Trends", description: "Historical data visualization showing task completion patterns and trends", type: "trends", generatedAt: "2026-03-25", pages: 6, format: "PDF" },
  { id: "report-4", title: "Project Risk Analysis", description: "Assessment of project risks, blockers, and mitigation strategies", type: "analysis", generatedAt: "2026-03-22", pages: 12, format: "PDF" },
  { id: "report-5", title: "Resource Allocation Report", description: "Analysis of team member workload, utilization rates, and capacity planning", type: "analysis", generatedAt: "2026-03-20", pages: 7, format: "CSV" },
  { id: "report-6", title: "Quality Metrics Dashboard", description: "Test coverage, bug rates, and quality improvement metrics", type: "performance", generatedAt: "2026-03-18", pages: 9, format: "HTML" },
]
