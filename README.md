# Orvyn - AI-Powered Task Management with Secure Agent Authorization

An intelligent task management system with AI-powered task breakdown, team matching, and allocation — built with **Auth0 Token Vault** for secure agent authorization.

**By Hammad Khan**

## Built for "Authorized to Act: Auth0 for AI Agents" Hackathon

Orvyn demonstrates how AI agents can securely act on behalf of users across multiple third-party services. Instead of storing raw OAuth tokens in application code, Orvyn delegates all token management to **Auth0 Token Vault**, which handles:

- **Token Exchange (RFC 8693)** — Agents never see user credentials; Token Vault exchanges session tokens for scoped API tokens
- **Automatic Refresh** — Expired tokens are transparently refreshed without user intervention
- **Step-Up Authorization** — When an agent needs new permissions, users see an in-chat consent prompt
- **Connected Accounts** — Users link GitHub, Google, and Slack accounts through Auth0's secure OAuth flow
- **Revocation** — Users can disconnect any service at any time from the Settings page

## How Auth0 Token Vault is Integrated

```
User → Auth0 Login → Session Token
                          ↓
Agent needs GitHub access → Token Vault exchanges token (RFC 8693)
                          ↓
Token Vault returns scoped GitHub token → Agent creates issues
                          ↓
Token expires → Token Vault auto-refreshes
                          ↓
New scope needed → Step-up auth interrupt → User consents in chat
```

### Key Files

| File | Purpose |
|------|---------|
| `front-end/lib/auth0.ts` | Auth0Client with `enableConnectAccountEndpoint` for account linking |
| `front-end/lib/auth0-ai.ts` | Token Vault wrappers (`withGitHub`, `withGoogle`, `withSlack`) |
| `front-end/lib/auth.ts` | JWT verification with JWKS for LangGraph API security |
| `front-end/lib/tools.ts` | Agent tools wrapped with `withTokenVault()` and `getAccessTokenFromTokenVault()` |
| `front-end/lib/agent/graph.ts` | LangGraph agent graph using Token Vault-secured tools |
| `front-end/components/token-vault-consent.tsx` | Step-up authorization consent UI |
| `front-end/app/settings/page.tsx` | Connected accounts management dashboard |
| `front-end/middleware.ts` | Auth0 session middleware with route protection |

## Features

- **Smart Task Creation** — AI generates actionable subtasks from descriptions
- **Metric Analysis** — Understand task impact, urgency, and complexity
- **Intelligent Matching** — AI matches team members to subtasks based on skills
- **Digital Twins** — Personalized agents fine-tuned to each team member's communication patterns
- **Secure Agent Actions** — GitHub issues, Gmail search, Slack messages all via Token Vault
- **Visual Dashboard** — Track tasks, progress, and team performance
- **Connected Accounts** — Link and manage third-party services from Settings
- **Step-Up Consent** — In-chat authorization prompts when agents need new permissions

## Quick Start

```bash
# Install dependencies
cd front-end
npm install

# Copy environment template
cp .env.local.example .env.local
# Fill in your Auth0 credentials (see below)

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Auth0 Setup

1. Create a **Regular Web Application** in Auth0 Dashboard
2. Create an **API** with your desired audience identifier
3. Create a **Machine-to-Machine Application** for Token Vault (Custom API)
4. Enable **Social Connections**: GitHub, Google, Slack
5. Copy credentials to `.env.local`:

```bash
AUTH0_SECRET=<openssl rand -hex 32>
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your-web-app-client-id
AUTH0_CLIENT_SECRET=your-web-app-client-secret
AUTH0_AUDIENCE=https://your-api-identifier
AUTH0_CUSTOM_API_CLIENT_ID=your-m2m-client-id
AUTH0_CUSTOM_API_CLIENT_SECRET=your-m2m-client-secret
```

## Project Structure

```
orvyn/
├── front-end/                    # Next.js 16 + React 19 application
│   ├── app/
│   │   ├── api/auth/[auth0]/     # Auth0 route handler (login/callback/logout/connect)
│   │   ├── api/chat/             # AI chat endpoint
│   │   ├── api/tasks/            # Task CRUD API
│   │   ├── dashboard/            # Main dashboard page
│   │   └── settings/             # Connected accounts management
│   ├── components/
│   │   ├── auth-provider.tsx     # Auth0 context provider
│   │   ├── token-vault-consent.tsx # Step-up authorization UI
│   │   └── ...                   # UI components
│   ├── lib/
│   │   ├── auth0.ts              # Auth0Client configuration
│   │   ├── auth0-ai.ts           # Token Vault wrappers
│   │   ├── auth.ts               # JWT/JWKS verification
│   │   ├── tools.ts              # Token Vault-wrapped agent tools
│   │   └── agent/graph.ts        # LangGraph agent graph
│   ├── middleware.ts             # Auth0 session middleware
│   └── services/                 # Business logic
├── digital_twin_backend/         # Digital twin agent system
├── mcp-backend/                  # MCP server backend
└── finetuning/                   # Model fine-tuning pipeline
```

## Tech Stack

- **Framework:** Next.js 16 with React 19
- **Language:** TypeScript
- **Auth & Token Management:** Auth0 for AI Agents (Token Vault, RFC 8693)
- **Agent Framework:** LangGraph + LangChain
- **LLM:** OpenAI GPT-4o
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Charts:** Recharts
- **Animations:** Motion (framer-motion)

## Security Model

Orvyn follows a zero-trust approach to agent authorization:

1. **No raw tokens in code** — All OAuth tokens managed by Auth0 Token Vault
2. **Scoped access** — Each tool requests only the permissions it needs
3. **User consent** — Step-up authorization for new scopes with in-chat UI
4. **JWT verification** — All API requests verified with Auth0 JWKS
5. **Session middleware** — Protected routes require authentication
6. **Revocable** — Users can disconnect any service from Settings

## Author

**Hammad Khan**
