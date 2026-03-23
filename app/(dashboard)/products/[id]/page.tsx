"use client"

import { use } from "react"
import { mockProducts, mockOrders } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { formatCurrency, formatDate, formatRelativeTime } from "@/lib/utils"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  Edit,
  Eye,
  Share2,
  Users,
  DollarSign,
  TrendingUp,
  BookOpen,
  Settings,
  BarChart2,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const tabs = ["Overview", "Content", "Pricing", "Members", "Analytics", "Settings"]

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = mockProducts.find((p) => p.id === id) ?? mockProducts[0]
  const [activeTab, setActiveTab] = useState("Overview")

  const productOrders = mockOrders.filter((o) => o.offer_name === product.title)

  return (
    <div className="animate-in space-y-5">
      {/* Back + header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Link href="/dashboard/products" className="mt-1 flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">{product.title}</h2>
              <Badge variant={product.status === "published" ? "success" : "outline"}>{product.status}</Badge>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{product.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Eye className="h-3.5 w-3.5" /> Preview</Button>
          <Button variant="outline" size="sm"><Share2 className="h-3.5 w-3.5" /> Share</Button>
          <Button size="sm"><Edit className="h-3.5 w-3.5" /> Edit</Button>
        </div>
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

      {activeTab === "Overview" && (
        <div className="grid grid-cols-3 gap-4">
          {/* Left column */}
          <div className="col-span-2 space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1.5">
                  <DollarSign className="h-3.5 w-3.5" /> Revenue
                </div>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(product.revenue ?? 0)}</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1.5">
                  <Users className="h-3.5 w-3.5" /> Members
                </div>
                <p className="text-xl font-bold text-gray-900">{(product.members_count ?? 0).toLocaleString()}</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1.5">
                  <TrendingUp className="h-3.5 w-3.5" /> Avg. Value
                </div>
                <p className="text-xl font-bold text-gray-900">
                  {product.members_count ? formatCurrency((product.revenue ?? 0) / product.members_count) : "—"}
                </p>
              </div>
            </div>

            {/* Product details */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {product.cover_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.cover_image}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Type</p>
                    <p className="font-medium capitalize text-gray-900">{product.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Pricing</p>
                    <p className="font-medium text-gray-900">
                      {product.price ? formatCurrency(product.price) : "Free"} / {product.pricing_type.replace("_", " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Slug</p>
                    <p className="font-medium text-gray-900 font-mono text-xs">/{product.slug}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Created</p>
                    <p className="font-medium text-gray-900">{formatDate(product.created_at)}</p>
                  </div>
                  {product.tags && product.tags.length > 0 && (
                    <div className="col-span-2">
                      <p className="text-gray-500 text-xs mb-1.5">Tags</p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {product.description && (
                    <div className="col-span-2">
                      <p className="text-gray-500 text-xs mb-1">Description</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent orders */}
            {productOrders.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-50">
                        <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-400">Customer</th>
                        <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-400">Amount</th>
                        <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-400">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <Avatar name={order.contact.full_name} size="sm" />
                              <div>
                                <p className="text-sm font-medium text-gray-800">{order.contact.full_name}</p>
                                <p className="text-xs text-gray-400">{order.contact.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-right text-sm font-semibold text-gray-900">
                            {formatCurrency(order.amount)}
                          </td>
                          <td className="px-5 py-3 text-right text-xs text-gray-400">
                            {formatRelativeTime(order.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Quick actions */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <Button className="w-full" size="sm">
                  <BookOpen className="h-3.5 w-3.5" /> Open Course Builder
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <BarChart2 className="h-3.5 w-3.5" /> View Analytics
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Settings className="h-3.5 w-3.5" /> Product Settings
                </Button>
              </CardContent>
            </Card>

            {/* Offer / pricing */}
            <Card>
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-xs">Active Offer</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-3">
                <div className="rounded-lg border border-gray-100 p-3 space-y-1.5">
                  <p className="text-sm font-semibold text-gray-900">
                    {product.price ? formatCurrency(product.price) : "Free"}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{product.pricing_type.replace("_", " ")}</p>
                  <div className="pt-1">
                    <button className="text-xs text-violet-600 hover:underline">+ Add pricing option</button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-xs">Visibility</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Status</span>
                  <Badge variant={product.status === "published" ? "success" : "outline"}>{product.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Access</span>
                  <span className="text-xs text-gray-500">Purchase only</span>
                </div>
                <div className="pt-1">
                  <Button
                    variant={product.status === "published" ? "outline" : "primary"}
                    size="sm"
                    className="w-full"
                  >
                    {product.status === "published" ? "Unpublish" : "Publish"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "Members" && (
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400">Member</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400">Joined</th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-gray-400">Spent</th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {productOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={order.contact.full_name} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{order.contact.full_name}</p>
                          <p className="text-xs text-gray-400">{order.contact.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500">{formatRelativeTime(order.created_at)}</td>
                    <td className="px-5 py-3 text-right text-sm font-semibold text-gray-900">{formatCurrency(order.amount)}</td>
                    <td className="px-5 py-3 text-right"><Badge variant="success">Active</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {(activeTab === "Content" || activeTab === "Pricing" || activeTab === "Analytics" || activeTab === "Settings") && (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <p className="text-sm">{activeTab} tab — coming soon</p>
        </div>
      )}
    </div>
  )
}
