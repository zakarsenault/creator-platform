"use client"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  Eye,
  Save,
  Globe,
  ImageIcon,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Link2,
  Heading2,
  Heading3,
  Code,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"

const toolbarItems = [
  { icon: Bold, label: "Bold" },
  { icon: Italic, label: "Italic" },
  { icon: Heading2, label: "H2" },
  { icon: Heading3, label: "H3" },
  { icon: List, label: "Bullet list" },
  { icon: ListOrdered, label: "Numbered list" },
  { icon: Quote, label: "Quote" },
  { icon: Code, label: "Code" },
  { icon: Link2, label: "Link" },
  { icon: ImageIcon, label: "Image" },
]

const mockPost = {
  id: "b1",
  title: "How I built a $100K creator business in 12 months",
  status: "published",
  tags: ["business", "creator"],
  coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
  seoTitle: "How I Built a $100K Creator Business in 12 Months",
  seoDescription: "The exact steps, systems, and mindset shifts that helped me build a six-figure creator business from scratch in just one year.",
  body: `Building a six-figure creator business isn't about luck. It's about having the right systems, the right offer, and the right mindset.

When I started, I had zero audience, zero email list, and zero revenue. Twelve months later, I had crossed $100K. Here's exactly how I did it.

## Month 1–3: Building the foundation

The first thing I did was get clear on who I was serving and what problem I was solving. I spent the first month obsessing over my audience — not creating content, not building products. Just understanding my people.

This is where most creators go wrong. They jump straight to making content without knowing who they're making it for.

## Month 4–6: The first offer

Once I knew my audience deeply, I built a simple offer: a one-time $297 course teaching the core framework I'd used in my own business.

I didn't need a perfect sales page. I didn't need a fancy funnel. I emailed my tiny list of 400 people and made $4,700 on launch day.

That was proof of concept.`,
}

export default function BlogEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [title, setTitle] = useState(mockPost.title)
  const [status, setStatus] = useState(mockPost.status)
  const [activePanel, setActivePanel] = useState<"write" | "seo" | "settings">("write")
  const [seoTitle, setSeoTitle] = useState(mockPost.seoTitle)
  const [seoDesc, setSeoDesc] = useState(mockPost.seoDescription)

  return (
    <div className="animate-in h-[calc(100vh-8rem)] flex flex-col">
      {/* Editor header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/blog"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800 truncate max-w-xs">{title || "Untitled post"}</span>
            <Badge variant={status === "published" ? "success" : "outline"}>{status}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-8 items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <Eye className="h-3.5 w-3.5" /> Preview
          </button>
          <Button variant="outline" size="sm">
            <Save className="h-3.5 w-3.5" /> Save draft
          </Button>
          <Button size="sm">
            <Globe className="h-3.5 w-3.5" />
            {status === "published" ? "Update" : "Publish"}
          </Button>
        </div>
      </div>

      <div className="flex gap-4 flex-1 overflow-hidden">
        {/* Main editor */}
        <div className="flex-1 flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          {/* Formatting toolbar */}
          <div className="flex items-center gap-0.5 border-b border-gray-100 px-3 py-2 flex-wrap">
            {toolbarItems.map((item) => (
              <button
                key={item.label}
                title={item.label}
                className="flex h-7 w-7 items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
              >
                <item.icon className="h-3.5 w-3.5" />
              </button>
            ))}
            <div className="mx-1 h-4 w-px bg-gray-200" />
            <button className="flex h-7 w-7 items-center justify-center rounded text-gray-500 hover:bg-gray-100">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Editor area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {/* Cover image */}
            {mockPost.coverImage ? (
              <div className="relative group rounded-xl overflow-hidden mb-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mockPost.coverImage} alt="Cover" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow transition-opacity">
                    <ImageIcon className="h-3.5 w-3.5" /> Change cover
                  </button>
                </div>
              </div>
            ) : (
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-5 text-sm text-gray-400 hover:border-violet-300 hover:text-violet-500 transition-colors mb-2">
                <ImageIcon className="h-4 w-4" /> Add cover image
              </button>
            )}

            {/* Title */}
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title..."
              rows={2}
              className="w-full resize-none text-3xl font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none leading-tight"
            />

            {/* Tags */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {mockPost.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
                  {tag} ×
                </Badge>
              ))}
              <button className="text-xs text-gray-400 hover:text-violet-600 transition-colors">+ Add tag</button>
            </div>

            {/* Body */}
            <textarea
              defaultValue={mockPost.body}
              placeholder="Start writing your post..."
              className="w-full flex-1 min-h-[400px] resize-none text-[15px] text-gray-700 leading-relaxed placeholder:text-gray-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Right panel */}
        <div className="w-64 flex flex-col gap-3 overflow-y-auto">
          {/* Panel tabs */}
          <div className="flex items-center gap-1 rounded-xl border border-gray-100 bg-white p-1 shadow-sm">
            {(["write", "seo", "settings"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setActivePanel(p)}
                className={cn(
                  "flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors capitalize",
                  activePanel === p ? "bg-violet-600 text-white" : "text-gray-500 hover:text-gray-700"
                )}
              >
                {p}
              </button>
            ))}
          </div>

          {activePanel === "write" && (
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">Status</p>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-9 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">URL slug</p>
                <input
                  defaultValue="how-i-built-100k-creator-business"
                  className="w-full h-9 rounded-lg border border-gray-200 px-3 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">Publish date</p>
                <input
                  type="date"
                  defaultValue="2024-03-15"
                  className="w-full h-9 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>
          )}

          {activePanel === "seo" && (
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-1.5">SEO title</p>
                <input
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full h-9 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <p className={cn("text-[10px] mt-1", seoTitle.length > 60 ? "text-red-400" : "text-gray-400")}>
                  {seoTitle.length}/60 characters
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-1.5">Meta description</p>
                <textarea
                  rows={3}
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                />
                <p className={cn("text-[10px] mt-1", seoDesc.length > 160 ? "text-red-400" : "text-gray-400")}>
                  {seoDesc.length}/160 characters
                </p>
              </div>
              {/* Preview */}
              <div>
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Search preview</p>
                <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 space-y-0.5">
                  <p className="text-[11px] text-blue-600 truncate">{seoTitle}</p>
                  <p className="text-[10px] text-green-700">alexrivera.com › blog</p>
                  <p className="text-[10px] text-gray-500 line-clamp-2">{seoDesc}</p>
                </div>
              </div>
            </div>
          )}

          {activePanel === "settings" && (
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">Category</p>
                <select className="w-full h-9 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white">
                  <option>Business</option>
                  <option>Creator tips</option>
                  <option>Case study</option>
                </select>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-1.5">Tags</p>
                <input placeholder="Add tags..." className="w-full h-9 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-gray-700">Featured post</span>
                <div className="flex h-5 w-9 cursor-pointer items-center rounded-full bg-gray-200 px-0.5">
                  <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
                </div>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-gray-700">Allow comments</span>
                <div className="flex h-5 w-9 cursor-pointer items-center rounded-full bg-violet-500 px-0.5 justify-end">
                  <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
