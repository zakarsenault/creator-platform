"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package2,
  BookOpen,
  Users,
  Mail,
  BarChart3,
  Globe,
  FileText,
  Workflow,
  ShoppingCart,
  Settings,
  MessagesSquare,
  Zap,
  ChevronDown,
  Sparkles,
} from "lucide-react"
import { useState } from "react"

const nav = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
    ],
  },
  {
    label: "Monetize",
    items: [
      { href: "/dashboard/products", icon: Package2, label: "Products" },
      { href: "/dashboard/courses", icon: BookOpen, label: "Courses" },
      { href: "/dashboard/sales", icon: ShoppingCart, label: "Sales" },
    ],
  },
  {
    label: "Engage",
    items: [
      { href: "/dashboard/community", icon: MessagesSquare, label: "Community" },
      { href: "/dashboard/email", icon: Mail, label: "Email" },
      { href: "/dashboard/funnels", icon: Workflow, label: "Funnels" },
      { href: "/dashboard/automations", icon: Zap, label: "Automations" },
    ],
  },
  {
    label: "Grow",
    items: [
      { href: "/dashboard/contacts", icon: Users, label: "Contacts" },
      { href: "/dashboard/website", icon: Globe, label: "Website" },
      { href: "/dashboard/blog", icon: FileText, label: "Blog" },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/dashboard/settings", icon: Settings, label: "Settings" },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggle = (label: string) => {
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <aside className="flex h-screen w-60 flex-col bg-[#0f0f11] text-white">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-semibold tracking-tight">CreatorOS</span>
      </div>

      {/* Workspace switcher */}
      <div className="mx-3 mb-4 flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-white/5 transition-colors">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-bold text-white">
          A
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-xs font-medium text-white">Alex Rivera</p>
          <p className="truncate text-[10px] text-zinc-500">Business workspace</p>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4 scrollbar-thin">
        {nav.map((section) => (
          <div key={section.label} className="mb-4">
            <button
              onClick={() => toggle(section.label)}
              className="mb-1 flex w-full items-center justify-between px-2 py-1"
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                {section.label}
              </span>
              <ChevronDown
                className={cn(
                  "h-3 w-3 text-zinc-600 transition-transform",
                  collapsed[section.label] && "-rotate-90"
                )}
              />
            </button>

            {!collapsed[section.label] && (
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(item.href)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                          active
                            ? "bg-white/10 text-white font-medium"
                            : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                        )}
                      >
                        <item.icon className={cn("h-4 w-4 shrink-0", active && "text-violet-400")} />
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/5 p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-white/5 cursor-pointer transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-pink-400 text-xs font-bold text-white shrink-0">
            AR
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-medium text-zinc-300">Alex Rivera</p>
            <p className="truncate text-[10px] text-zinc-600">alex@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
