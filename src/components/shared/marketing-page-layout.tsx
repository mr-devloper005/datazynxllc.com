import type { ReactNode } from 'react'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { cn } from '@/lib/utils'

const accent = 'text-[#e11d8c]'

type MarketingPageLayoutProps = {
  eyebrow?: string
  title: string
  description: string
  actions?: ReactNode
  children: ReactNode
  /** Optional subtle pattern behind hero */
  heroPattern?: boolean
}

export function MarketingPageLayout({ eyebrow, title, description, actions, children, heroPattern }: MarketingPageLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-zinc-200 bg-white">
          {heroPattern ? (
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              aria-hidden
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 20%, rgba(225,29,140,0.08), transparent 40%), radial-gradient(circle at 80% 0%, rgba(24,24,27,0.04), transparent 35%)',
              }}
            />
          ) : null}
          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-4xl lg:text-left">
              {eyebrow ? (
                <p className={cn('text-xs font-semibold uppercase tracking-[0.22em]', accent)}>{eyebrow}</p>
              ) : null}
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">{title}</h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 lg:mx-0 lg:text-lg">{description}</p>
              {actions ? <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">{actions}</div> : null}
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export function MarketingPrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-[#e11d8c] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(225,29,140,0.28)] transition-colors hover:bg-[#c9197a]"
    >
      {children}
    </Link>
  )
}

export function MarketingSecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 shadow-sm transition-colors hover:bg-zinc-50"
    >
      {children}
    </Link>
  )
}
