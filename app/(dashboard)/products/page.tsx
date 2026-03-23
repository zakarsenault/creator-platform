"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { EmptyState } from "@/components/ui/empty-state"
import { mockProducts } from "@/lib/mock-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { Product, ProductType, ProductStatus } from "@/lib/types"
import {
  Plus,
  Search,
  BookOpen,
  Package2,
  Users,
  Download,
  MessagesSquare,
  Layers,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Filter,
} from "lucide-react"
import Link from "next/link"

const typeIcons: Record<ProductType, React.ReactNode> = {
  course: <BookOpen className="h-4 w-4" />,
  coaching: <Users className="h-4 w-4" />,
  membership: <Users className="h-4 w-4" />,
  download: <Download className="h-4 w-4" />,
  community: <MessagesSquare className="h-4 w-4" />,
  bundle: <Layers className="h-4 w-4" />,
}

const typeColors: Record<ProductType, string> = {
  course: "bg-blue-50 text-blue-600",
  coaching: "bg-violet-50 text-violet-600",
  membership: "bg-emerald-50 text-emerald-600",
  download: "bg-amber-50 text-amber-600",
  community: "bg-pink-50 text-pink-600",
  bundle: "bg-gray-50 text-gray-600",
}

const statusVariant: Record<ProductStatus, "success" | "outline" | "warning"> = {
  published: "success",
  draft: "outline",
  archived: "warning",
}

export default function ProductsPage() {
  const [search, setSearch] = useState("")
  const [activeType, setActiveType] = useState<ProductType | "all">("all")
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const filtered = mockProducts.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.subtitle?.toLowerCase().includes(search.toLowerCase()) ?? false)
    const matchType = activeType === "all" || p.type === activeType
    return matchSearch && matchType
  })

  const typeFilters: Array<{ value: ProductType | "all"; label: string }> = [
    { value: "all", label: "All" },
    { value: "course", label: "Courses" },
    { value: "coaching", label: "Coaching" },
    { value: "membership", label: "Memberships" },
    { value: "download", label: "Downloads" },
    { value: "community", label: "Communities" },
  ]

  return (
    <div className="space-y-5 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Products</h2>
          <p className="text-sm text-gray-500 mt-0.5">{mockProducts.length} products in your catalog</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          New Product
        </Button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Revenue", value: formatCurrency(mockProducts.reduce((s, p) => s + (p.revenue ?? 0), 0)) },
          { label: "Published", value: mockProducts.filter((p) => p.status === "published").length.toString() },
          { label: "Total Members", value: mockProducts.reduce((s, p) => s + (p.members_count ?? 0), 0).toLocaleString() },
          { label: "Drafts", value: mockProducts.filter((p) => p.status === "draft").length.toString() },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="mt-0.5 text-lg font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
          {typeFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveType(f.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                activeType === f.value
                  ? "bg-violet-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Package2 className="h-6 w-6" />}
          title="No products found"
          description="Try adjusting your search or create a new product."
          action={{ label: "Create product", onClick: () => {} }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ProductCard({
  product,
  openMenu,
  setOpenMenu,
}: {
  product: Product
  openMenu: string | null
  setOpenMenu: (id: string | null) => void
}) {
  return (
    <div className="group rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      {/* Cover */}
      <div className="relative h-36 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
        {product.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.cover_image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", typeColors[product.type])}>
              {typeIcons[product.type]}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge variant={statusVariant[product.status]}>{product.status}</Badge>
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === product.id ? null : product.id)}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 shadow-sm text-gray-600 hover:bg-white transition-colors"
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </button>
            {openMenu === product.id && (
              <div className="absolute right-0 top-9 z-10 w-40 rounded-xl border border-gray-100 bg-white shadow-lg py-1">
                <Link href={`/dashboard/products/${product.id}`} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Eye className="h-3.5 w-3.5" /> View
                </Link>
                <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Edit className="h-3.5 w-3.5" /> Edit
                </button>
                <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className={cn("mb-1.5 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium", typeColors[product.type])}>
              {typeIcons[product.type]}
              <span className="capitalize">{product.type}</span>
            </div>
            <h3 className="font-semibold text-gray-900 leading-tight line-clamp-1">{product.title}</h3>
            {product.subtitle && (
              <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">{product.subtitle}</p>
            )}
          </div>
          <div className="text-right shrink-0">
            <p className="text-base font-bold text-gray-900">
              {product.price ? formatCurrency(product.price) : "Free"}
            </p>
            <p className="text-xs text-gray-400 capitalize">{product.pricing_type.replace("_", " ")}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-3">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {(product.members_count ?? 0).toLocaleString()} members
            </span>
            <span>{formatCurrency(product.revenue ?? 0)}</span>
          </div>
          <Link
            href={`/dashboard/products/${product.id}`}
            className="text-xs font-medium text-violet-600 hover:underline"
          >
            Manage →
          </Link>
        </div>
      </div>
    </div>
  )
}
