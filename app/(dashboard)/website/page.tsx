"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockPages } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { Plus, Globe, Eye, Edit, MoreHorizontal, ExternalLink } from "lucide-react"

export default function WebsitePage() {
  return (
    <div className="space-y-5 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Website</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage pages, domain, and site settings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <ExternalLink className="h-3.5 w-3.5" /> View site
          </Button>
          <Button size="sm"><Plus className="h-3.5 w-3.5" /> New page</Button>
        </div>
      </div>

      {/* Domain banner */}
      <div className="rounded-xl border border-violet-100 bg-violet-50 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="h-5 w-5 text-violet-600" />
          <div>
            <p className="text-sm font-semibold text-violet-900">alexrivera.com</p>
            <p className="text-xs text-violet-600">Custom domain connected · SSL active</p>
          </div>
        </div>
        <Button variant="outline" size="sm">Manage domain</Button>
      </div>

      {/* Pages table */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
          <p className="text-xs font-semibold text-gray-700">All pages ({mockPages.length})</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/30">
              <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-400">Page</th>
              <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-400">URL</th>
              <th className="px-5 py-2.5 text-center text-xs font-medium text-gray-400">Status</th>
              <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-400">Views</th>
              <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-400">Updated</th>
              <th className="px-5 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {mockPages.map((page) => (
              <tr key={page.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3 text-sm font-medium text-gray-800">{page.title}</td>
                <td className="px-5 py-3 text-sm text-gray-400 font-mono">{page.slug}</td>
                <td className="px-5 py-3 text-center">
                  <Badge variant={page.status === "published" ? "success" : "outline"}>{page.status}</Badge>
                </td>
                <td className="px-5 py-3 text-right text-sm text-gray-600">{(page.views ?? 0).toLocaleString()}</td>
                <td className="px-5 py-3 text-right text-xs text-gray-400">{formatDate(page.updated_at)}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button className="flex h-7 w-7 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button className="flex h-7 w-7 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                    <button className="flex h-7 w-7 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
