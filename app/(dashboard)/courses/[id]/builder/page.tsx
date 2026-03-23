"use client"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockProducts } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import type { Module, Lesson, LessonType } from "@/lib/types"
import {
  ArrowLeft,
  Plus,
  ChevronRight,
  ChevronDown,
  GripVertical,
  PlayCircle,
  FileText,
  Headphones,
  FileDown,
  HelpCircle,
  Lock,
  Unlock,
  MoreHorizontal,
  Check,
  Settings,
  Eye,
} from "lucide-react"
import Link from "next/link"

const lessonTypeIcons: Record<LessonType, React.ReactNode> = {
  video: <PlayCircle className="h-3.5 w-3.5" />,
  text: <FileText className="h-3.5 w-3.5" />,
  audio: <Headphones className="h-3.5 w-3.5" />,
  pdf: <FileDown className="h-3.5 w-3.5" />,
  quiz: <HelpCircle className="h-3.5 w-3.5" />,
}

const lessonTypeColors: Record<LessonType, string> = {
  video: "text-blue-500 bg-blue-50",
  text: "text-gray-500 bg-gray-50",
  audio: "text-emerald-500 bg-emerald-50",
  pdf: "text-amber-500 bg-amber-50",
  quiz: "text-violet-500 bg-violet-50",
}

// Mock course data
const mockModules: Module[] = [
  {
    id: "m1",
    course_id: "1",
    title: "Getting Started",
    position: 1,
    lessons: [
      { id: "l1", module_id: "m1", title: "Welcome to the Blueprint", type: "video", duration_seconds: 420, position: 1, is_locked: false, created_at: "" },
      { id: "l2", module_id: "m1", title: "How to use this course", type: "text", position: 2, is_locked: false, created_at: "" },
      { id: "l3", module_id: "m1", title: "Your 90-day roadmap", type: "pdf", position: 3, is_locked: false, created_at: "" },
    ],
  },
  {
    id: "m2",
    course_id: "1",
    title: "Finding Your Niche",
    position: 2,
    lessons: [
      { id: "l4", module_id: "m2", title: "The niche selection framework", type: "video", duration_seconds: 1840, position: 1, is_locked: false, created_at: "" },
      { id: "l5", module_id: "m2", title: "Audience research deep-dive", type: "video", duration_seconds: 2100, position: 2, is_locked: false, created_at: "" },
      { id: "l6", module_id: "m2", title: "Niche validation quiz", type: "quiz", position: 3, is_locked: false, created_at: "" },
    ],
  },
  {
    id: "m3",
    course_id: "1",
    title: "Building Your Offer",
    position: 3,
    lessons: [
      { id: "l7", module_id: "m3", title: "The perfect offer formula", type: "video", duration_seconds: 2640, position: 1, is_locked: true, drip_days: 7, created_at: "" },
      { id: "l8", module_id: "m3", title: "Pricing psychology", type: "video", duration_seconds: 1920, position: 2, is_locked: true, drip_days: 7, created_at: "" },
      { id: "l9", module_id: "m3", title: "Writing your offer copy", type: "text", position: 3, is_locked: true, drip_days: 14, created_at: "" },
    ],
  },
  {
    id: "m4",
    course_id: "1",
    title: "Traffic & Growth",
    position: 4,
    lessons: [
      { id: "l10", module_id: "m4", title: "Content strategy overview", type: "video", duration_seconds: 3060, position: 1, is_locked: true, drip_days: 21, created_at: "" },
      { id: "l11", module_id: "m4", title: "Short-form content system", type: "video", duration_seconds: 2400, position: 2, is_locked: true, drip_days: 21, created_at: "" },
    ],
  },
]

function formatDuration(seconds?: number) {
  if (!seconds) return ""
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m >= 60) {
    const h = Math.floor(m / 60)
    return `${h}h ${m % 60}m`
  }
  return `${m}:${s.toString().padStart(2, "0")}`
}

