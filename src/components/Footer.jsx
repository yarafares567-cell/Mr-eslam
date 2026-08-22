import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Heart, Sparkles, Ribbon } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

// Custom SVG Icons
function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

const SOCIALS = [
  { icon: YoutubeIcon, name: 'YouTube', href: 'https://www.youtube.com/channel/UCZmQMG4vx3xncQogurpyCDw' },
  { icon: FacebookIcon, name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61567028243039' },
]

export default function Footer() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    checkAdminAccess()

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkAdminAccess()
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const checkAdminAccess = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      setIsAdmin(false)
      return
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    setIsAdmin(!error && profile?.role === 'admin')
  }

  return (
    <footer className="py-12 bg-[#1a0815] text-pink-100 font-ibm relative overflow-hidden border-t border-pink-900/60">
      
      {/* Decorative Animated Floating Stickers */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-4 left-8 text-2xl pointer-events-none select-none drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] hidden sm:block"
      >
        🎀
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-6 right-12 text-2xl pointer-events-none select-none drop-shadow-[0_0_8px_rgba(244,114,182,0.8)] hidden sm:block"
      >
        💖
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl pointer-events-none select-none opacity-20 hidden md:block"
      >
        ✨
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          
          {/* Col 1: Brand info */}
          <div className="space-y-4 text-center md:text-left">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-500 to-pink-400 text-white flex items-center justify-center font-khaled text-2xl font-bold shadow-lg shadow-pink-600/30 group-hover:scale-105 transition duration-300 border border-pink-300/40">
                Y
              </div>
              <div className="text-left">
                <span className="font-messiri font-bold text-xl block text-white flex items-center gap-1.5">
                  Yarin <span className="text-xs">🌸</span>
                </span>
                <span className="text-xs text-pink-300/80">Your path to excellence in mathematics</span>
              </div>
            </Link>
            <p className="text-xs text-pink-200/80 leading-relaxed max-w-sm">
              An interactive educational platform designed to simplify mathematics coursework with modern, engaging lessons.
            </p>
          </div>

          {/* Col 2: Social media */}
          <div className="space-y-3 text-center">
            <p className="text-xs font-bold text-pink-300 flex items-center justify-center gap-1">
              <span>Follow us on social media</span>
              <span>✨</span>
            </p>
            <div className="flex gap-4 justify-center">
              {SOCIALS.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-11 h-11 rounded-2xl bg-[#2a0f21] hover:bg-pink-900/60 border border-pink-800/80 flex items-center justify-center text-pink-200 hover:text-white transition shadow-md shadow-pink-950/50 hover:scale-105"
                    aria-label={s.name}
                  >
                    <Icon className="w-5 h-5 text-pink-400 hover:text-pink-200" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Col 3: CTA */}
          <div className="space-y-4 text-center md:text-right flex flex-col items-center md:items-end">
            <h3 className="font-messiri font-bold text-lg text-white flex items-center gap-1.5">
              <span>Ready to start learning?</span>
              <span className="text-sm">💗</span>
            </h3>
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-sm shadow-lg shadow-pink-600/30 transition flex items-center gap-2 border border-pink-400/30 hover:scale-105"
            >
              <span>Create Free Account</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        <div className="h-px bg-pink-900/60 w-full" />

      </div>
    </footer>
  )
}
