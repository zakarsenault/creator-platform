"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockEmailCampaigns } from "@/lib/mock-data"
import { formatDate, formatRelativeTime } from "@/lib/utils"
import { cn } from "@/lib/utils"
import {
  Plus,
  Mail,
  Send,
  Clock,
  FileText,
  BarChart2,
  MousePointer,
  Eye,
  Zap,
  Users,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react"

const tabs = ["Broadcasts", "Sequences", "Templates"]

export default function EmailPage() {
  const [activeTab, setActiveTab] = useState("Broadcasts")

  const sent = mockEmailCampaigns.filter((e) => e.status === "sent")
  const avgOpenRate = sent.reduce((s, e) => s + (e.open_rate ?? 0), 0) / (sent.length || 1)
  const avgClickRate = sent.reduce((s, e) => s + (e.click_rate ?? 0), 0) / (sent.length || 1)

  return (
    <div className="space-y-5 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Email Marketing</h2>
          <p className="text-sm text-gray-500 mt-0.5">Broadcasts, sequences, and automations</p>
        </div>
        <Button><Plus className="h-4 w-4" /> New Email</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Subscribers", value: "2,847", icon: Users, color: "bg-violet-50 text-violet-600" },
          { label: "Sent this month", value: sent.length.toString(), icon: Send, color: "bg-blue-50 text-blue-600" },
          { label: "Avg open rate", value: `${avgOpenRate.toFixed(1)}%`, icon: Eye, color: "bg-emerald-50 text-emerald-600" },
          { label: "Avg click rate", value: `${avgClickRate.toFixed(1)}%`, icon: MousePointer, color: "bg-amber-50 text-amber-600" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl shrink-0", s.color)}>
              <s.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-lg font-bold text-gray-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-3 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              activeTab === tab
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Broadcasts" && (
        <div className="space-y-3">
          {mockEmailCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              {/* Status icon */}
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl shrink-0", {
                "bg-emerald-50 text-emerald-600": campaign.status === "sent",
                "bg-amber-50 text-amber-600": campaign.status === "scheduled",
                "bg-gray-50 text-gray-400": campaign.status === "draft",
              })}>
                {campaign.status === "sent" && <Send className="h-4 w-4" />}
                {campaign.status === "scheduled" && <Clock className="h-4 w-4" />}
                {campaign.status === "draft" && <FileText className="h-4 w-4" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-gray-900 truncate">{campaign.subject}</p>
                  <EmailStatusBadge status={campaign.status} />
                </div>
                {campaign.preview_text && (
                  <p className="text-xs text-gray-400 truncate">{campaign.preview_text}</p>
                )}
              </div>

              {/* Metrics */}
              {campaign.status === "sent" && (
                <div className="flex items-center gap-5 text-center">
                  <div>
                    <p className="text-xs text-gray-400">Sent to</p>
                    <p className="text-sm font-semibold text-gray-800">{campaign.recipients_count?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Open rate</p>
                    <p className="text-sm font-semibold text-emerald-600">{campaign.open_rate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Click rate</p>
                    <p className="text-sm font-semibold text-blue-600">{campaign.click_rate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Sent</p>
                    <p className="text-sm text-gray-500">{formatRelativeTime(campaign.sent_at!)}</p>
                  </div>
                </div>
              )}

              {campaign.status === "scheduled" && (
                <div>
                  <p className="text-xs text-gray-400">Scheduled for</p>
                  <p className="text-sm font-medium text-amber-600">{formatDate(campaign.sent_at!)}</p>
                </div>
              )}

              {campaign.status === "draft" && (
                <p className="text-xs text-gray-400">Draft</p>
              )}

              <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          ))}

          <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-4 text-sm text-gray-400 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/20 transition-colors">
            <Plus className="h-4 w-4" /> Create new broadcast
          </button>
        </div>
      )}

      {activeTab === "Sequences" && (
        <div className="space-y-3">
          {[
            { name: "Welcome sequence", trigger: "New subscriber", emails: 5, active: true, sent: 1840 },
            { name: "Purchase follow-up", trigger: "After purchase", emails: 3, active: true, sent: 342 },
            { name: "Abandoned checkout", trigger: "Checkout abandoned", emails: 2, active: false, sent: 0 },
          ].map((seq) => (
            <div
              key={seq.name}
              className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 shrink-0">
                <Zap className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{seq.name}</p>
                <p className="text-xs text-gray-400">Trigger: {seq.trigger} · {seq.emails} emails</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{seq.sent.toLocaleString()} sent</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-xs font-medium", seq.active ? "text-emerald-600" : "text-gray-400")}>
                  {seq.active ? "Active" : "Inactive"}
                </span>
                <div className={cn("h-5 w-9 cursor-pointer rounded-full transition-colors relative", seq.active ? "bg-emerald-500" : "bg-gray-200")}>
                  <div className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform", seq.active ? "left-4" : "left-0.5")} />
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-300" />
            </div>
          ))}
        </div>
      )}

      {activeTab === "Templates" && (
        <div className="grid grid-cols-3 gap-4">
          {["Welcome email", "Product launch", "Newsletter", "Promotional", "Re-engagement", "Thank you"].map((t) => (
            <div key={t} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer">
              <div className="mb-3 h-28 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <Mail className="h-7 w-7 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-800">{t}</p>
              <p className="text-xs text-gray-400 mt-0.5">Email template</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function EmailStatusBadge({ status }: { status: string }) {
  if (status === "sent") return <Badge variant="success">Sent</Badge>
  if (status === "scheduled") return <Badge variant="warning">Scheduled</Badge>
  return <Badge variant="outline">Draft</Badge>
}
