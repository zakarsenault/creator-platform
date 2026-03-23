"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Plus, FileText, Eye, Edit, MoreHorizontal, Search } from "lucide-react"
import { useState } from "react"

const mockPosts = [
  { id: "b1", title: "How I built a $100K creator business in 12 months", status: "published", views: 4821, date: "2024-03-15", tags: ["business", "creator"] },
  { id: "b2", title: "The 5 content pillars every creator needs", status: "published", views: 2340, date: "2024-03-08", tags: ["content"] },
  { id: "b3", title: "Why most online courses fail (and how to fix yours)", status: "published", views: 3102, date: "2024-02-28", tags: ["courses", "education"] },
  { id: "b4", title: "Email list growth masterclass recap", status: "draft", views: 0, date: "2024-03-22", tags: ["email"] },
  { id: "b5", title: "Q1 business review: wins, lessons, numbers", status: "draft", views: 0, date: "2024-03-22", tags: ["business"] },
]

export default function BlogPage() {
  const [search, setSearch] = useState("")
  const filtered = mockPosts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-5 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Blog</h2>
          <p className="text-sm text-gray-500 mt-0.5">{mockPosts.length} posts</p>
        </div>
        <Button><Plus className="h-4 w-4" /> New post</Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">Published</p>
          <p className="text-xl font-bold text-gray-900">{mockPosts.filter((p) => p.status === "published").length}</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">Drafts</p>
          <p className="text-xl font-bold text-gray-900">{mockPosts.filter((p) => p.status === "draft").length}</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">Total views</p>
          <p className="text-xl font-bold text-gray-900">{mockPosts.reduce((s, p) => s + p.views, 0).toLocaleString()}</p>
        </div>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/30">
              <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-400">Title</th>
              <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-400">Tags</th>
              <th className="px-5 py-2.5 text-center text-xs font-medium text-gray-400">Status</th>
              <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-400">Views</th>
              <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-400">Date</th>
              <th className="px-5 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((post) => (
              <tr key={post.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <span className="text-sm font-medium text-gray-800">{post.title}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3 text-center">
                  <Badge variant={post.status === "published" ? "success" : "outline"}>{post.status}</Badge>
                </td>
                <td className="px-5 py-3 text-right text-sm text-gray-600">{post.views.toLocaleString()}</td>
                <td className="px-5 py-3 text-right text-xs text-gray-400">{formatDate(post.date)}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button className="flex h-7 w-7 items-center justify-center rounded text-gray-400 hover:bg-gray-100"><Edit className="h-3.5 w-3.5" /></button>
                    <button className="flex h-7 w-7 items-center justify-center rounded text-gray-400 hover:bg-gray-100"><MoreHorizontal className="h-3.5 w-3.5" /></button>
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
