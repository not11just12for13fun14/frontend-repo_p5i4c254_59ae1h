import React, { useEffect, useMemo, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LogIn, UserPlus, Flame, Github, Trophy, Upload, Home, Users, BarChart2 } from 'lucide-react'
import Spline from '@splinetool/react-spline'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function GlowButton({ children, icon: Icon, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium text-white transition ${className}`}
      {...props}
    >
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 opacity-80 blur-md"></span>
      <span className="absolute inset-[2px] rounded-xl bg-zinc-900/80 backdrop-blur-xl ring-1 ring-white/10" />
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon size={18} />}
        {children}
      </span>
    </motion.button>
  )
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(56,189,248,.15),transparent),radial-gradient(800px_400px_at_10%_-10%,rgba(167,139,250,.18),transparent)] text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <Flame className="text-fuchsia-400" />
            <span className="bg-gradient-to-r from-fuchsia-400 to-indigo-400 bg-clip-text text-xl font-semibold text-transparent">CodeSync DSA Tracker</span>
          </Link>
          <nav className="hidden gap-2 sm:flex">
            <NavLink to="/" icon={Home}>Home</NavLink>
            <NavLink to="/dashboard" icon={BarChart2}>Dashboard</NavLink>
            <NavLink to="/upload" icon={Upload}>Upload</NavLink>
            <NavLink to="/peers" icon={Users}>Peers</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login"><GlowButton icon={LogIn}>Login</GlowButton></Link>
            <Link to="/signup"><GlowButton icon={UserPlus} className="hidden sm:inline-flex">Sign up</GlowButton></Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}

function NavLink({ to, icon: Icon, children }) {
  return (
    <Link to={to} className="relative overflow-hidden rounded-lg px-3 py-2 text-sm text-zinc-300 transition hover:text-white">
      <span className="absolute inset-0 -z-10 rounded-lg bg-white/5 opacity-0 backdrop-blur-sm transition group-hover:opacity-100"></span>
      <span className="inline-flex items-center gap-2"><Icon size={16} />{children}</span>
    </Link>
  )
}

function Hero() {
  return (
    <section className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-2">
      <div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-fuchsia-400 to-indigo-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
          Track your DSA journey with style.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-4 max-w-xl text-zinc-400">
          A futuristic dashboard with streaks, topic progress, and GitHub auto-commits. Built for developers.
        </motion.p>
        <div className="mt-6 flex gap-3">
          <Link to="/signup"><GlowButton icon={UserPlus}>Get started</GlowButton></Link>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <GlowButton icon={Github} className="bg-gradient-to-r from-zinc-700 to-zinc-800">GitHub</GlowButton>
          </a>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
        className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 shadow-2xl">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" />
      </motion.div>
    </section>
  )
}

function GlassCard({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  )
}

function ProgressRing({ value }) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const stroke = useMemo(() => circumference - (value / 100) * circumference, [value])
  return (
    <svg width="100" height="100" className="drop-shadow-[0_0_20px_rgba(167,139,250,0.35)]">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r={radius} stroke="#232323" strokeWidth="10" fill="transparent" />
      <motion.circle
        cx="50" cy="50" r={radius}
        stroke="url(#grad)" strokeWidth="10" fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={stroke}
        strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: stroke }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
    </svg>
  )
}

function Quote() {
  const [quote, setQuote] = useState('Loading inspiration...')
  useEffect(() => {
    const qs = [
      'Small progress each day adds up to big results.',
      'Consistency beats intensity.',
      'Solve one more problem than yesterday.',
      'Focus on the process, the results will follow.'
    ]
    const q = qs[Math.floor(Math.random() * qs.length)]
    const t = setTimeout(() => setQuote(q), 400)
    return () => clearTimeout(t)
  }, [])
  return (
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-zinc-400">{quote}</motion.p>
  )
}

function Dashboard() {
  const [data, setData] = useState(null)
  useEffect(() => {
    const uid = localStorage.getItem('uid')
    if (!uid) return
    fetch(`${API}/api/dashboard/${uid}`).then(r => r.json()).then(setData).catch(() => {})
  }, [])

  const streak = data?.user?.streak || 0
  const topics = data?.user?.topics || { arrays: 2, dp: 1, graphs: 1 }
  const solved = data?.user?.total_solved || 0

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard className="md:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Welcome back</h2>
              <Quote />
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-wider text-zinc-400">Streak</div>
              <div className="flex items-center gap-2 text-2xl font-semibold"><Flame className="text-orange-400" /> {streak} days</div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-6">
            <ProgressRing value={Math.min(100, streak * 5)} />
            <div>
              <p className="text-zinc-400">Consistency Meter</p>
              <div className="mt-2 h-3 w-56 overflow-hidden rounded-full bg-white/10">
                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, streak * 5)}%` }}
                  className="h-full bg-gradient-to-r from-fuchsia-500 to-indigo-500" />
              </div>
            </div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="text-sm text-zinc-400">Total solved</div>
          <div className="mt-1 text-4xl font-bold">{solved}</div>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {Object.entries(topics).map(([k, v]) => (
          <GlassCard key={k}>
            <div className="flex items-center justify-between">
              <div className="text-zinc-300 capitalize">{k}</div>
              <Trophy className="text-amber-400" />
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, v * 10)}%` }}
                className="h-full bg-gradient-to-r from-indigo-500 to-sky-500" />
            </div>
            <div className="mt-2 text-xs text-zinc-400">Solved {v}</div>
          </GlassCard>
        ))}
      </div>
    </main>
  )
}

function Input({ label, ...props }) {
  return (
    <label className="group relative block">
      <span className="mb-2 block text-sm text-zinc-400">{label}</span>
      <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 opacity-0 blur-xl transition group-focus-within:opacity-100" />
      <input {...props} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none ring-0 backdrop-blur-xl transition focus:border-white/20" />
    </label>
  )
}

function AuthPage({ mode }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login'
      const res = await fetch(`${API}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed')
      localStorage.setItem('token', data.token)
      localStorage.setItem('uid', data.user._id)
      navigate('/dashboard')
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-2">
      <div>
        <h2 className="bg-gradient-to-r from-fuchsia-400 to-indigo-400 bg-clip-text text-4xl font-bold text-transparent">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h2>
        <p className="mt-2 text-zinc-400">Glowing gradients, floating inputs, secure auth.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {mode === 'signup' && (
            <Input label="Name" placeholder="Ada Lovelace" value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} />
          )}
          <Input label="Email" type="email" placeholder="you@codesync.dev" value={form.email} onChange={(e)=>setForm({ ...form, email: e.target.value })} />
          <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={(e)=>setForm({ ...form, password: e.target.value })} />
          <div className="flex gap-3">
            <GlowButton type="submit" className="px-5">{loading ? 'Please wait…' : (mode === 'signup' ? 'Sign up' : 'Login')}</GlowButton>
            <Link to={mode === 'signup' ? '/login' : '/signup'} className="text-sm text-zinc-400 underline">{mode === 'signup' ? 'Have an account? Login' : 'New here? Sign up'}</Link>
          </div>
        </form>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 shadow-2xl">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" />
      </motion.div>
    </main>
  )
}

