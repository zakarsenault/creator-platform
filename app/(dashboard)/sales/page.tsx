"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { mockOrders } from "@/lib/mock-data"
import { formatCurrency, formatRelativeTime } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { OrderStatus } from "@/lib/types"
import { Download, DollarSign, ShoppingCart, RefreshCw, TrendingUp, Search, Filter } from "lucide-react"

const statusVariant: Record<OrderStatus, "success" | "warning" | "danger" | "outline"> = {
  completed: "success",
  pending: "warning",
  refunded: "danger",
  failed: "outline",
}

export default function SalesPage() {
  const [search, setSearch] = useState("")

  const filtered = mockOrders.filter(
    (o) =>
      o.contact.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      o.offer_name.toLowerCase().includes(search.toLowerCase())
  )

  const totalRevenue = mockOrders.filter((o) => o.status === "completed").reduce((s, o) => s + o.amount, 0)

  return (
    <div className="space-y-5 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Sales</h2>
          <p className="text-sm text-gray-500 mt-0.5">All orders and transactions</p>
        </div>
        <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5" /> Export CSV</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total revenue", value: formatCurrency(totalRevenue), icon: DollarSign, color: "bg-violet-50 text-violet-600" },
          { label: "Orders", value: mockOrders.length.toString(), icon: ShoppingCart, color: "bg-blue-50 text-blue-600" },
          { label: "Refunds", value: mockOrders.filter((o) => o.status === "refunded").length.toString(), icon: RefreshCw, color: "bg-red-50 text-red-500" },
          { label: "Avg order value", value: formatCurrency(totalRevenue / mockOrders.length), icon: TrendingUp, color: "bg-emerald-50 text-emerald-600" },
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

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5" /> Filter</Button>
      </div>

      {/* Orders table */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">Customer</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">Product</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500">Amount</th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500">Status</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={order.contact.full_name} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{order.contact.full_name}</p>
                      <p className="text-xs text-gray-400">{order.contact.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-gray-700">{order.offer_name}</td>
                <td className="px-5 py-3 text-right text-sm font-semibold text-gray-900">{formatCurrency(order.amount)}</td>
                <td className="px-5 py-3 text-center">
                  <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
                </td>
                <td className="px-5 py-3 text-right text-xs text-gray-400">{formatRelativeTime(order.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
