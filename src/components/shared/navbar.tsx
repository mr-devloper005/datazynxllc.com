'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, ChevronRight, Sparkles, Plus, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { NAVBAR_OVERRIDE_ENABLED, NavbarOverride } from '@/overrides/navbar'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-slate-200/80 bg-white/88 text-slate-950 backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    active: 'bg-slate-950 text-white',
    idle: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
    cta: 'rounded-full bg-slate-950 text-white hover:bg-slate-800',
    mobile: 'border-t border-slate-200/70 bg-white/95',
  },
  'editorial-bar': {
    shell: 'border-b border-[#d7c4b3] bg-[#fff7ee]/90 text-[#2f1d16] backdrop-blur-xl',
    logo: 'rounded-full border border-[#dbc6b6] bg-white shadow-sm',
    active: 'bg-[#2f1d16] text-[#fff4e4]',
    idle: 'text-[#72594a] hover:bg-[#f2e5d4] hover:text-[#2f1d16]',
    cta: 'rounded-full bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
    mobile: 'border-t border-[#dbc6b6] bg-[#fff7ee]',
  },
  'floating-bar': {
    shell: 'border-b border-transparent bg-transparent text-white',
    logo: 'rounded-[1.35rem] border border-white/12 bg-white/8 shadow-[0_16px_48px_rgba(15,23,42,0.22)] backdrop-blur',
    active: 'bg-[#8df0c8] text-[#07111f]',
    idle: 'text-slate-200 hover:bg-white/10 hover:text-white',
    cta: 'rounded-full bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    mobile: 'border-t border-white/10 bg-[#09101d]/96',
  },
  'utility-bar': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/94 text-[#1f2617] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white shadow-sm',
    active: 'bg-[#1f2617] text-[#edf5dc]',
    idle: 'text-[#56604b] hover:bg-[#e7edd9] hover:text-[#1f2617]',
    cta: 'rounded-lg bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

const directoryPalette = {
  'directory-clean': {
    shell: 'border-b border-zinc-200/80 bg-white/95 text-zinc-950 shadow-[0_8px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl',
    logo: 'rounded-2xl border border-zinc-200 bg-zinc-50',
    nav: 'text-zinc-500 hover:text-zinc-950',
    search: 'border border-zinc-200 bg-zinc-50 text-zinc-600',
    cta: 'rounded-full bg-zinc-900 text-white hover:bg-zinc-800',
    post: 'border border-zinc-200 bg-white text-zinc-950 hover:bg-zinc-50',
    mobile: 'border-t border-zinc-200 bg-white',
  },
  'market-utility': {
    shell: 'border-b border-zinc-200/80 bg-white/95 text-zinc-950 shadow-[0_8px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl',
    logo: 'rounded-2xl border border-zinc-200 bg-white shadow-sm',
    nav: 'text-zinc-500 hover:text-zinc-950',
    search: 'border border-zinc-200 bg-zinc-50 text-zinc-600',
    cta: 'rounded-full bg-zinc-900 text-white hover:bg-zinc-800',
    post: 'border border-zinc-200 bg-white text-zinc-950 hover:bg-zinc-50',
    mobile: 'border-t border-zinc-200 bg-zinc-50',
  },
} as const

const listingNavPills = [
  { label: 'Browse', href: '/listings', match: (p: string) => p.startsWith('/listings') },
  { label: 'Discover', href: '/search', match: (p: string) => p.startsWith('/search') },
  { label: 'List a space', href: '/register', match: (p: string) => p.startsWith('/register') },
] as const

export function Navbar() {
  if (NAVBAR_OVERRIDE_ENABLED) {
    return <NavbarOverride />
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const navigation = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'), [])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === recipe.primaryTask && task.enabled) || primaryNavigation[0]
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'

  if (isDirectoryProduct) {
    const palette = directoryPalette[(recipe.brandPack === 'market-utility' ? 'market-utility' : 'directory-clean') as keyof typeof directoryPalette]

    return (
      <header className={cn('sticky top-0 z-50 w-full', palette.shell)}>
        <nav className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-3 lg:gap-6">
            <Link href="/" className="flex shrink-0 items-center gap-2.5 sm:gap-3">
              <div className="relative">
                <div className={cn('flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl p-1 sm:h-12 sm:w-12', palette.logo)}>
                  <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
                </div>
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#e11d8c] text-[9px] font-bold text-white shadow-sm" aria-hidden>
                  ×
                </span>
              </div>
              <div className="min-w-0 hidden sm:block">
                <span className="block truncate text-lg font-semibold tracking-tight sm:text-xl">{SITE_CONFIG.name}</span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">{siteContent.navbar.tagline}</span>
              </div>
            </Link>

            <div className="hidden min-w-0 flex-1 justify-center md:flex">
              <div className="inline-flex items-center gap-0.5 rounded-full bg-zinc-100/90 p-1 ring-1 ring-zinc-200/60">
                {listingNavPills.map((pill) => {
                  const active = pill.match(pathname)
                  return (
                    <Link
                      key={pill.href}
                      href={pill.href}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                        active ? 'bg-[#e11d8c] text-white shadow-sm' : 'text-zinc-600 hover:bg-white/80 hover:text-zinc-900',
                      )}
                    >
                      {pill.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Button variant="ghost" size="icon" className="hidden rounded-full text-zinc-500 hover:text-zinc-900 md:flex" asChild>
              <Link href="/search" aria-label="Search and region">
                <Globe className="h-5 w-5" />
              </Link>
            </Button>

            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" asChild className={cn('rounded-full px-5 font-semibold', palette.cta)}>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild className="rounded-full border border-zinc-200 bg-white px-4 font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50">
                  <Link href="/register">
                    <Plus className="mr-1 h-4 w-4" />
                    Post listing
                  </Link>
                </Button>
              </div>
            )}

            <Button variant="ghost" size="icon" className="rounded-full md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menu">
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        <div className="mx-auto hidden max-w-7xl px-4 pb-4 sm:px-6 md:block lg:px-8">
          <div className="flex items-center gap-3 rounded-[1.75rem] border border-zinc-200/80 bg-white py-2.5 pl-5 pr-2.5 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <Link href="/search" className="min-w-0 flex-1 basis-[140px] truncate font-medium text-zinc-400 transition-colors hover:text-zinc-700">
                Where are you going?
              </Link>
              <span className="hidden h-8 w-px shrink-0 bg-zinc-200 lg:block" aria-hidden />
              <Link href="/search" className="hidden shrink-0 text-zinc-400 transition-colors hover:text-zinc-700 lg:inline">
                Check in
              </Link>
              <Link href="/search" className="hidden shrink-0 text-zinc-400 transition-colors hover:text-zinc-700 lg:inline">
                Check out
              </Link>
              <Link href="/search" className="hidden shrink-0 text-zinc-400 transition-colors hover:text-zinc-700 lg:inline">
                Guests
              </Link>
            </div>
            <Button size="icon" className="h-12 w-12 shrink-0 rounded-full bg-[#e11d8c] text-white hover:bg-[#c9197a]" asChild>
              <Link href="/search" aria-label="Search listings">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={palette.mobile}>
            <div className="space-y-2 px-4 py-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {listingNavPills.map((pill) => {
                  const active = pill.match(pathname)
                  return (
                    <Link
                      key={pill.href}
                      href={pill.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-semibold',
                        active ? 'bg-[#e11d8c] text-white' : 'border border-zinc-200 bg-white text-zinc-700',
                      )}
                    >
                      {pill.label}
                    </Link>
                  )
                })}
              </div>
              <Link
                href="/search"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn('mb-3 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium', palette.search)}
              >
                <Search className="h-4 w-4" />
                Search spaces and listings
              </Link>
              {mobileNavigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? 'bg-foreground text-background' : palette.post)}>
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'
  const isEditorial = recipe.navbar === 'editorial-bar'
  const isUtility = recipe.navbar === 'utility-bar'

  return (
    <header className={cn('sticky top-0 z-50 w-full', style.shell)}>
      <nav className={cn('mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8', isFloating ? 'h-24 pt-4' : 'h-20')}>
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-7">
          <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-2">
            <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden p-1.5', style.logo)}>
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
              <span className="hidden text-[10px] uppercase tracking-[0.28em] opacity-70 sm:block">{siteContent.navbar.tagline}</span>
            </div>
          </Link>

          {isEditorial ? (
            <div className="hidden min-w-0 flex-1 items-center gap-4 xl:flex">
              <div className="h-px flex-1 bg-[#d8c8bb]" />
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold uppercase tracking-[0.18em] transition-colors', isActive ? 'text-[#2f1d16]' : 'text-[#7b6254] hover:text-[#2f1d16]')}>
                    {task.label}
                  </Link>
                )
              })}
              <div className="h-px flex-1 bg-[#d8c8bb]" />
            </div>
          ) : isFloating ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          ) : isUtility ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {primaryTask && (recipe.navbar === 'utility-bar' || recipe.navbar === 'floating-bar') ? (
            <Link href={primaryTask.route} className="hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-80 md:inline-flex">
              <Sparkles className="h-3.5 w-3.5" />
              {primaryTask.label}
            </Link>
          ) : null}

          <Button variant="ghost" size="icon" asChild className="hidden rounded-full md:flex">
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className={style.cta}>
                <Link href="/register">{isEditorial ? 'Subscribe' : isUtility ? 'Post Now' : 'Get Started'}</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isFloating && primaryTask ? (
        <div className="mx-auto hidden max-w-7xl px-4 pb-3 sm:px-6 lg:block lg:px-8">
          <Link href={primaryTask.route} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur hover:bg-white/12">
            Featured surface
            <span>{primaryTask.label}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}

      {isMobileMenuOpen && (
        <div className={style.mobile}>
          <div className="space-y-2 px-4 py-4">
            <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="mb-3 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground">
              <Search className="h-4 w-4" />
              Search the site
            </Link>
            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
