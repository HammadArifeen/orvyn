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
  IconCircleCheck,
  IconSparkles,
} from "@tabler/icons-react"

const quickActions = [
  { id: "summarize", label: "Summarize", icon: <IconFileText className="size-4" />, description: "Create concise summary" },
  { id: "email", label: "Draft Email", icon: <IconMailForward className="size-4" />, description: "Compose professional email" },
  { id: "meeting", label: "Meeting Notes", icon: <IconCalendar className="size-4" />, description: "Organize meeting notes" },
  { id: "task", label: "Task Description", icon: <IconCircleCheck className="size-4" />, description: "Create task details" },
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
