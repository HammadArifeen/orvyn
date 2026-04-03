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
