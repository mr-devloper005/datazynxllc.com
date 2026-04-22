import Link from 'next/link'
import { MapPin, Clock, Briefcase, Heart, Zap, Users } from 'lucide-react'
import { MarketingPageLayout, MarketingPrimaryButton, MarketingSecondaryButton } from '@/components/shared/marketing-page-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

const roles = [
  {
    title: 'Senior marketplace designer',
    location: 'Remote (US)',
    type: 'Full-time',
    level: 'Senior',
    blurb: 'Own listing detail, search results, and host onboarding flows end-to-end with a bias toward photography and clarity.',
  },
  {
    title: 'Full-stack engineer — discovery',
    location: 'Hybrid · Austin',
    type: 'Full-time',
    level: 'Mid',
    blurb: 'Ship fast search, ranking experiments, and resilient APIs that keep listings feeling instant on mobile networks.',
  },
  {
    title: 'Trust & safety specialist',
    location: 'Remote · EU-friendly',
    type: 'Full-time',
    level: 'Mid',
    blurb: 'Investigate escalations, refine playbooks, and partner with support so hosts and guests feel heard quickly.',
  },
  {
    title: 'Content strategist, host education',
    location: 'Remote',
    type: 'Contract',
    level: 'Lead',
    blurb: 'Produce guides, release notes, and in-product copy that teach hosting best practices without sounding like legalese.',
  },
] as const

const values = [
  { title: 'Guest clarity first', body: 'If a flow confuses a first-time booker, we rewrite it—even when that means more engineering work.', icon: Users },
  { title: 'Hosts as partners', body: 'Revenue follows trust. We prioritize tools that protect calendars, payouts, and reputations.', icon: Heart },
  { title: 'Craft at speed', body: 'Weekly releases with tight QA loops so improvements reach real listings, not slide decks.', icon: Zap },
]

export default function CareersPage() {
  return (
    <MarketingPageLayout
      heroPattern
      eyebrow="Careers"
      title={`Build the next chapter of ${SITE_CONFIG.name}`}
      description="We are a small team obsessed with listings: how they look in search, how hosts describe them, and how guests decide in minutes. If that sounds like your kind of product surface, you will fit right in."
      actions={
        <>
          <MarketingPrimaryButton href="/contact">Introduce yourself</MarketingPrimaryButton>
          <MarketingSecondaryButton href="/help">Read how we work</MarketingSecondaryButton>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {values.map((v) => (
          <Card key={v.title} className="border-zinc-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            <CardContent className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e11d8c]/10 text-[#e11d8c]">
                <v.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-zinc-900">{v.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{v.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e11d8c]">Open roles</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">Positions we are hiring for now</h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600">Every role touches listings in some way—design, infra, or human support. Tell us which posting matches your recent work.</p>
          </div>
          <Badge className="w-fit rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">Updated weekly</Badge>
        </div>

        <div className="mt-8 space-y-4">
          {roles.map((role) => (
            <Card key={role.title} className="border-zinc-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_22px_60px_rgba(15,23,42,0.1)]">
              <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="rounded-full bg-[#e11d8c]/10 text-[#c9197a] hover:bg-[#e11d8c]/15">{role.level}</Badge>
                    <Badge variant="outline" className="rounded-full border-zinc-200">
                      {role.type}
                    </Badge>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-zinc-900">{role.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-zinc-500">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-zinc-400" />
                      {role.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4 text-zinc-400" />
                      Rolling interviews
                    </span>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">{role.blurb}</p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:border-[#e11d8c]/40 hover:text-[#e11d8c]"
                >
                  <Briefcase className="h-4 w-4" />
                  Apply
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-[1.75rem] border border-zinc-200 bg-gradient-to-r from-zinc-900 to-zinc-800 p-8 text-center text-zinc-100 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#fda4d0]">Not seeing a match?</p>
        <h3 className="mt-3 text-2xl font-semibold">Send a portfolio anyway</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-300">
          We invent roles for people who show exceptional taste in marketplace UX, photography, or operations. Pitch us a project you shipped that made listings easier to trust.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <MarketingPrimaryButton href="/contact">Share your work</MarketingPrimaryButton>
        </div>
      </div>
    </MarketingPageLayout>
  )
}