export default function CourseBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const course = mockProducts.find((p) => p.id === id) ?? mockProducts[0]
  const [modules, setModules] = useState<Module[]>(mockModules)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ m1: true, m2: true })
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0)
  const totalDuration = modules.reduce(
    (s, m) => s + m.lessons.reduce((ls, l) => ls + (l.duration_seconds ?? 0), 0),
    0
  )

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="animate-in flex flex-col h-[calc(100vh-8rem)]">
      {/* Builder header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/courses`}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
          <div>
            <h2 className="text-base font-bold text-gray-900">{course.title}</h2>
            <p className="text-xs text-gray-500">{modules.length} modules · {totalLessons} lessons · {formatDuration(totalDuration)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Eye className="h-3.5 w-3.5" /> Preview</Button>
          <Button variant="outline" size="sm"><Settings className="h-3.5 w-3.5" /> Settings</Button>
          <Button size="sm"><Check className="h-3.5 w-3.5" /> Save changes</Button>
        </div>
      </div>

      {/* Main builder area */}
      <div className="flex gap-4 flex-1 overflow-hidden">
        {/* Module tree */}
        <div className="w-72 rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Curriculum</span>
            <button
              onClick={() => {}}
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {modules.map((module, moduleIdx) => (
              <div key={module.id} className="mb-1">
                {/* Module header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 hover:bg-gray-50 transition-colors group"
                >
                  <GripVertical className="h-3.5 w-3.5 text-gray-300 opacity-0 group-hover:opacity-100" />
                  {expandedModules[module.id] ? (
                    <ChevronDown className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  )}
                  <span className="flex-1 text-left text-sm font-medium text-gray-700 truncate">{module.title}</span>
                  <span className="text-xs text-gray-400">{module.lessons.length}</span>
                </button>

                {/* Lessons */}
                {expandedModules[module.id] && (
                  <div className="ml-6 mt-0.5 space-y-0.5">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition-colors group",
                          selectedLesson?.id === lesson.id
                            ? "bg-violet-50 text-violet-700"
                            : "hover:bg-gray-50 text-gray-600"
                        )}
                      >
                        <div className={cn("flex h-5 w-5 items-center justify-center rounded shrink-0", lessonTypeColors[lesson.type])}>
                          {lessonTypeIcons[lesson.type]}
                        </div>
                        <span className="flex-1 text-xs truncate">{lesson.title}</span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                          {lesson.is_locked ? (
                            <Lock className="h-3 w-3 text-gray-400" />
                          ) : null}
                          {lesson.duration_seconds ? (
                            <span className="text-[10px] text-gray-400">{formatDuration(lesson.duration_seconds)}</span>
                          ) : null}
                        </div>
                      </button>
                    ))}
                    <button className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors">
                      <Plus className="h-3 w-3" /> Add lesson
                    </button>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() => {}}
              className="mt-2 flex w-full items-center gap-2 rounded-lg border-2 border-dashed border-gray-200 px-3 py-2.5 text-sm text-gray-400 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/30 transition-colors"
            >
              <Plus className="h-4 w-4" /> Add module
            </button>
          </div>
        </div>

        {/* Lesson editor */}
        <div className="flex-1 rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden flex flex-col">
          {selectedLesson ? (
            <>
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
                <div className="flex items-center gap-2.5">
                  <div className={cn("flex h-6 w-6 items-center justify-center rounded", lessonTypeColors[selectedLesson.type])}>
                    {lessonTypeIcons[selectedLesson.type]}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{selectedLesson.title}</span>
                  <Badge variant="outline" className="capitalize text-xs">{selectedLesson.type}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                    {selectedLesson.is_locked ? <><Lock className="h-3 w-3" /> Locked</> : <><Unlock className="h-3 w-3" /> Free preview</>}
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {/* Title */}
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Lesson title</label>
                  <input
                    defaultValue={selectedLesson.title}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                {/* Content area by type */}
                {selectedLesson.type === "video" && (
                  <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                    <PlayCircle className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                    <p className="text-sm font-medium text-gray-600">Upload or embed a video</p>
                    <p className="text-xs text-gray-400 mt-1">MP4, MOV · or paste a YouTube/Vimeo URL</p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <Button size="sm" variant="outline">Upload video</Button>
                      <Button size="sm" variant="ghost">Embed URL</Button>
                    </div>
                  </div>
                )}

                {selectedLesson.type === "text" && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Lesson content</label>
                    <div className="min-h-48 rounded-xl border border-gray-200 p-4">
                      <p className="text-sm text-gray-400 italic">Start writing your lesson content here...</p>
                    </div>
                  </div>
                )}

                {selectedLesson.type === "pdf" && (
                  <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                    <FileDown className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                    <p className="text-sm font-medium text-gray-600">Attach a PDF or worksheet</p>
                    <Button size="sm" variant="outline" className="mt-4">Upload file</Button>
                  </div>
                )}

                {selectedLesson.type === "quiz" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-gray-500">Quiz questions</label>
                      <Button size="sm" variant="ghost"><Plus className="h-3.5 w-3.5" /> Add question</Button>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center text-sm text-gray-400">
                      No questions yet. Add your first question.
                    </div>
                  </div>
                )}

                {/* Drip settings */}
                <div className="rounded-xl border border-gray-100 p-4 space-y-3">
                  <h4 className="text-xs font-semibold text-gray-700">Drip Settings</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Drip this lesson</span>
                    <div className="flex h-5 w-9 cursor-pointer items-center rounded-full bg-gray-200 px-0.5 transition-colors">
                      <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
                    </div>
                  </div>
                  {selectedLesson.drip_days && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Unlock after</span>
                      <input
                        type="number"
                        defaultValue={selectedLesson.drip_days}
                        className="w-16 rounded-lg border border-gray-200 px-2 py-1 text-sm text-center"
                      />
                      <span className="text-sm text-gray-500">days after enrollment</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 mb-4">
                <BookOpen className="h-6 w-6 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-700">Select a lesson to edit</p>
              <p className="text-xs text-gray-400 mt-1">Or create a new lesson from the curriculum panel</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
