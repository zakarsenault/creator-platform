"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockRevenueData, mockTopOffers, mockEmailCampaigns } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

const ranges = ["7d", "30d", "90d", "12m", "All"]

const conversionData = [
  { step: "Page views", value: 8420, pct: 100 },
  { step: "Opt-ins", value: 3284, pct: 39 },
  { step: "Sales page", value: 1842, pct: 21.9 },
  { step: "Checkout starts", value: 621, pct: 7.4 },
  { step: "Purchases", value: 342, pct: 4.1 },
]

const membershipData = [
  { month: "Jan", new: 42, churned: 8, net: 34 },
  { month: "Feb", new: 58, churned: 11, net: 47 },
  { month: "Mar", new: 51, churned: 9, net: 42 },
  { month: "Apr", new: 74, churned: 14, net: 60 },
  { month: "May", new: 86, churned: 18, net: 68 },
  { month: "Jun", new: 68, churned: 21, net: 47 },
]

const sourceData = [
  { name: "Organic", value: 42, color: "#7c3aed" },
  { name: "Instagram", value: 28, color: "#3b82f6" },
  { name: "YouTube", value: 16, color: "#10b981" },
  { name: "Referral", value: 9, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#e5e7eb" },
]

export default function AnalyticsPage() {
  const [range, setRange] = useState("30d")

  const totalRevenue = mockRevenueData.reduce((s, d) => s + d.revenue, 0)
  const totalOrders = mockRevenueData.reduce((s, d) => s + d.orders, 0)

  return (
    <div className="space-y-5 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Analytics</h2>
          <p className="text-sm text-gray-500 mt-0.5">Performance overview across all channels</p>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                range === r ? "bg-violet-600 text-white" : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Revenue", value: formatCurrency(totalRevenue), change: 18.4, positive: true },
          { label: "Total Orders", value: totalOrders.toLocaleString(), change: 12.1, positive: true },
          { label: "Avg Order Value", value: formatCurrency(totalRevenue / totalOrders), change: 5.6, positive: true },
          { label: "Churn Rate", value: "3.2%", change: -0.8, positive: false },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500 font-medium">{kpi.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{kpi.value}</p>
            <div className={cn("mt-1.5 flex items-center gap-1 text-xs font-medium", kpi.positive ? "text-emerald-600" : "text-red-500")}>
              {kpi.positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              {kpi.change > 0 ? "+" : ""}{kpi.change}% from last period
            </div>
          </div>
        ))}
      </div>

      {/* Revenue + Orders charts */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2">
          <CardHeader className="p-5 pb-0">
            <CardTitle>Revenue</CardTitle>
            <p className="text-xs text-gray-400">Monthly revenue — 2024</p>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={mockRevenueData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f3" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e8e8ed", fontSize: 12 }} formatter={(v: number) => [formatCurrency(v), "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2} fill="url(#aGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-5 pb-3">
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-center mb-4">
              <PieChart width={160} height={160}>
                <Pie data={sourceData} cx={75} cy={75} innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={2}>
                  {sourceData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div className="space-y-2">
              {sourceData.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                    <span className="text-sm text-gray-600">{s.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{s.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top offers + email perf */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="p-5 pb-3">
            <CardTitle>Top Performing Offers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-400">Offer</th>
                  <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-400">Revenue</th>
                  <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-400">Conv.</th>
                </tr>
              </thead>
              <tbody>
                {mockTopOffers.map((offer, i) => (
                  <tr key={offer.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold text-gray-300">{i + 1}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{offer.name}</p>
                          <p className="text-xs text-gray-400">{offer.orders} orders</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right text-sm font-semibold text-gray-900">{formatCurrency(offer.revenue)}</td>
                    <td className="px-5 py-3 text-right text-sm text-emerald-600 font-medium">{offer.conversion_rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-5 pb-3">
            <CardTitle>Email Performance</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 p-5 space-y-3">
            {mockEmailCampaigns.filter((e) => e.status === "sent").map((c) => (
              <div key={c.id} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-700 truncate max-w-[200px]">{c.subject}</p>
                  <span className="text-xs text-gray-400">{c.open_rate}% open</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="h-1.5 flex-1 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full bg-violet-400" style={{ width: `${c.open_rate}%` }} />
                  </div>
                </div>
                <div className="flex gap-3 text-[10px] text-gray-400">
                  <span>{c.recipients_count?.toLocaleString()} sent</span>
                  <span className="text-blue-500">{c.click_rate}% clicks</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Funnel conversion */}
      <Card>
        <CardHeader className="p-5 pb-3">
          <CardTitle>Funnel Conversion</CardTitle>
          <p className="text-xs text-gray-400">Creator Blueprint launch funnel</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {conversionData.map((step, i) => (
              <div key={step.step} className="flex items-center gap-3">
                <div className="w-28 text-xs text-gray-500 text-right shrink-0">{step.step}</div>
                <div className="flex-1 h-8 relative">
                  <div
                    className="h-full rounded-lg bg-violet-500 transition-all"
                    style={{ width: `${step.pct}%`, opacity: 1 - i * 0.15 }}
                  />
                </div>
                <div className="w-24 text-right">
                  <span className="text-sm font-semibold text-gray-800">{step.value.toLocaleString()}</span>
                  <span className="text-xs text-gray-400 ml-1">{step.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Membership growth */}
      <Card>
        <CardHeader className="p-5 pb-0">
          <CardTitle>Membership Growth</CardTitle>
          <p className="text-xs text-gray-400">New vs churned members per month</p>
        </CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={membershipData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e8e8ed", fontSize: 12 }} />
              <Bar dataKey="new" name="New" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              <Bar dataKey="churned" name="Churned" fill="#fca5a5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
