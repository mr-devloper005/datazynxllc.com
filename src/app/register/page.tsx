import Link from 'next/link'
import { Bookmark, Building2, CheckCircle2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { RegisterForm } from '@/components/auth/register-form'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'
import { cn } from '@/lib/utils'

function registerInputClass(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'visual') return cn('border-white/20 bg-white/10 text-white placeholder:text-slate-400')
  if (kind === 'editorial') return cn('border-[#dcc8b7] bg-[#fffdfa]')
  if (kind === 'curation') return cn('border-[#ddcdbd] bg-[#fffaf4]')
  return cn('border-zinc-200 bg-zinc-50/90 text-zinc-900 placeholder:text-zinc-400')
}

function getRegisterConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'min-h-screen bg-zinc-50 text-zinc-950',
      panel: 'border border-zinc-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]',
      side: 'border border-zinc-200 bg-white shadow-sm',
      muted: 'text-zinc-600',
      action: 'bg-[#e11d8c] text-white hover:bg-[#c9197a]',
      icon: Building2,
      title: 'Hosting that feels as polished as your listing photos',
      body: 'Create a host account to publish spaces, sync calendars, and message guests from one dashboard. Verification steps stay lightweight so you can go live the same day.',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'min-h-screen bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      side: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
      icon: FileText,
      title: 'Start your contributor workspace',
      body: 'Create a profile for essays, issue drafts, editorial review, and publication scheduling.',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'min-h-screen bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      side: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
      icon: ImageIcon,
      title: 'Set up your creator profile',
      body: 'Launch a visual-first account with gallery publishing, identity surfaces, and profile-led discovery.',
    }
  }
  return {
    shell: 'min-h-screen bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    side: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    icon: Bookmark,
    title: 'Create a curator account',
    body: 'Build shelves, save references, and connect collections to your profile without a generic feed setup.',
  }
}

const hostingSteps = [
  { title: 'Tell your story', body: 'Upload hero imagery, amenities, and house rules so expectations are crystal clear before checkout.' },
  { title: 'Tune availability', body: 'Connect calendars, set minimum stays, and automate gentle reminders when guests are about to arrive.' },
  { title: 'Get discovered', body: 'Surface in curated rows, search, and seasonal collections without paying for unrelated ad slots.' },
]

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getRegisterConfig(productKind)
  const Icon = config.icon
  const isDirectory = productKind === 'directory'

  return (
    <div className={config.shell}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div className="space-y-8">
            <div className={`rounded-[1.75rem] p-8 ${config.side}`}>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e11d8c]/10 text-[#e11d8c]">
                  <Icon className="h-6 w-6" />
                </div>
                {isDirectory ? (
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">Hosting</span>
                ) : null}
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{config.title}</h1>
              <p className={`mt-5 max-w-xl text-base leading-relaxed ${config.muted}`}>{config.body}</p>

              {isDirectory ? (
                <ul className="mt-8 space-y-4">
                  {hostingSteps.map((step) => (
                    <li key={step.title} className="flex gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#e11d8c]" />
                      <div>
                        <p className="font-semibold text-zinc-900">{step.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-zinc-600">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-8 grid gap-4">
                  {['Different onboarding per product family', 'No repeated one-size-fits-all shell', 'Profile, publishing, and discovery aligned'].map((item) => (
                    <div key={item} className="rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm">
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isDirectory ? (
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ['4.9★', 'Average host rating'],
                  ['48h', 'Median time to first booking'],
                  ['120+', 'Markets with live inventory'],
                ].map(([stat, label]) => (
                  <div key={label} className="rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-sm">
                    <p className="text-2xl font-semibold text-[#e11d8c]">{stat}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">{label}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className={`rounded-[1.75rem] p-8 sm:p-10 ${config.panel}`}>
            <p className={cn('text-xs font-semibold uppercase tracking-[0.22em]', isDirectory ? 'text-zinc-500' : config.muted)}>Create account</p>
            <p className={cn('mt-2 text-lg font-semibold', isDirectory ? 'text-zinc-900' : 'text-foreground')}>Join as a host or guest</p>
            <p className={cn('mt-2 text-sm', config.muted)}>We will remember you on this device after you sign up.</p>
            <RegisterForm actionClassName={cn('rounded-full', config.action)} inputClassName={registerInputClass(productKind)} />
            <div
              className={cn(
                'mt-8 flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between',
                isDirectory ? 'border-zinc-100' : 'border-border/60',
                config.muted,
              )}
            >
              <span>Already hosting with us?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-[#e11d8c] hover:underline">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
