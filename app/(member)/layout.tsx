import Link from "next/link"
import { Sparkles, BookOpen, Home, Users, Settings, CreditCard } from "lucide-react"

const nav = [
  { href: "/library", icon: Home, label: "Library" },
  { href: "/library/courses", icon: BookOpen, label: "Courses" },
  { href: "/community", icon: Users, label: "Community" },
  { href: "/account", icon: Settings, label: "Account" },
  { href: "/account/billing", icon: CreditCard, label: "Billing" },
]

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/library" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">CreatorOS</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
            SC
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {children}
      </main>
    </div>
  )
}
