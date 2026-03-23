"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { mockCommunityPosts } from "@/lib/mock-data"
import { formatRelativeTime } from "@/lib/utils"
import { cn } from "@/lib/utils"
import {
  Plus,
  MessageSquare,
  Heart,
  Pin,
  Megaphone,
  Hash,
  Users,
  Search,
  MoreHorizontal,
} from "lucide-react"

const channels = [
  { id: "all", name: "All posts", count: 24 },
  { id: "announcements", name: "Announcements", count: 3 },
  { id: "wins", name: "Wins 🎉", count: 8 },
  { id: "questions", name: "Questions", count: 9 },
  { id: "general", name: "General", count: 4 },
]

export default function CommunityPage() {
  const [activeChannel, setActiveChannel] = useState("all")

  const filtered = activeChannel === "all"
    ? mockCommunityPosts
    : mockCommunityPosts.filter((p) => p.channel === activeChannel)

  return (
    <div className="animate-in flex gap-4 h-[calc(100vh-8rem)]">
      {/* Left sidebar */}
      <aside className="w-56 shrink-0 space-y-1">
        <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Channels</p>
        {channels.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setActiveChannel(ch.id)}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors",
              activeChannel === ch.id
                ? "bg-violet-50 text-violet-700 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <Hash className="h-3.5 w-3.5 shrink-0" />
            <span className="flex-1 text-left truncate">{ch.name}</span>
            <span className="text-xs text-gray-400">{ch.count}</span>
          </button>
        ))}

        <div className="pt-3">
          <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Members</p>
          <button className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-gray-600 hover:bg-gray-100">
            <Users className="h-3.5 w-3.5" /> Members (218)
          </button>
        </div>
      </aside>

      {/* Main feed */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Feed header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 capitalize">
              {activeChannel === "all" ? "Community Feed" : channels.find((c) => c.id === activeChannel)?.name}
            </h2>
            <p className="text-xs text-gray-400">{filtered.length} posts</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search posts..."
                className="h-8 w-48 rounded-lg border border-gray-200 bg-white pl-8 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <Button size="sm"><Plus className="h-3.5 w-3.5" /> New Post</Button>
          </div>
        </div>

        {/* Create post */}
        <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <Avatar name="Alex Rivera" size="sm" />
          <div className="flex-1">
            <input
              placeholder="Share something with the community..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50"
            />
            <div className="mt-2 flex items-center justify-end">
              <Button size="sm">Post</Button>
            </div>
          </div>
        </div>

        {/* Posts */}
        {filtered.map((post) => (
          <div
            key={post.id}
            className={cn(
              "rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition-all duration-200",
              post.is_pinned ? "border-violet-200 bg-violet-50/30" : "border-gray-100"
            )}
          >
            {/* Post header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <Avatar name={post.author.full_name} size="sm" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-gray-900">{post.author.full_name}</span>
                    {post.author.role === "owner" && (
                      <Badge variant="purple">Admin</Badge>
                    )}
                    {post.is_pinned && (
                      <span className="flex items-center gap-0.5 text-xs text-violet-600">
                        <Pin className="h-2.5 w-2.5" /> Pinned
                      </span>
                    )}
                    {post.is_announcement && (
                      <span className="flex items-center gap-0.5 text-xs text-amber-600">
                        <Megaphone className="h-2.5 w-2.5" /> Announcement
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    <span className="capitalize text-violet-600">#{post.channel}</span>
                    {" · "}{formatRelativeTime(post.created_at)}
                  </p>
                </div>
              </div>
              <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            {post.title && <h3 className="text-base font-semibold text-gray-900 mb-1.5">{post.title}</h3>}
            <p className="text-sm text-gray-700 leading-relaxed">{post.body}</p>

            {/* Actions */}
            <div className="mt-4 flex items-center gap-4 border-t border-gray-50 pt-3">
              <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-rose-500 transition-colors">
                <Heart className="h-3.5 w-3.5" />
                {post.likes_count}
              </button>
              <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-violet-600 transition-colors">
                <MessageSquare className="h-3.5 w-3.5" />
                {post.comments_count} replies
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
