import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Sun,
  Moon,
  LogIn,
  LogOut,
  UserPlus,
  FileText,
  Home,
  User,
  BookOpen,
  ChevronDown,
  Library,
  Sparkles,
  Heart,
  Ribbon,
  Star,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { YEARS } from '../data/dummyData'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Dark mode
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const [session, setSession] = useState(null)
  const [userName, setUserName] = useState('')
  const [checkingSession, setCheckingSession] = useState(true)

  // Lessons menu
  const [lessonsMenuOpen, setLessonsMenuOpen] = useState(false)
  const [mobileLessonsOpen, setMobileLessonsOpen] = useState(false)

  const lessonsMenuRef = useRef(null)

  const location = useLocation()
  const navigate = useNavigate()

  // Dark mode side effect
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  // Close menus on route change
  useEffect(() => {
    setOpen(false)
    setLessonsMenuOpen(false)
    setMobileLessonsOpen(false)
  }, [location.pathname])

  // Close lessons dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        lessonsMenuRef.current &&
        !lessonsMenuRef.current.contains(e.target)
      ) {
        setLessonsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Supabase Auth Session
  useEffect(() => {
    const loadSession = async (currentSession) => {
      setSession(currentSession)

      if (currentSession) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', currentSession.user.id)
          .single()

        setUserName(profile?.full_name || currentSession.user.email)
      } else {
        setUserName('')
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      loadSession(session)
      setCheckingSession(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      loadSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path
  const isYearActive = location.pathname.startsWith('/years/')
  const isBooksActive = location.pathname.startsWith('/books')

  return (
    <nav className="navbar z-50 sticky top-2 smooth bg-[#2a0f21]/90 text-[#fce4ec] mx-3 rounded-2xl shadow-xl border border-pink-900/60 backdrop-blur-md relative overflow-hidden">
      
      {/* Animated Background Decorative Stickers */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-2 left-16 text-lg pointer-events-none select-none drop-shadow-[0_0_8px_rgba(216,27,96,0.8)] hidden sm:block"
      >
        💖
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-2 right-48 text-lg pointer-events-none select-none drop-shadow-[0_0_8px_rgba(255,64,129,0.8)] hidden sm:block"
      >
        ✨
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        <div className="relative flex items-center justify-between h-full">

          {/* =====================================================
              BRAND (LEFT SIDE)
          ====================================================== */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-500 to-pink-400 text-white flex items-center justify-center font-khaled text-xl shadow-lg shadow-pink-600/30 group-hover:scale-105 transition duration-300 border border-pink-300/40">
                Y
              </div>

              <div className="flex flex-col text-left">
                <span className="font-messiri font-bold text-lg sm:text-xl leading-tight text-white flex items-center gap-1">
                  Yarin <span className="text-xs">🌸</span>
                </span>
                <span className="text-xs text-pink-300/80 font-ibm">
                  Mathematics Platform
                </span>
              </div>
            </Link>

            {/* =====================================================
                DESKTOP NAVIGATION LINKS
            ====================================================== */}
            <div className="hidden md:flex items-center gap-1 ml-6 font-ibm text-sm font-bold">
              {/* HOME */}
              <Link
                to="/"
                className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                  isActive('/')
                    ? 'bg-pink-900/80 text-white shadow-inner border border-pink-700/50'
                    : 'text-pink-200/90 hover:bg-pink-900/40 hover:text-white'
                }`}
              >
                <Home className="w-4 h-4 text-pink-400" />
                <span>Home</span>
              </Link>

              {/* LESSONS DROPDOWN */}
              <div className="relative" ref={lessonsMenuRef}>
                <button
                  onClick={() => setLessonsMenuOpen((v) => !v)}
                  className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                    isYearActive
                      ? 'bg-pink-900/80 text-white shadow-inner border border-pink-700/50'
                      : 'text-pink-200/90 hover:bg-pink-900/40 hover:text-white'
                  }`}
                  aria-expanded={lessonsMenuOpen}
                >
                  <BookOpen className="w-4 h-4 text-pink-400" />
                  <span>Lessons</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-pink-300 transition-transform ${
                      lessonsMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {lessonsMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full mt-2 left-0 w-64 bg-[#2a0f21] rounded-2xl shadow-2xl border border-pink-800/80 p-2 text-pink-100 z-50 max-h-80 overflow-y-auto"
                    >
                      {YEARS.map((y) => (
                        <Link
                          key={y.id}
                          to={`/years/${y.id}`}
                          className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold hover:bg-pink-900/60 transition"
                        >
                          <span>{y.title}</span>
                          {y.badge && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-950 border border-pink-700/60 text-pink-300">
                              {y.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* BOOKS */}
              <Link
                to="/books"
                className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                  isBooksActive
                    ? 'bg-pink-900/80 text-white shadow-inner border border-pink-700/50'
                    : 'text-pink-200/90 hover:bg-pink-900/40 hover:text-white'
                }`}
              >
                <Library className="w-4 h-4 text-pink-400" />
                <span>Books</span>
              </Link>

              {/* PREVIOUS EXAMS */}
              <Link
                to="/exams"
                className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                  isActive('/exams')
                    ? 'bg-pink-900/80 text-white shadow-inner border border-pink-700/50'
                    : 'text-pink-200/90 hover:bg-pink-900/40 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4 text-pink-400" />
                <span>Past Exams</span>
              </Link>
            </div>
          </div>

          {/* =====================================================
              DESKTOP RIGHT SIDE (DARK MODE & AUTH)
          ====================================================== */}
          <div className="hidden md:flex items-center gap-3">
            {/* DARK MODE TOGGLE */}
            <button
              onClick={() => setDark((v) => !v)}
              className="py-2 px-3 rounded-xl bg-pink-950/80 hover:bg-pink-900/80 border border-pink-800/60 text-pink-200 text-xs font-bold flex items-center gap-1.5 transition"
              aria-label="Toggle Theme"
            >
              {dark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-300" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-pink-300" />
                  <span>Dark</span>
                </>
              )}
            </button>

            {/* AUTH BUTTONS */}
            {checkingSession ? null : session ? (
              <>
                <div className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 bg-pink-950/80 border border-pink-800/60 text-pink-200 max-w-[160px]">
                  <User className="w-4 h-4 text-pink-400 shrink-0" />
                  <span className="truncate">{userName}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white shadow-md transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 bg-pink-950/80 border border-pink-700 hover:bg-pink-900 text-pink-100 shadow transition"
                >
                  <UserPlus className="w-4 h-4 text-pink-400" />
                  <span>Sign Up</span>
                </Link>

                <Link
                  to="/login"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white shadow-lg shadow-pink-600/30 transition border border-pink-400/30"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              </>
            )}
          </div>

          {/* =====================================================
              MOBILE BUTTONS
          ====================================================== */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setDark((v) => !v)}
              className="inline-flex items-center p-2 rounded-xl bg-pink-950/80 border border-pink-800/60 text-pink-200"
              aria-label="Toggle Theme"
            >
              {dark ? (
                <Sun className="w-5 h-5 text-amber-300" />
              ) : (
                <Moon className="w-5 h-5 text-pink-300" />
              )}
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-pink-100 hover:bg-pink-900/50 transition"
              aria-expanded={open}
              aria-label="Menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* =====================================================
          MOBILE DRAWER
      ====================================================== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-pink-900/60 px-4 pt-3 pb-5 flex flex-col gap-2 font-ibm bg-[#2a0f21]"
          >
            {/* HOME */}
            <Link
              to="/"
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-pink-100 hover:bg-pink-900/50 flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-pink-400" />
              <span>Home</span>
            </Link>

            {/* MOBILE LESSONS DROPDOWN */}
            <div>
              <button
                onClick={() => setMobileLessonsOpen((v) => !v)}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-pink-100 hover:bg-pink-900/50 flex items-center justify-between gap-2"
                aria-expanded={mobileLessonsOpen}
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-pink-400" />
                  <span>Lessons</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-pink-300 transition-transform ${
                    mobileLessonsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {mobileLessonsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-6 flex flex-col gap-1 mt-1 overflow-hidden"
                  >
                    {YEARS.map((y) => (
                      <Link
                        key={y.id}
                        to={`/years/${y.id}`}
                        className="px-4 py-2 rounded-lg text-xs font-bold text-pink-200/90 hover:bg-pink-900/60 transition"
                      >
                        {y.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* MOBILE BOOKS */}
            <Link
              to="/books"
              className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
                isBooksActive
                  ? 'bg-pink-900/60 text-white'
                  : 'text-pink-100 hover:bg-pink-900/50'
              }`}
            >
              <Library className="w-4 h-4 text-pink-400" />
              <span>Books</span>
            </Link>

            {/* MOBILE EXAMS */}
            <Link
              to="/exams"
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-pink-100 hover:bg-pink-900/50 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-pink-400" />
              <span>Past Exams</span>
            </Link>

            {/* MOBILE AUTH */}
            <div className="pt-2 border-t border-pink-900/60 flex flex-col gap-2">
              {checkingSession ? null : session ? (
                <>
                  <div className="px-4 py-2.5 rounded-xl text-sm font-bold text-center bg-pink-950/80 border border-pink-800 text-pink-200 flex items-center justify-center gap-2">
                    <User className="w-4 h-4 text-pink-400" />
                    <span className="truncate">{userName}</span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold text-center bg-rose-700 text-white flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-4 py-2.5 rounded-xl text-sm font-bold text-center bg-pink-950 border border-pink-700 text-white flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4 text-pink-400" />
                    <span>Sign Up</span>
                  </Link>

                  <Link
                    to="/login"
                    className="px-4 py-2.5 rounded-xl text-sm font-bold text-center bg-gradient-to-r from-pink-600 to-rose-600 text-white flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
