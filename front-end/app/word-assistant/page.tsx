"use client"

import * as React from "react"
import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  IconSend,
  IconFileText,
  IconMailForward,
  IconCalendar,
  IconCheckCircle,
  IconSparkles,
} from "@tabler/icons-react"

const quickActions = [
  { id: "summarize", label: "Summarize", icon: <IconFileText className="size-4" />, description: "Create concise summary" },
  { id: "email", label: "Draft Email", icon: <IconMailForward className="size-4" />, description: "Compose professional email" },
  { id: "meeting", label: "Meeting Notes", icon: <IconCalendar className="size-4" />, description: "Organize meeting notes" },
  { id: "task", label: "Task Description", icon: <IconCheckCircle className="size-4" />, description: "Create task details" },
]

const sampleOutputs: Record<string, { title: string; content: string }> = {
  summarize: {
    title: "Summary Output",
    content: "The Orvyn Platform is a comprehensive system for managing team tasks and projects. Key highlights include: improved user authentication with JWT tokens, modern dashboard redesign, enhanced mobile experience, and scalable API gateway infrastructure. The platform enables seamless team collaboration with real-time updates and advanced analytics.",
  },
  email: {
    title: "Draft Email",
    content: "Subject: Project Update - Orvyn Platform\n\nHi Team,\n\nI wanted to share a quick update on the Orvyn Platform progress. We've successfully completed the authentication system redesign and are now focused on the dashboard improvements.\n\nKey milestones this week:\n- JWT token integration complete\n- UI components finalized\n- Mobile testing initiated\n\nPlease let me know if you have any questions.\n\nBest regards,\nProject Team",
  },
  meeting: {
    title: "Meeting Notes",
    content: "Meeting: Platform Architecture Review\nDate: March 31, 2026\nAttendees: Marcus, Sarah, Emma, Alex\n\nAgenda:\n1. API Gateway Architecture - Completed design review\n2. Database Optimization - Identified 3 key improvements\n3. Security Audit - Scheduled for April\n\nAction Items:\n- Marcus: Finalize API specs by April 5\n- Sarah: Update UI components by April 3\n- Emma: Infrastructure setup by April 7\n\nNext Meeting: April 7 @ 2 PM",
  },
  task: {
    title: "Task Description",
    content: "Task: Implement Advanced Search Features\n\nDescription:\nAdd comprehensive search functionality to the platform allowing users to filter tasks, projects, and documents with advanced query options.\n\nRequirements:\n- Full-text search across all content\n- Multi-field filtering (priority, status, date)\n- Search history and saved filters\n- Real-time search suggestions\n\nAcceptance Criteria:\n- Search returns results in <500ms\n- 100% test coverage\n- Works across all browsers\n\nEstimated Hours: 16",
  },
}

export default function WordAssistantPage() {
  const [inputText, setInputText] = useState("")
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleActionClick = (actionId: string) => {
    setIsLoading(true)
    setSelectedAction(actionId)
    setTimeout(() => { setIsLoading(false) }, 500)
  }

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setSelectedAction("email")
      }, 500)
    }
  }

  const currentOutput = selectedAction && sampleOutputs[selectedAction] ? sampleOutputs[selectedAction] : null

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
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <IconSparkles className="size-8 text-yellow-500" />
              AI Writing Assistant
            </h1>
            <p className="text-muted-foreground mt-1">Get help drafting emails, summarizing content, and organizing notes</p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 flex-1">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
              <Card>
                <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => (
                      <Button key={action.id} variant={selectedAction === action.id ? "default" : "outline"} size="sm" onClick={() => handleActionClick(action.id)} className="h-auto flex flex-col items-start gap-2 p-3">
                        <div className="flex items-center gap-2 w-full">
                          {action.icon}
                          <span className="font-medium text-sm">{action.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground text-left">{action.description}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="flex-1 flex flex-col">
                <CardHeader><CardTitle className="text-base">Input Text</CardTitle></CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  <textarea
                    placeholder="Paste your text here or type your request..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 p-3 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button onClick={handleSendMessage} disabled={!inputText.trim() || isLoading} className="w-full gap-2">
                    <IconSend className="size-4" />
                    {isLoading ? "Processing..." : "Process Text"}
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4 flex flex-col">
              <Card className="flex-1 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>Output</span>
                    {currentOutput && (<Badge variant="secondary" className="text-xs">{currentOutput.title}</Badge>)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto">
                  {currentOutput ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-muted rounded-lg text-sm whitespace-pre-wrap font-mono text-xs leading-relaxed max-h-96 overflow-auto">{currentOutput.content}</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 text-xs">Copy</Button>
                        <Button variant="outline" size="sm" className="flex-1 text-xs">Regenerate</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                      <div className="space-y-2">
                        <IconSparkles className="size-8 mx-auto opacity-50" />
                        <p className="text-sm">Select an action or submit text</p>
                        <p className="text-xs">Output will appear here</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-sm">Tips</CardTitle></CardHeader>
                <CardContent>
                  <ul className="text-xs space-y-2 text-muted-foreground">
                    <li>Use clear and concise input for better results</li>
                    <li>Try different quick actions for the same text</li>
                    <li>Use regenerate to get alternative outputs</li>
                    <li>Copy and paste outputs directly to documents</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
    }
