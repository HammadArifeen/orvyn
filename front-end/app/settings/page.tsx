"use client"

import { useAuth } from "@/components/auth-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandSlack,
  IconShieldCheck,
  IconExternalLink,
  IconCheck,
} from "@tabler/icons-react"

const connections = [
  {
    id: "github",
    name: "GitHub",
    description: "Create issues, manage repos, and track PRs through AI agents",
    icon: <IconBrandGithub className="size-6" />,
    scopes: ["repo", "read:user"],
    color: "bg-gray-900 text-white",
  },
  {
    id: "google-oauth2",
    name: "Google",
    description: "Search Gmail, manage Calendar, and access Drive via AI agents",
    icon: <IconBrandGoogle className="size-6" />,
    scopes: ["gmail.readonly", "calendar.readonly"],
    color: "bg-blue-600 text-white",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Send messages and read channels through AI agents",
    icon: <IconBrandSlack className="size-6" />,
    scopes: ["channels:read", "chat:write"],
    color: "bg-purple-700 text-white",
  },
]

export default function SettingsPage() {
  const { user, isAuthenticated } = useAuth()

  return (
    <SidebarProvider
      className="w-full min-h-svh md:grid md:grid-cols-[minmax(0,var(--sidebar-width))_minmax(0,1fr)]"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="min-w-0">
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Connected Accounts</h2>
            <p className="text-muted-foreground mt-1">
              Manage which third-party services your AI agents can access on your behalf.
              Powered by Auth0 Token Vault for secure token management.
            </p>
          </div>

          {/* Security notice */}
          <div className="flex items-start gap-3 rounded-lg border bg-green-50 dark:bg-green-950/20 p-4">
            <IconShieldCheck className="size-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Secure Token Management</p>
              <p className="text-sm text-muted-foreground mt-1">
                Auth0 Token Vault uses OAuth 2.0 token exchange (RFC 8693) to securely
                manage access tokens. Your credentials are never stored in the application
                — tokens are encrypted and managed by Auth0&apos;s infrastructure with
                automatic refresh and revocation support.
              </p>
            </div>
          </div>

          {/* Connection cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {connections.map((conn) => (
              <div
                key={conn.id}
                className="rounded-lg border bg-card p-6 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${conn.color}`}>
                    {conn.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{conn.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {conn.scopes.join(", ")}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {conn.description}
                </p>

                <Button
                  asChild
                  className="w-full gap-2"
                  variant="outline"
                >
                  <a
                    href={`/api/auth/connect/${conn.id}?returnTo=/settings`}
                  >
                    <IconExternalLink className="size-4" />
                    Connect {conn.name}
                  </a>
                </Button>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <h3 className="font-semibold text-lg">How Auth0 Token Vault Works</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="rounded-full bg-primary/10 text-primary size-8 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h4 className="font-medium text-sm">Connect Account</h4>
                <p className="text-sm text-muted-foreground">
                  Link your third-party accounts through Auth0&apos;s secure OAuth flow.
                  You control which services to connect.
                </p>
              </div>
              <div className="space-y-2">
                <div className="rounded-full bg-primary/10 text-primary size-8 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h4 className="font-medium text-sm">Agent Requests Access</h4>
                <p className="text-sm text-muted-foreground">
                  When an AI agent needs to call an API, Token Vault exchanges tokens
                  securely using RFC 8693 — no credentials exposed.
                </p>
              </div>
              <div className="space-y-2">
                <div className="rounded-full bg-primary/10 text-primary size-8 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h4 className="font-medium text-sm">You Stay in Control</h4>
                <p className="text-sm text-muted-foreground">
                  Step-up authorization prompts you for consent when agents need
                  new permissions. Revoke access anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