function UploadPage() {
  const [form, setForm] = useState({ problem_name: '', topic: '', difficulty: 'Easy', date: new Date().toISOString().slice(0,10), notes: '', code: '' })
  const [toast, setToast] = useState(null)
  const uid = localStorage.getItem('uid')

  const submit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API}/api/upload/${uid}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const data = await res.json()
    if (data.ok) {
      setToast('Uploaded successfully!')
      setTimeout(()=>setToast(null), 2500)
    } else {
      alert('Upload failed')
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <GlassCard>
        <h2 className="text-xl font-semibold">Daily Upload</h2>
        <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
          <Input label="Problem Name" value={form.problem_name} onChange={(e)=>setForm({ ...form, problem_name: e.target.value })} />
          <Input label="Topic" value={form.topic} onChange={(e)=>setForm({ ...form, topic: e.target.value })} />
          <Input label="Difficulty" value={form.difficulty} onChange={(e)=>setForm({ ...form, difficulty: e.target.value })} />
          <Input label="Date" type="date" value={form.date} onChange={(e)=>setForm({ ...form, date: e.target.value })} />
          <label className="md:col-span-2">
            <span className="mb-2 block text-sm text-zinc-400">Notes / Code (Markdown)</span>
            <textarea rows={8} value={form.notes} onChange={(e)=>setForm({ ...form, notes: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder-zinc-500 outline-none" />
          </label>
          <div className="md:col-span-2">
            <GlowButton type="submit" icon={Upload}>Upload & Commit</GlowButton>
          </div>
        </form>
      </GlassCard>
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-emerald-500/30 bg-emerald-600/20 px-4 py-3 text-emerald-200 backdrop-blur-xl">
            ✅ {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function PeersPage() {
  const [data, setData] = useState([])
  useEffect(()=>{ fetch(`${API}/api/peers`).then(r=>r.json()).then(d=>setData(d.users||[])) },[])
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="mb-4 text-xl font-semibold">Peers</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.map(u=> (
          <GlassCard key={u._id}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{u.name}</div>
                <div className="text-xs text-zinc-400">{u.email}</div>
              </div>
              <Trophy className="text-amber-400" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm text-zinc-400">
              <div><div className="text-lg text-white">{u.streak||0}</div>Streak</div>
              <div><div className="text-lg text-white">{u.total_solved||0}</div>Solved</div>
              <div><div className="text-lg text-white">{u.last_commit_at? new Date(u.last_commit_at).toLocaleDateString(): '-'}</div>Last Commit</div>
            </div>
          </GlassCard>
        ))}
      </div>
    </main>
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <Dashboard />
    </>
  )
}

export default function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/peers" element={<PeersPage />} />
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/signup" element={<AuthPage mode="signup" />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  )
}
