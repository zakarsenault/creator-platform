"use client"

import { Bell, Search, Plus } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/analytics": "Analytics",
  "/dashboard/products": "Products",
  "/dashboard/courses": "Courses",
  "/dashboard/sales": "Sales",
  "/dashboard/community": "Community",
  "/dashboard/email": "Email Marketing",
  "/dashboard/funnels": "Funnels",
  "/dashboard/automations": "Automations",
  "/dashboard/contacts": "Contacts",
  "/dashboard/website": "Website",
  "/dashboard/blog": "Blog",
  "/dashboard/settings": "Settings",
}

export function Topbar() {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? "Dashboard"

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-100 bg-white px-6">
      <h1 className="text-sm font-semibold text-gray-900">{title}</h1>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="h-8 w-56 rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-3 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
          />
        </div>

        {/* Notifications */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-violet-500" />
        </button>

        {/* Quick create */}
        <Button size="sm" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          New
        </Button>
      </div>
    </header>
  )
}
