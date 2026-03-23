"use client"

import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { mockOverview, mockRevenueData, mockOrders, mockProducts, mockTopOffers } from "@/lib/mock-data"
import { formatCurrency, formatRelativeTime } from "@/lib/utils"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import {
  DollarSign,
  ShoppingCart,
  Users,
  Activity,
  ArrowRight,
  BookOpen,
  Package2,
  Plus,
} from "lucide-react"
import Link from "next/link"

const statusVariant: Record<string, "success" | "outline"> = {
  published: "success",
  draft: "outline",
}

const orderStatusVariant: Record<string, "success" | "warning" | "danger"> = {
  completed: "success",
  pending: "warning",
  refunded: "danger",
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Good morning, Alex 👋</h2>
          <p className="text-sm text-gray-500 mt-0.5">Here&apos;s what&apos;s happening in your business today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/products" className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            View products
          </Link>
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" />
            Create product
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(mockOverview.revenue)}
          change={mockOverview.revenue_change}
          icon={<DollarSign className="h-5 w-5" />}
          iconBg="bg-violet-50 text-violet-600"
        />
        <StatCard
          title="Total Orders"
          value={mockOverview.orders.toLocaleString()}
          change={mockOverview.orders_change}
          icon={<ShoppingCart className="h-5 w-5" />}
          iconBg="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Contacts"
          value={mockOverview.contacts.toLocaleString()}
          change={mockOverview.contacts_change}
          icon={<Users className="h-5 w-5" />}
          iconBg="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Active Members"
          value={mockOverview.active_members.toLocaleString()}
          change={mockOverview.active_members_change}
          icon={<Activity className="h-5 w-5" />}
          iconBg="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Revenue chart */}
        <Card className="col-span-2">
          <CardHeader className="p-5 pb-0">
            <CardTitle>Revenue Over Time</CardTitle>
            <p className="text-xs text-gray-500">2024 full year</p>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mockRevenueData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f3" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #e8e8ed", fontSize: 12 }}
                  formatter={(val) => [formatCurrency(Number(val)), "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top offers */}
        <Card>
          <CardHeader className="p-5 pb-3">
            <CardTitle>Top Offers</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 p-5 space-y-3">
            {mockTopOffers.map((offer, i) => (
              <div key={offer.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-300 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{offer.name}</p>
                  <p className="text-xs text-gray-400">{offer.orders} orders</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(offer.revenue)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Recent orders */}
        <Card>
          <CardHeader className="p-5 pb-3">
            <CardTitle>Recent Orders</CardTitle>
            <Link href="/dashboard/sales" className="text-xs text-violet-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <tbody>
                {mockOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={order.contact.full_name} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{order.contact.full_name}</p>
                          <p className="text-xs text-gray-400">{order.offer_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <p className="text-sm font-semibold text-gray-900">{formatCurrency(order.amount)}</p>
                      <p className="text-xs text-gray-400">{formatRelativeTime(order.created_at)}</p>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Badge variant={orderStatusVariant[order.status]}>{order.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Products overview */}
        <Card>
          <CardHeader className="p-5 pb-3">
            <CardTitle>Products</CardTitle>
            <Link href="/dashboard/products" className="text-xs text-violet-600 hover:underline flex items-center gap-1">
              Manage <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {mockProducts.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 border-b border-gray-50 last:border-0 px-5 py-3 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 shrink-0">
                  {product.type === "course" ? (
                    <BookOpen className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Package2 className="h-4 w-4 text-gray-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{product.title}</p>
                  <p className="text-xs text-gray-400 capitalize">{product.type} · {product.members_count} members</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(product.revenue ?? 0)}</p>
                  <Badge variant={statusVariant[product.status]}>{product.status}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Orders bar chart */}
      <Card>
        <CardHeader className="p-5 pb-0">
          <CardTitle>Monthly Orders</CardTitle>
          <p className="text-xs text-gray-500">Orders volume by month</p>
        </CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={mockRevenueData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e8e8ed", fontSize: 12 }} />
              <Bar dataKey="orders" fill="#7c3aed" radius={[4, 4, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
