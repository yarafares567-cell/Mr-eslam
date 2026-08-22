import { motion } from 'framer-motion'
import { Sparkles, BrainCircuit, HeartHandshake, Award, Heart, Ribbon, Star } from 'lucide-react'

const FEATURES = [
  {
    title: 'Simple & Engaging Learning',
    desc: 'Clear, simplified explanations that help you grasp mathematics from the fundamentals and tackle complex problems with confidence.',
    icon: BrainCircuit,
    color: 'from-pink-800 via-rose-700 to-pink-900',
    sticker: '✨',
  },
  {
    title: 'Continuous Support & Guidance',
    desc: 'Ongoing tracking of your progress with step-by-step guidance to overcome challenges and elevate your skills all year round.',
    icon: HeartHandshake,
    color: 'from-rose-800 via-pink-700 to-rose-900',
    sticker: '💖',
  },
  {
    title: 'Comprehensive Practice & Exams',
    desc: 'Interactive quizzes, practice problem sets, and past exam video solutions designed to ensure top marks.',
    icon: Award,
    color: 'from-pink-900 via-purple-800 to-pink-950',
    sticker: '🎀',
  },
]

export default function WhyUsSection() {
  return (
    <section className="relative py-20 bg-gradient-to-t from-pink-950/40 via-[#1a0914] to-[#1a0914] text-[#fce4ec] font-ibm overflow-hidden">
      {/* Soft Background Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-pink-900/20 via-transparent to-transparent pointer-events-none -z-10" />

      {/* Decorative Floating Background Stickers */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 left-10 text-3xl pointer-events-none select-none drop-shadow-[0_0_10px_rgba(216,27,96,0.8)] z-10 hidden sm:block"
      >
        🎀
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0], rotate: [8, -8, 8] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute bottom-12 right-12 text-3xl pointer-events-none select-none drop-shadow-[0_0_10px_rgba(255,64,129,0.8)] z-10 hidden sm:block"
      >
        ✨
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-950/80 border border-pink-700/60 text-pink-300 text-xs font-bold shadow-md shadow-pink-950/50">
            <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
            <span>Platform Features</span>
          </div>

          <h2 className="font-khaled font-bold text-3xl sm:text-5xl text-white">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(216,27,96,0.4)]">
              Yarin?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-pink-200/70">
            Our innovative approach transforms math into an enjoyable, accessible, and rewarding learning journey.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className={`relative rounded-3xl p-8 bg-gradient-to-br ${f.color} text-white shadow-xl shadow-black/40 border border-pink-500/30 overflow-hidden group flex flex-col justify-between min-h-[280px] backdrop-blur-md`}
              >
                {/* Top Corner Sticker Badge */}
                <div className="absolute top-4 right-4 text-2xl select-none pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] group-hover:scale-125 transition duration-300">
                  {f.sticker}
                </div>

                {/* Animated Background Glow Accent */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-400/20 rounded-full blur-2xl group-hover:scale-150 transition duration-500" />

                <div className="relative z-10 space-y-4">
                  {/* Icon Container */}
                  <div className="w-14 h-14 rounded-2xl bg-pink-950/60 border border-pink-400/40 flex items-center justify-center text-pink-200 shadow-lg backdrop-blur-md">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-xl sm:text-2xl font-messiri text-pink-100">
                    {f.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-pink-100/90 leading-relaxed font-ibm">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
