"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconShieldCheck, IconLogout, IconSettings, IconLink } from "@tabler/icons-react"

export function SiteHeader() {
  const { user, isAuthenticated, isLoading, loginUrl, logoutUrl } = useAuth()

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Dashboard</h1>

        <div className="ml-auto flex items-center gap-2">
          {/* Auth0 Token Vault badge */}
          <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            <IconShieldCheck className="size-3.5 text-green-600" />
            <span>Auth0 Secured</span>
          </div>

          {isLoading ? (
            <div className="size-8 rounded-full bg-muted animate-pulse" />
          ) : isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative size-8 rounded-full">
                  <Avatar className="size-8">
                    <AvatarImage src={user.picture} alt={user.name || ""} />
                    <AvatarFallback>
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/api/auth/connect/github" className="flex items-center gap-2">
                    <IconLink className="size-4" />
                    Connect GitHub
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/api/auth/connect/google-oauth2" className="flex items-center gap-2">
                    <IconLink className="size-4" />
                    Connect Google
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/api/auth/connect/slack" className="flex items-center gap-2">
                    <IconLink className="size-4" />
                    Connect Slack
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href={logoutUrl} className="flex items-center gap-2 text-destructive">
                    <IconLogout className="size-4" />
                    Sign out
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm">
              <a href={loginUrl}>Sign in</a>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
