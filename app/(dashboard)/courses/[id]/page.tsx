"use client"

import { use, useState } from "react"
import { mockProducts } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { formatCurrency, formatRelativeTime } from "@/lib/utils"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  BookOpen,
  Edit,
  Eye,
  Settings,
  Users,
  PlayCircle,
  Clock,
  BarChart2,
  Layers,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronRight,
  FileText,
  Headphones,
  FileDown,
  HelpCircle,
  Plus,
} from "lucide-react"
import Link from "next/link"
import type { LessonType } from "@/lib/types"

const tabs = ["Overview", "Curriculum", "Students", "Settings"]

// Mock course curriculum
const curriculum = [
  {
    id: "m1",
    title: "Getting Started",
    lessons: [
      { id: "l1", title: "Welcome to the Blueprint", type: "video" as LessonType, duration: "7:00", completed: 312, locked: false },
      { id: "l2", title: "How to use this course", type: "text" as LessonType, duration: "—", completed: 298, locked: false },
      { id: "l3", title: "Your 90-day roadmap PDF", type: "pdf" as LessonType, duration: "—", completed: 287, locked: false },
    ],
  },
  {
    id: "m2",
    title: "Finding Your Niche",
    lessons: [
      { id: "l4", title: "The niche selection framework", type: "video" as LessonType, duration: "30:40", completed: 276, locked: false },
      { id: "l5", title: "Audience research deep-dive", type: "video" as LessonType, duration: "35:00", completed: 261, locked: false },
      { id: "l6", title: "Niche validation quiz", type: "quiz" as LessonType, duration: "—", completed: 248, locked: false },
    ],
  },
  {
    id: "m3",
    title: "Building Your Offer",
    lessons: [
      { id: "l7", title: "The perfect offer formula", type: "video" as LessonType, duration: "44:00", completed: 201, locked: true },
      { id: "l8", title: "Pricing psychology", type: "video" as LessonType, duration: "32:00", completed: 189, locked: true },
      { id: "l9", title: "Writing your offer copy", type: "text" as LessonType, duration: "—", completed: 172, locked: true },
    ],
  },
  {
    id: "m4",
    title: "Traffic & Growth",
    lessons: [
      { id: "l10", title: "Content strategy overview", type: "video" as LessonType, duration: "51:00", completed: 143, locked: true },
      { id: "l11", title: "Short-form content system", type: "video" as LessonType, duration: "40:00", completed: 128, locked: true },
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

const lessonTypeColors: Record<LessonType, string> = {
  video: "bg-blue-50 text-blue-500",
  text: "bg-gray-50 text-gray-500",
  audio: "bg-emerald-50 text-emerald-500",
  pdf: "bg-amber-50 text-amber-500",
  quiz: "bg-violet-50 text-violet-500",
}

const mockStudents = [
  { name: "Sarah Chen", email: "sarah@example.com", progress: 87, lastActive: "2024-03-22T10:00:00Z" },
  { name: "James Park", email: "james@example.com", progress: 54, lastActive: "2024-03-21T14:00:00Z" },
  { name: "Maria Garcia", email: "maria@example.com", progress: 100, lastActive: "2024-03-20T09:00:00Z" },
  { name: "Alex Johnson", email: "alex@example.com", progress: 12, lastActive: "2024-03-18T11:00:00Z" },
  { name: "Taylor Smith", email: "taylor@example.com", progress: 63, lastActive: "2024-03-19T16:00:00Z" },
]

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const course = mockProducts.find((p) => p.id === id) ?? mockProducts[0]
  const [activeTab, setActiveTab] = useState("Overview")
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ m1: true })

  const totalLessons = curriculum.reduce((s, m) => s + m.lessons.length, 0)
  const completionRate = Math.round(
    (mockStudents.reduce((s, st) => s + st.progress, 0) / (mockStudents.length * 100)) * 100
  )

  return (
    <div className="animate-in space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Link
            href="/dashboard/courses"
            className="mt-1 flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">{course.title}</h2>
              <Badge variant={course.status === "published" ? "success" : "outline"}>{course.status}</Badge>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{course.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Eye className="h-3.5 w-3.5" /> Preview</Button>
          <Link
            href={`/dashboard/courses/${id}/builder`}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-medium text-white hover:bg-violet-700 transition-colors shadow-sm"
          >
            <Edit className="h-3.5 w-3.5" /> Edit curriculum
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-3 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              activeTab === tab ? "border-violet-600 text-violet-600" : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="grid grid-cols-3 gap-4">
          {/* Left: stats + cover */}
          <div className="col-span-2 space-y-4">
            {/* Stats row */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Students", value: (course.members_count ?? 0).toLocaleString(), icon: Users },
                { label: "Revenue", value: formatCurrency(course.revenue ?? 0), icon: BarChart2 },
                { label: "Modules", value: curriculum.length.toString(), icon: Layers },
                { label: "Lessons", value: totalLessons.toString(), icon: BookOpen },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1.5">
                    <s.icon className="h-3.5 w-3.5" /> {s.label}
                  </div>
                  <p className="text-xl font-bold text-gray-900">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Completion bar */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-gray-700">Average completion rate</p>
                  <span className="text-2xl font-bold text-violet-600">{completionRate}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400 transition-all"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-400">{mockStudents.filter((s) => s.progress === 100).length} students completed · {mockStudents.filter((s) => s.progress > 0 && s.progress < 100).length} in progress</p>
              </CardContent>
            </Card>

            {/* Cover + details */}
            <Card>
              <CardContent className="p-5 space-y-4">
                {course.cover_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={course.cover_image} alt={course.title} className="w-full h-44 object-cover rounded-xl" />
                )}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Price</p>
                    <p className="font-semibold text-gray-900">{course.price ? formatCurrency(course.price) : "Free"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Pricing type</p>
                    <p className="font-semibold text-gray-900 capitalize">{course.pricing_type.replace("_", " ")}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400 mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {course.tags?.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  {course.description && (
                    <div className="col-span-2">
                      <p className="text-xs text-gray-400 mb-1">Description</p>
                      <p className="text-gray-600 leading-relaxed">{course.description}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-2">
                <Link
                  href={`/dashboard/courses/${id}/builder`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-xs font-medium text-white hover:bg-violet-700 transition-colors"
                >
                  <BookOpen className="h-3.5 w-3.5" /> Open course builder
                </Link>
                <Button variant="outline" className="w-full" size="sm">
                  <BarChart2 className="h-3.5 w-3.5" /> View analytics
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Settings className="h-3.5 w-3.5" /> Course settings
                </Button>
              </CardContent>
            </Card>

            {/* Curriculum summary */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs">Curriculum</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2 space-y-2">
                {curriculum.map((mod) => (
                  <div key={mod.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 truncate">{mod.title}</span>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">{mod.lessons.length} lessons</span>
                  </div>
                ))}
                <div className="pt-1 border-t border-gray-50">
                  <p className="text-xs text-gray-400">{totalLessons} total lessons across {curriculum.length} modules</p>
                </div>
              </CardContent>
            </Card>

            {/* Publish */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs">Visibility</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge variant={course.status === "published" ? "success" : "outline"}>{course.status}</Badge>
                </div>
                <Button
                  variant={course.status === "published" ? "outline" : "primary"}
                  size="sm"
                  className="w-full mt-1"
                >
                  {course.status === "published" ? "Unpublish" : "Publish course"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "Curriculum" && (
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-700">{curriculum.length} modules · {totalLessons} lessons</p>
            <Link
              href={`/dashboard/courses/${id}/builder`}
              className="text-xs font-medium text-violet-600 hover:underline"
            >
              Edit in builder →
            </Link>
          </div>
          {curriculum.map((mod) => (
            <div key={mod.id} className="border-b border-gray-50 last:border-0">
              <button
                onClick={() => setExpandedModules((p) => ({ ...p, [mod.id]: !p[mod.id] }))}
                className="flex w-full items-center gap-3 px-5 py-3.5 hover:bg-gray-50/50 transition-colors"
              >
                {expandedModules[mod.id]
                  ? <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                  : <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />}
                <span className="flex-1 text-left text-sm font-semibold text-gray-800">{mod.title}</span>
                <span className="text-xs text-gray-400">{mod.lessons.length} lessons</span>
              </button>
              {expandedModules[mod.id] && (
                <div className="pb-2">
                  {mod.lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50/30 transition-colors ml-6">
                      <div className={cn("flex h-6 w-6 items-center justify-center rounded shrink-0", lessonTypeColors[lesson.type])}>
                        {lessonTypeIcons[lesson.type]}
                      </div>
                      <span className="flex-1 text-sm text-gray-700">{lesson.title}</span>
                      {lesson.locked && <Lock className="h-3.5 w-3.5 text-gray-300 shrink-0" />}
                      <span className="text-xs text-gray-400 w-10 text-right">{lesson.duration}</span>
                      <span className="text-xs text-gray-400 w-20 text-right">
                        <CheckCircle2 className="h-3 w-3 inline text-emerald-400 mr-1" />
                        {lesson.completed}
                      </span>
                    </div>
                  ))}
                  <button className="flex items-center gap-1.5 px-5 py-2 ml-6 text-xs text-gray-400 hover:text-violet-600 transition-colors">
                    <Plus className="h-3.5 w-3.5" /> Add lesson
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "Students" && (
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">Student</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">Progress</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500">Last active</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockStudents.map((student) => (
                <tr key={student.email} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={student.name} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{student.name}</p>
                        <p className="text-xs text-gray-400">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-28 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", student.progress === 100 ? "bg-emerald-500" : "bg-violet-400")}
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right text-xs text-gray-400">
                    {formatRelativeTime(student.lastActive)}
                  </td>
                  <td className="px-5 py-3 text-right">
                    {student.progress === 100
                      ? <Badge variant="success">Completed</Badge>
                      : student.progress > 0
                        ? <Badge variant="purple">In progress</Badge>
                        : <Badge variant="outline">Not started</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Settings" && (
        <div className="max-w-xl space-y-5">
          <Card>
            <CardHeader className="p-5 pb-0"><CardTitle>Course settings</CardTitle></CardHeader>
            <CardContent className="p-5 space-y-4">
              {[
                { label: "Course title", value: course.title },
                { label: "Subtitle", value: course.subtitle ?? "" },
                { label: "URL slug", value: course.slug },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-medium text-gray-600 block mb-1.5">{f.label}</label>
                  <input defaultValue={f.value} className="h-9 w-full rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
              ))}
              <div className="flex justify-end pt-2">
                <Button size="sm">Save settings</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm font-semibold text-red-600 mb-1">Danger zone</p>
              <p className="text-xs text-gray-500 mb-3">These actions are irreversible.</p>
              <Button variant="danger" size="sm">Delete course</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
