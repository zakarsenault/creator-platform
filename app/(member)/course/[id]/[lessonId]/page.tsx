"use client"

import { use, useState } from "react"
import { cn } from "@/lib/utils"
import {
  ChevronDown,
  ChevronRight,
  PlayCircle,
  FileText,
  FileDown,
  HelpCircle,
  Headphones,
  CheckCircle2,
  Lock,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  ThumbsUp,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import type { LessonType } from "@/lib/types"

const curriculum = [
  {
    id: "m1",
    title: "Getting Started",
    lessons: [
      { id: "l1", title: "Welcome to the Blueprint", type: "video" as LessonType, duration: "7:00", completed: true, locked: false },
      { id: "l2", title: "How to use this course", type: "text" as LessonType, duration: "—", completed: true, locked: false },
      { id: "l3", title: "Your 90-day roadmap PDF", type: "pdf" as LessonType, duration: "—", completed: false, locked: false },
    ],
  },
  {
    id: "m2",
    title: "Finding Your Niche",
    lessons: [
      { id: "l4", title: "The niche selection framework", type: "video" as LessonType, duration: "30:40", completed: false, locked: false },
      { id: "l5", title: "Audience research deep-dive", type: "video" as LessonType, duration: "35:00", completed: false, locked: false },
      { id: "l6", title: "Niche validation quiz", type: "quiz" as LessonType, duration: "—", completed: false, locked: false },
    ],
  },
  {
    id: "m3",
    title: "Building Your Offer",
    lessons: [
      { id: "l7", title: "The perfect offer formula", type: "video" as LessonType, duration: "44:00", completed: false, locked: true },
      { id: "l8", title: "Pricing psychology", type: "video" as LessonType, duration: "32:00", completed: false, locked: true },
    ],
  },
]

const lessonTypeIcons: Record<LessonType, React.ReactNode> = {
  video: <PlayCircle className="h-3.5 w-3.5" />,
  text: <FileText className="h-3.5 w-3.5" />,
  audio: <Headphones className="h-3.5 w-3.5" />,
  pdf: <FileDown className="h-3.5 w-3.5" />,
  quiz: <HelpCircle className="h-3.5 w-3.5" />,
}

const allLessons = curriculum.flatMap((m) => m.lessons)

const mockComments = [
  { id: "c1", name: "Sarah Chen", avatar: "SC", body: "This lesson completely changed how I think about niching down. The 3-question framework is gold.", likes: 12, time: "2d ago" },
  { id: "c2", name: "James Park", avatar: "JP", body: "Quick question — does this apply if you're targeting B2B or is it more B2C focused?", likes: 4, time: "1d ago" },
  { id: "c3", name: "Maria Garcia", avatar: "MG", body: "I've watched this three times and keep picking up new things. Thank you!", likes: 8, time: "5h ago" },
]

export default function LessonPage({ params }: { params: Promise<{ id: string; lessonId: string }> }) {
  const { id, lessonId } = use(params)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ m1: true, m2: true })
  const [completed, setCompleted] = useState(false)
  const [newComment, setNewComment] = useState("")

  const currentLesson = allLessons.find((l) => l.id === lessonId) ?? allLessons[0]
  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  const totalCompleted = allLessons.filter((l) => l.completed).length
  const progress = Math.round((totalCompleted / allLessons.length) * 100)

  return (
    <div className="flex h-screen bg-[#0f0f11] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "flex flex-col border-r border-white/5 bg-[#0f0f11] transition-all duration-300 shrink-0",
        sidebarOpen ? "w-72" : "w-0 overflow-hidden"
      )}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/5">
          <Link href="/library" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">My Library</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="text-zinc-600 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Course title + progress */}
        <div className="px-4 py-4 border-b border-white/5">
          <p className="text-xs font-semibold text-white mb-1 line-clamp-2">The Creator Blueprint</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-violet-500" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs text-zinc-500">{progress}%</span>
          </div>
          <p className="text-[10px] text-zinc-600 mt-1">{totalCompleted}/{allLessons.length} lessons complete</p>
        </div>

        {/* Curriculum */}
        <div className="flex-1 overflow-y-auto py-2">
          {curriculum.map((mod) => (
            <div key={mod.id}>
              <button
                onClick={() => setExpandedModules((p) => ({ ...p, [mod.id]: !p[mod.id] }))}
                className="flex w-full items-center gap-2 px-4 py-2.5 hover:bg-white/5 transition-colors"
              >
                {expandedModules[mod.id]
                  ? <ChevronDown className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                  : <ChevronRight className="h-3.5 w-3.5 text-zinc-500 shrink-0" />}
                <span className="flex-1 text-left text-xs font-medium text-zinc-300">{mod.title}</span>
                <span className="text-[10px] text-zinc-600">{mod.lessons.length}</span>
              </button>

              {expandedModules[mod.id] && (
                <div className="pb-1">
                  {mod.lessons.map((lesson) => {
                    const isActive = lesson.id === currentLesson.id
                    return (
                      <Link
                        key={lesson.id}
                        href={lesson.locked ? "#" : `/course/${id}/${lesson.id}`}
                        className={cn(
                          "flex items-center gap-2.5 px-4 py-2 ml-5 transition-colors",
                          isActive ? "bg-white/10 rounded-lg" : "hover:bg-white/5 rounded-lg",
                          lesson.locked && "opacity-40 cursor-not-allowed"
                        )}
                      >
                        {lesson.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        ) : lesson.locked ? (
                          <Lock className="h-4 w-4 text-zinc-600 shrink-0" />
                        ) : (
                          <div className={cn("flex h-4 w-4 items-center justify-center text-zinc-500 shrink-0", isActive && "text-violet-400")}>
                            {lessonTypeIcons[lesson.type]}
                          </div>
                        )}
                        <span className={cn("flex-1 text-xs truncate", isActive ? "text-white font-medium" : "text-zinc-400")}>
                          {lesson.title}
                        </span>
                        <span className="text-[10px] text-zinc-600 shrink-0">{lesson.duration}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden bg-white">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-white px-5 py-3 shrink-0">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-gray-700 transition-colors">
                <Menu className="h-5 w-5" />
              </button>
            )}
            <div>
              <p className="text-sm font-semibold text-gray-900">{currentLesson.title}</p>
              <p className="text-xs text-gray-400 capitalize">{currentLesson.type} lesson</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Prev / next */}
            {prevLesson && (
              <Link href={`/course/${id}/${prevLesson.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
            )}
            {nextLesson && (
              <Link href={`/course/${id}/${nextLesson.id}`} className="flex h-8 items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Next <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
            <button
              onClick={() => setCompleted(true)}
              className={cn(
                "flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-colors",
                completed
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-violet-600 text-white hover:bg-violet-700"
              )}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              {completed ? "Completed!" : "Mark complete"}
            </button>
          </div>
        </div>

        {/* Lesson content */}
        <div className="flex-1 overflow-y-auto">
          {/* Video player */}
          {currentLesson.type === "video" && (
            <div className="bg-black aspect-video w-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 to-black" />
              <div className="relative flex flex-col items-center gap-4">
                <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                  <PlayCircle className="h-8 w-8 text-white" />
                </button>
                <p className="text-white/60 text-sm">{currentLesson.title}</p>
              </div>
              {/* Controls bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center gap-3">
                  <div className="h-1 flex-1 rounded-full bg-white/20 cursor-pointer">
                    <div className="h-full w-0 rounded-full bg-violet-400" />
                  </div>
                  <span className="text-xs text-white/60">0:00 / {currentLesson.duration}</span>
                </div>
              </div>
            </div>
          )}

          <div className="mx-auto max-w-3xl px-8 py-8 space-y-8">
            {/* Text lesson */}
            {currentLesson.type === "text" && (
              <div className="prose prose-gray max-w-none">
                <h1 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h1>
                <p className="text-gray-600 leading-relaxed">This is the lesson content. In a real implementation, this would render rich text from the database — formatted content, images, callout blocks, code snippets, and embedded media.</p>
                <h2>Key concepts</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <ul>
                  <li>Concept one — explanation of why this matters</li>
                  <li>Concept two — how to apply this immediately</li>
                  <li>Concept three — common mistakes to avoid</li>
                </ul>
              </div>
            )}

            {currentLesson.type === "pdf" && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 mb-4">
                  <FileDown className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{currentLesson.title}</h3>
                <p className="text-sm text-gray-500 mt-2 mb-5">Download this PDF to follow along with the lesson.</p>
                <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors">
                  <FileDown className="h-4 w-4" /> Download PDF
                </button>
              </div>
            )}

            {currentLesson.type === "quiz" && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-gray-900">Knowledge Check</h2>
                {[
                  { q: "What is the most important factor when choosing a niche?", options: ["Passion", "Market size", "Audience pain", "Competition"] },
                  { q: "How many niches should you pursue at once when starting out?", options: ["1-2", "3-5", "As many as possible", "It depends"] },
                ].map((quiz, qi) => (
                  <div key={qi} className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                    <p className="text-sm font-semibold text-gray-900 mb-3">{qi + 1}. {quiz.q}</p>
                    <div className="space-y-2">
                      {quiz.options.map((opt) => (
                        <button key={opt} className="flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 transition-colors text-left">
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300 shrink-0" />
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <button className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors">
                  Submit answers
                </button>
              </div>
            )}

            {/* Comments */}
            <div className="border-t border-gray-100 pt-8">
              <h3 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
                <MessageSquare className="h-4.5 w-4.5" />
                Discussion ({mockComments.length})
              </h3>

              {/* Add comment */}
              <div className="flex gap-3 mb-6">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">SC</div>
                <div className="flex-1">
                  <textarea
                    rows={2}
                    placeholder="Ask a question or share a thought..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                  />
                  {newComment && (
                    <button className="mt-2 rounded-lg bg-violet-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-violet-700 transition-colors">
                      Post comment
                    </button>
                  )}
                </div>
              </div>

              {/* Comments list */}
              <div className="space-y-5">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">{comment.name}</span>
                        <span className="text-xs text-gray-400">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{comment.body}</p>
                      <button className="mt-1.5 flex items-center gap-1 text-xs text-gray-400 hover:text-rose-500 transition-colors">
                        <ThumbsUp className="h-3 w-3" /> {comment.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
