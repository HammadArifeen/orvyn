"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  IconDownload,
  IconFileText,
  IconFileSpreadsheet,
  IconFileTypePdf,
  IconClock,
} from "@tabler/icons-react"

interface Document {
  id: string
  name: string
  type: "pdf" | "doc" | "sheet"
  size: string
  lastModified: string
  owner: string
  tags: string[]
}

const mockDocuments: Document[] = [
  { id: "doc-1", name: "Q1 Sprint Report", type: "pdf", size: "2.4 MB", lastModified: "2026-03-28", owner: "Sarah Chen", tags: ["report", "quarterly"] },
  { id: "doc-2", name: "API Documentation", type: "doc", size: "856 KB", lastModified: "2026-03-25", owner: "Marcus Rodriguez", tags: ["documentation", "backend"] },
  { id: "doc-3", name: "Design System Guide", type: "doc", size: "4.2 MB", lastModified: "2026-03-22", owner: "Priya Patel", tags: ["design", "guidelines"] },
  { id: "doc-4", name: "Team Budget 2026", type: "sheet", size: "512 KB", lastModified: "2026-03-20", owner: "Emma Watson", tags: ["budget", "finance"] },
  { id: "doc-5", name: "User Research Findings", type: "pdf", size: "3.1 MB", lastModified: "2026-03-18", owner: "Sarah Chen", tags: ["research", "ux"] },
  { id: "doc-6", name: "Database Schema", type: "doc", size: "1.2 MB", lastModified: "2026-03-15", owner: "Alex Kim", tags: ["database", "technical"] },
  { id: "doc-7", name: "Q2 Roadmap", type: "sheet", size: "1.8 MB", lastModified: "2026-03-14", owner: "Marcus Rodriguez", tags: ["planning", "roadmap"] },
  { id: "doc-8", name: "Testing Strategy", type: "doc", size: "892 KB", lastModified: "2026-03-10", owner: "Liam O'Brien", tags: ["testing", "qa"] },
]

const typeIcons: Record<string, React.ReactNode> = {
  pdf: <IconFileTypePdf className="size-4 text-red-600" />,
  doc: <IconFileText className="size-4 text-blue-600" />,
  sheet: <IconFileSpreadsheet className="size-4 text-green-600" />,
}

const typeColors: Record<string, string> = {
  pdf: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  doc: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  sheet: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

export default function DataLibraryPage() {
  const uniqueOwners = [...new Set(mockDocuments.map(d => d.owner))].length
  const totalSize = mockDocuments.length

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
            <h1 className="text-3xl font-bold tracking-tight">Data Library</h1>
            <p className="text-muted-foreground mt-1">Access and manage project documentation</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Documents</CardTitle>
              </CardHeader>
              <CardContent><p className="text-3xl font-bold">{totalSize}</p></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Contributors</CardTitle>
              </CardHeader>
              <CardContent><p className="text-3xl font-bold">{uniqueOwners}</p></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Recently Updated</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm font-medium">{formatDate(mockDocuments[0].lastModified)}</p></CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader><CardTitle>Documents</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {typeIcons[doc.type]}
                            <span className="font-medium">{doc.name}</span>
                          </div>
                        </TableCell>
                        <TableCell><Badge className={typeColors[doc.type]}>{doc.type.toUpperCase()}</Badge></TableCell>
                        <TableCell className="text-muted-foreground">{doc.size}</TableCell>
                        <TableCell>{doc.owner}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <IconClock className="size-4" />
                            <span className="text-sm">{formatDate(doc.lastModified)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {doc.tags.map((tag) => (<Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="gap-2">
                            <IconDownload className="size-4" />
                            <span className="sr-only">Download {doc.name}</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
   }
