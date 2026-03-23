import Link from "next/link"
import { BookOpen, PlayCircle, Clock, CheckCircle2, ArrowRight, Download, Users } from "lucide-react"

const enrolledProducts = [
  {
    id: "1",
    title: "The Creator Blueprint",
    type: "course",
    cover: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    progress: 54,
    totalLessons: 42,
    completedLessons: 23,
    nextLesson: "Audience research deep-dive",
    nextLessonId: "l5",
  },
  {
    id: "2",
    title: "Inner Circle Membership",
    type: "membership",
    cover: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    progress: 100,
    totalLessons: 0,
    completedLessons: 0,
    nextLesson: null,
    nextLessonId: null,
  },
  {
    id: "4",
    title: "Content Calendar Template Pack",
    type: "download",
    cover: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    progress: 100,
    totalLessons: 0,
    completedLessons: 0,
    nextLesson: null,
    nextLessonId: null,
  },
]

export default function LibraryPage() {
  const inProgress = enrolledProducts.filter((p) => p.progress > 0 && p.progress < 100)
  const completed = enrolledProducts.filter((p) => p.progress === 100)

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Library</h1>
        <p className="text-sm text-gray-500 mt-1">{enrolledProducts.length} products · {inProgress.length} in progress</p>
      </div>

      {/* Continue learning */}
      {inProgress.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Continue learning</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {inProgress.map((product) => (
              <div key={product.id} className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
                <div className="relative h-36">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.cover} alt={product.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="flex items-center justify-between text-white text-xs mb-1.5">
                      <span>{product.completedLessons}/{product.totalLessons} lessons</span>
                      <span>{product.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/30 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-violet-400"
                        style={{ width: `${product.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{product.title}</h3>
                  {product.nextLesson && (
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <PlayCircle className="h-3 w-3" /> Up next: {product.nextLesson}
                    </p>
                  )}
                  <Link
                    href={`/course/${product.id}/${product.nextLessonId}`}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 py-2 text-xs font-semibold text-white hover:bg-violet-700 transition-colors"
                  >
                    <PlayCircle className="h-3.5 w-3.5" /> Continue
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All products */}
      <section>
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">All products</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {enrolledProducts.map((product) => (
            <div key={product.id} className="group rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
              <div className="relative h-28">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.cover} alt={product.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {product.progress === 100 && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </div>
                )}
              </div>
              <div className="p-3.5">
                <p className="text-xs text-violet-600 font-medium capitalize mb-0.5">{product.type}</p>
                <h3 className="text-sm font-semibold text-gray-900 leading-snug">{product.title}</h3>

                {product.type === "course" && (
                  <>
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                      <span>{product.progress}% complete</span>
                      <span>{product.completedLessons}/{product.totalLessons}</span>
                    </div>
                    <div className="mt-1 h-1 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-violet-400" style={{ width: `${product.progress}%` }} />
                    </div>
                    <Link
                      href={`/course/${product.id}/${product.nextLessonId ?? "l1"}`}
                      className="mt-3 flex items-center gap-1 text-xs font-medium text-violet-600 hover:underline"
                    >
                      {product.progress === 100 ? "Review course" : "Continue"} <ArrowRight className="h-3 w-3" />
                    </Link>
                  </>
                )}

                {product.type === "membership" && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Active membership
                  </div>
                )}

                {product.type === "download" && (
                  <button className="mt-2 flex items-center gap-1 text-xs font-medium text-violet-600 hover:underline">
                    <Download className="h-3 w-3" /> Download files
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
