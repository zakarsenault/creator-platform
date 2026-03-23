"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockProducts } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { Plus, BookOpen, Users, PlayCircle, Clock, MoreHorizontal } from "lucide-react"
import Link from "next/link"

const courses = mockProducts.filter((p) => p.type === "course")

// Mock module counts
const courseMeta: Record<string, { modules: number; lessons: number; duration: string }> = {
  "1": { modules: 8, lessons: 42, duration: "12h 30m" },
  "5": { modules: 3, lessons: 14, duration: "4h 15m" },
}

export default function CoursesPage() {
  return (
    <div className="space-y-5 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Courses</h2>
          <p className="text-sm text-gray-500 mt-0.5">Build and manage your online courses</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {courses.map((course) => {
          const meta = courseMeta[course.id] ?? { modules: 0, lessons: 0, duration: "—" }
          return (
            <div
              key={course.id}
              className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="relative h-40 bg-gradient-to-br from-violet-50 to-indigo-50">
                {course.cover_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={course.cover_image} alt={course.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <BookOpen className="h-10 w-10 text-violet-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <Badge variant={course.status === "published" ? "success" : "outline"}>{course.status}</Badge>
                  <span className="text-xs text-white/80">{meta.duration}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{course.title}</h3>
                {course.subtitle && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{course.subtitle}</p>}

                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {meta.modules} modules</span>
                  <span className="flex items-center gap-1"><PlayCircle className="h-3 w-3" /> {meta.lessons} lessons</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {course.members_count ?? 0} students</span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-3">
                  <span className="text-sm font-bold text-gray-900">{course.price ? formatCurrency(course.price) : "Free"}</span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/courses/${course.id}`}
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      View
                    </Link>
                    <Link
                      href={`/dashboard/courses/${course.id}/builder`}
                      className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-700 transition-colors"
                    >
                      Build →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Create new card */}
        <Link
          href="#"
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 text-center hover:border-violet-300 hover:bg-violet-50/30 transition-colors group min-h-[200px]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 group-hover:bg-violet-100 transition-colors mb-3">
            <Plus className="h-6 w-6 text-violet-600" />
          </div>
          <p className="font-medium text-gray-700 group-hover:text-violet-700">Create new course</p>
          <p className="text-sm text-gray-400 mt-1">Build lessons, modules, and more</p>
        </Link>
      </div>
    </div>
  )
}
