"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandSlack,
  IconShieldCheck,
  IconLink,
  IconExternalLink,
} from "@tabler/icons-react";

/**
 * TokenVaultInterruptHandler
 *
 * Displays a consent prompt when an AI agent needs additional
 * permissions to access a third-party service on the user's behalf.
 * This is the step-up authorization flow required by Auth0 Token Vault.
 */

interface TokenVaultConsentProps {
  connection: string;
  scopes: string[];
  onApprove: () => void;
  onDeny: () => void;
}

const connectionInfo: Record<
  string,
  { name: string; icon: React.ReactNode; color: string }
> = {
  github: {
    name: "GitHub",
    icon: <IconBrandGithub className="size-5" />,
    color: "bg-gray-900 text-white",
  },
  "google-oauth2": {
    name: "Google",
    icon: <IconBrandGoogle className="size-5" />,
    color: "bg-blue-600 text-white",
  },
  slack: {
    name: "Slack",
    icon: <IconBrandSlack className="size-5" />,
    color: "bg-purple-700 text-white",
  },
};

export function TokenVaultConsent({
  connection,
  scopes,
  onApprove,
  onDeny,
}: TokenVaultConsentProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const info = connectionInfo[connection] || {
    name: connection,
    icon: <IconLink className="size-5" />,
    color: "bg-primary text-primary-foreground",
  };

  const handleApprove = async () => {
    setIsConnecting(true);
    // Redirect to Auth0 connect account endpoint
    window.location.href = `/api/auth/connect/${connection}?returnTo=${encodeURIComponent(window.location.pathname)}`;
  };

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm max-w-md">
      <div className="flex items-start gap-3">
        <div
          className={`rounded-full p-2 ${info.color}`}
        >
          {info.icon}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <IconShieldCheck className="size-4 text-green-600" />
            <h4 className="font-semibold text-sm">Authorization Required</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            The AI agent needs access to your <strong>{info.name}</strong>{" "}
            account to complete this task. Auth0 Token Vault securely manages
            this connection.
          </p>

          {scopes.length > 0 && (
            <div className="mt-2 space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Requested permissions:
              </p>
              <ul className="text-xs text-muted-foreground space-y-0.5">
                {scopes
                  .filter((s) => s !== "openid")
                  .map((scope) => (
                    <li key={scope} className="flex items-center gap-1">
                      <span className="size-1 rounded-full bg-muted-foreground/50" />
                      {scope}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <Button
              size="sm"
              onClick={handleApprove}
              disabled={isConnecting}
              className="gap-1.5"
            >
              <IconExternalLink className="size-3.5" />
              {isConnecting ? "Connecting..." : `Connect ${info.name}`}
            </Button>
            <Button size="sm" variant="ghost" onClick={onDeny}>
              Deny
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ConnectedAccountsBadge
 *
 * Shows which third-party accounts are linked via Auth0 Token Vault.
 * Displayed in the user profile area of the sidebar.
 */

interface ConnectedAccount {
  connection: string;
  connected: boolean;
}

export function ConnectedAccountsBadge({
  accounts,
}: {
  accounts: ConnectedAccount[];
}) {
  return (
    <div className="flex items-center gap-1.5">
      {accounts.map((account) => {
        const info = connectionInfo[account.connection];
        if (!info) return null;
        return (
          <div
            key={account.connection}
            className={`rounded-full p-1 ${
              account.connected
                ? info.color
                : "bg-muted text-muted-foreground opacity-40"
            }`}
            title={`${info.name}: ${account.connected ? "Connected" : "Not connected"}`}
          >
            {info.icon}
          </div>
        );
      })}
    </div>
  );
}
