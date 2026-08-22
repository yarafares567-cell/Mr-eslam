import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, BookOpen, Heart, Star, Ribbon } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-[88vh] relative overflow-hidden flex items-center bg-[#1a0914] text-[#fce4ec]">
      {/* Dark Pink Soft Background Ambient Gradient */}
      <div className="bg-gradient-to-b from-pink-900/30 via-rose-900/15 to-transparent h-full w-full absolute inset-0 -z-10" />

      {/* Floating Decorative Stickers */}
      <motion.div 
        animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }} 
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 right-12 text-3xl pointer-events-none select-none drop-shadow-[0_0_10px_rgba(216,27,96,0.8)] z-10 hidden sm:block"
      >
        💖
      </motion.div>

      <motion.div 
        animate={{ y: [0, 15, 0], rotate: [10, -10, 10] }} 
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-16 right-20 text-3xl pointer-events-none select-none drop-shadow-[0_0_10px_rgba(255,64,129,0.8)] z-10 hidden sm:block"
      >
        ✨
      </motion.div>

      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }} 
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-20 left-16 text-3xl pointer-events-none select-none drop-shadow-[0_0_10px_rgba(216,27,96,0.8)] z-10 hidden sm:block"
      >
        🎀
      </motion.div>

      <div className="px-4 sm:px-10 max-w-7xl mx-auto w-full py-12 md:py-20 font-fs">
        <div className="flex md:flex-row flex-col items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Column: Copy & Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="md:w-1/2 w-full space-y-6 text-center md:text-right"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-950/80 border border-pink-700/60 text-pink-200 text-xs sm:text-sm font-bold shadow-md shadow-pink-950/50">
              <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
              <span>منصة الرياضيات الأولى للمرحلتين الإعدادية والثانوية 🌸</span>
            </div>

            {/* Main Heading with Name Yarin */}
            <h1 className="font-khaled text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              تعلم الرياضيات بذكاء مع{' '}
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent block sm:inline drop-shadow-[0_2px_10px_rgba(216,27,96,0.4)]">
                يارين
              </span>
            </h1>

            {/* Subtitle Body Text */}
            <div className="space-y-3 font-ibm text-base sm:text-lg text-pink-100/90 max-w-2xl leading-relaxed">
              <p>
                معايا مش هتحفظ قوانين وخطوات وبس… هتتعلم إزاي تفهم الرياضيات، تفكر بطريقة صح، وتحل أي مسألة بثقة في الامتحان.
              </p>
              <p className="text-sm sm:text-base text-pink-300/70">
                شرح مبسط لكل درس، كويزات تفاعلية فورية، وامتحانات سنوات سابقة محلولة بالفيديو.
              </p>
            </div>

            {/* Dark Pink CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 font-ibm">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 hover:from-pink-700 hover:to-rose-800 text-white font-bold text-base shadow-lg shadow-pink-600/40 hover:shadow-pink-600/60 hover:scale-105 transition duration-300 flex items-center justify-center gap-2 border border-pink-400/30"
              >
                <span>ابدأ رحلتك الآن</span>
                <ArrowRight className="w-5 h-5 rotate-180" />
              </Link>

              <a
                href="#courses"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl border-2 border-pink-800/80 hover:border-pink-500 text-pink-100 font-bold text-base bg-pink-950/40 hover:bg-pink-900/50 transition duration-300 flex items-center justify-center gap-2 shadow-md shadow-black/20"
              >
                <BookOpen className="w-5 h-5 text-pink-400" />
                <span>استعرض الكورسات</span>
              </a>
            </div>

          </motion.div>

          {/* Right Column: Hero Image with Floating Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:w-1/2 w-full flex items-center justify-center relative"
          >
            <div className="relative max-w-md w-full aspect-square">
              {/* Dark Pink Glowing Background Halo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-pink-400 opacity-40 blur-3xl animate-pulse" />

              {/* Main Avatar Card Frame */}
              <div className="relative w-full h-full rounded-full p-3 bg-gradient-to-tr from-pink-700 via-rose-500 to-pink-400 shadow-[0_0_35px_rgba(216,27,96,0.5)]">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-pink-950 bg-pink-950">
                  <img
                    src="/MRV1.png"
                    alt="يارين - منصة الرياضيات"
                    className="w-full h-full object-cover object-top hover:scale-105 transition duration-500"
                    draggable="false"
                  />
                </div>
              </div>

              {/* Floating Dark Pink Sticker Badge 1 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-pink-950/90 border border-pink-700/80 p-3 sm:p-4 rounded-2xl shadow-xl shadow-black/50 flex items-center gap-3 font-ibm backdrop-blur-md"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-900/80 border border-pink-600/50 text-pink-300 flex items-center justify-center">
                  <Star className="w-6 h-6 fill-pink-400 text-pink-300" />
                </div>
                <div>
                  <div className="text-xs text-pink-300/70">خبرة أكثر من</div>
                  <div className="text-sm font-bold text-white">3 سنوات تدريس</div>
                </div>
              </motion.div>

              {/* Floating Dark Pink Sticker Badge 2 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-pink-950/90 border border-pink-700/80 p-3 sm:p-4 rounded-2xl shadow-xl shadow-black/50 flex items-center gap-3 font-ibm backdrop-blur-md"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-900/80 border border-rose-600/50 text-rose-300 flex items-center justify-center">
                  <Heart className="w-6 h-6 fill-pink-500 text-pink-400" />
                </div>
                <div>
                  <div className="text-xs text-pink-300/70">أكبر منصة رياضيات</div>
                  <div className="text-sm font-bold text-white">شرح + امتحانات</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
