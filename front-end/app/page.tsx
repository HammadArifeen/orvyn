import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeroHeader } from "@/components/header"
import { ChevronRight, Shield, Brain, Zap } from 'lucide-react'

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <section className="bg-linear-to-b to-muted from-background">
          <div className="relative py-36">
            <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
              <div className="md:w-1/2">
                <h1 className="max-w-md text-balance text-5xl font-medium md:text-6xl">AI-powered task management for dev teams.</h1>
                <p className="text-muted-foreground my-8 max-w-2xl text-balance text-xl">Manage tasks, automate workflows, and integrate with GitHub, Slack, and Google — powered by AI agents with secure OAuth via Auth0 Token Vault.</p>
                <div className="flex items-center gap-3">
                  <Button asChild size="lg" className="pr-4.5">
                    <Link href="/api/auth/login"><span className="text-nowrap">Get Started</span><ChevronRight className="opacity-50" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="#features"><span className="text-nowrap">Learn More</span></Link>
                  </Button>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"><Shield className="h-3.5 w-3.5" /> Auth0 Token Vault</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"><Brain className="h-3.5 w-3.5" /> LangChain AI</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"><Zap className="h-3.5 w-3.5" /> Next.js 15</span>
                </div>
              </div>
            </div>
            <div className="perspective-near mt-24 translate-x-12 md:absolute md:-right-6 md:bottom-16 md:left-1/2 md:top-40 md:mt-0 md:translate-x-0">
              <div className="before:border-foreground/5 before:bg-foreground/5 relative h-full before:absolute before:-inset-x-4 before:bottom-7 before:top-0 before:skew-x-6 before:rounded-[calc(var(--radius)+1rem)] before:border">
                <div className="bg-background rounded-(--radius) shadow-foreground/10 ring-foreground/5 relative h-full -translate-y-12 skew-x-6 overflow-hidden border border-transparent shadow-md ring-1">
                  <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="h-3 w-3 rounded-full bg-red-500" /><div className="h-3 w-3 rounded-full bg-yellow-500" /><div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="ml-3 text-xs text-slate-400">Orvyn Dashboard</span>
                    </div>
                    <div className="space-y-2">
                      {['Set up CI/CD pipeline', 'Review PR #142', 'Deploy to staging', 'Update API docs'].map((t, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-lg bg-slate-700/30 p-3">
                          <div className={`h-4 w-4 rounded-full ${i < 2 ? 'bg-green-400' : 'bg-slate-600'}`} />
                          <span className={`text-sm ${i < 2 ? 'text-slate-200 line-through' : 'text-slate-400'}`}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-center text-3xl font-medium md:text-4xl">How Orvyn Works</h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-lg">Secure AI agents that act on your behalf with proper OAuth authorization through Auth0 Token Vault.</p>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border bg-card p-6 shadow-sm"><Shield className="h-8 w-8 text-primary mb-4" /><h3 className="text-lg font-semibold">Auth0 Token Vault</h3><p className="text-muted-foreground mt-2 text-sm">AI agents securely access third-party APIs using RFC 8693 token exchange. No credentials shared with the AI.</p></div>
              <div className="rounded-2xl border bg-card p-6 shadow-sm"><Brain className="h-8 w-8 text-primary mb-4" /><h3 className="text-lg font-semibold">AI Task Management</h3><p className="text-muted-foreground mt-2 text-sm">Natural language task creation powered by LangChain and OpenAI with intelligent prioritization.</p></div>
              <div className="rounded-2xl border bg-card p-6 shadow-sm"><Zap className="h-8 w-8 text-primary mb-4" /><h3 className="text-lg font-semibold">Connected Integrations</h3><p className="text-muted-foreground mt-2 text-sm">Connect GitHub, Google Calendar, and Slack through secure OAuth flows managed by Auth0.</p></div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
