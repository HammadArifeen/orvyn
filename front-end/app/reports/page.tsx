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
  IconBarChart3,
  IconUsers,
  IconCheckCircle,
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

const typeIcons: Record<string, React.ReactNode> = {
  summary: <IconFileText className="size-5 text-blue-600" />,
  performance: <IconUsers className="size-5 text-purple-600" />,
  trends: <IconBarChart3 className="size-5 text-green-600" />,
  analysis: <IconCheckCircle className="size-5 text-orange-600" />,
}

const typeColors: Record<string, string> = {
  summary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  performance: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  trends: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  analysis: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

interface ReportCardProps {
  report: Report
}

function ReportCard({ report }: ReportCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="mt-1">{typeIcons[report.type]}</div>
            <div className="flex-1">
              <CardTitle className="text-lg">{report.title}</CardTitle>
              <CardDescription className="mt-1 line-clamp-2">{report.description}</CardDescription>
            </div>
          </div>
          <Badge className={typeColors[report.type]} variant="default">
            {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 pt-0">
        <div className="grid grid-cols-3 gap-2 text-sm pt-2 border-t">
          <div>
            <p className="text-muted-foreground text-xs">Generated</p>
            <p className="font-medium">{formatDate(report.generatedAt)}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Pages</p>
            <p className="font-medium">{report.pages}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Format</p>
            <p className="font-medium">{report.format}</p>
          </div>
        </div>
        <div className="flex gap-2 mt-auto">
          <Button variant="outline" size="sm" className="flex-1 gap-2">
            <IconArrowRight className="size-4" />
            View
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <IconDownload className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ReportsPage() {
  const totalReports = mockReports.length
  const reportsThisMonth = mockReports.filter((r) => {
    const reportDate = new Date(r.generatedAt)
    const now = new Date()
    return reportDate.getMonth() === now.getMonth() && reportDate.getFullYear() === now.getFullYear()
  }).length
  const pdfReports = mockReports.filter((r) => r.format === "PDF").length

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
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground mt-1">Generated reports and analytics</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{totalReports}</p>
                <p className="text-xs text-muted-foreground mt-1">All time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{reportsThisMonth}</p>
                <p className="text-xs text-muted-foreground mt-1">Generated reports</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">PDF Exports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{pdfReports}</p>
                <p className="text-xs text-muted-foreground mt-1">Available formats</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {mockReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Report Types</CardTitle>
              <CardDescription>Distribution of generated reports by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries({
                  summary: mockReports.filter((r) => r.type === "summary").length,
                  performance: mockReports.filter((r) => r.type === "performance").length,
                  trends: mockReports.filter((r) => r.type === "trends").length,
                  analysis: mockReports.filter((r) => r.type === "analysis").length,
                }).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {typeIcons[type]}
                      <span className="text-sm font-medium capitalize">{type}</span>
                    </div>
                    <Badge variant="outline">{count} reports</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
  }
