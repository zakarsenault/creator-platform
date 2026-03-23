import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change?: number
  icon?: React.ReactNode
  iconBg?: string
  className?: string
}

export function StatCard({ title, value, change, icon, iconBg, className }: StatCardProps) {
  const isPositive = (change ?? 0) >= 0

  return (
    <div className={cn("rounded-xl border border-gray-100 bg-white p-5 shadow-sm", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
          {change !== undefined && (
            <div className={cn("mt-2 flex items-center gap-1 text-xs font-medium", isPositive ? "text-emerald-600" : "text-red-500")}>
              {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              <span>{isPositive ? "+" : ""}{change}% from last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", iconBg || "bg-violet-50 text-violet-600")}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
