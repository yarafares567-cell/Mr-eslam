import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { YEARS } from '../data/dummyData'
import { BookOpen, ArrowRight, Sparkles, GraduationCap, Heart } from 'lucide-react'

const TABS = [
  { id: 'all', label: 'All Levels' },
  { id: 'prep', label: 'Middle School' },
  { id: 'sec', label: 'High School' },
]

export default function YearsSection() {
  const [tab, setTab] = useState('all')
  const shown = tab === 'all' ? YEARS : YEARS.filter((y) => y.stage === tab)

  return (
    <section className="space-y-12 py-16 relative bg-[#1a0914] text-[#fce4ec]" id="courses">
      {/* Soft Ambient Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-950/20 via-rose-950/10 to-transparent pointer-events-none -z-10" />

      {/* Decorative Floating Stickers */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-8, 8, -8] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-8 text-2xl pointer-events-none select-none drop-shadow-[0_0_8px_rgba(216,27,96,0.8)] z-10 hidden sm:block"
      >
        🎀
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0], rotate: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-12 right-10 text-2xl pointer-events-none select-none drop-shadow-[0_0_8px_rgba(255,64,129,0.8)] z-10 hidden sm:block"
      >
        ✨
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Title Header Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto font-ibm">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-950/80 border border-pink-700/60 text-pink-300 text-xs font-bold shadow-md shadow-pink-950/50">
            <GraduationCap className="w-4 h-4 text-pink-400" />
            <span>Academic Levels & Grades</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-messiri text-white">
            Choose Your Grade & Start Learning <span className="inline-block animate-bounce">📚</span>
          </h2>

          <p className="text-sm sm:text-base text-pink-200/70">
            Browse customized math curricula for your grade, organized lessons, and past exam solutions.
          </p>
        </div>

        {/* Tabs Filter */}
        <div className="flex font-ibm justify-center" role="tablist">
          <div className="inline-flex flex-wrap justify-center gap-2 rounded-2xl border border-pink-900/60 bg-[#2a0f21] p-2 shadow-lg shadow-black/40">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-xl px-6 py-2.5 text-sm md:text-base font-bold transition duration-300 ${
                  tab === t.id
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-600/40 border border-pink-400/30'
                    : 'text-pink-200/80 hover:bg-pink-900/50 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Years Cards Grid */}
        <div className="grid font-ibm grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="wait">
            {shown.map((y) => (
              <motion.div
                key={y.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="group h-full"
              >
                <Link to={`/years/${y.id}`} className="block h-full">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-pink-900/60 bg-[#2a0f21] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-pink-600/20 hover:border-pink-500">
                    {/* Top Decorative Color Bar */}
                    <div className="h-2 w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600" />

                    {/* Card Hero Header */}
                    <div className="relative overflow-hidden h-44 bg-gradient-to-br from-pink-950 via-[#36132b] to-pink-900 flex items-center justify-center p-6 text-center border-b border-pink-900/40">
                      <span className="font-khaled text-3xl sm:text-4xl text-pink-100 group-hover:scale-110 transition duration-300 drop-shadow-[0_2px_8px_rgba(216,27,96,0.5)]">
                        {y.title}
                      </span>

                      {/* Badge Sticker */}
                      <span className="absolute top-4 left-4 rounded-full bg-pink-900/80 border border-pink-600/50 px-3.5 py-1 text-xs font-bold text-pink-200 shadow-sm backdrop-blur-md">
                        {y.badge}
                      </span>
                    </div>

                    {/* Card Body Content */}
                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <p className="text-sm text-pink-200/80 leading-relaxed">
                        {y.desc}
                      </p>

                      {/* Curriculum Branches Badges */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {y.branches.map((b) => (
                          <span
                            key={b}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-pink-950/80 border border-pink-800/50 text-pink-300"
                          >
                            {b}
                          </span>
                        ))}
                      </div>

                      {/* Card Footer Link */}
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-pink-900/40">
                        <span className="text-sm font-bold text-pink-400 group-hover:text-pink-300 group-hover:underline transition">
                          Explore Lessons & Exams
                        </span>

                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-950 border border-pink-800 text-pink-300 group-hover:bg-pink-600 group-hover:border-pink-500 group-hover:text-white transition duration-300 shadow-md">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

