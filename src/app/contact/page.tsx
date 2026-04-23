import Link from 'next/link'
import { Building2, Clock, Headphones, Mail, MapPin, MessageSquare, Send } from 'lucide-react'
import { MarketingPageLayout, MarketingPrimaryButton, MarketingSecondaryButton } from '@/components/shared/marketing-page-layout'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const lanes = [
  {
    icon: Building2,
    title: 'Hosting & listings',
    body: 'Questions about publishing a space, calendar sync, pricing rules, or verification. Include your listing URL if you already have a draft.',
  },
  {
    icon: Headphones,
    title: 'Trips & guest help',
    body: 'Before or after a stay: payments, check-in instructions, or cancellations. Add reservation dates and the listing name so we can trace it quickly.',
  },
  {
    icon: MessageSquare,
    title: 'Press & partnerships',
    body: 'Media requests, co-marketing, or integrations. Tell us your audience size and the timeline you are working toward.',
  },
] as const

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <MarketingPageLayout
      heroPattern
      eyebrow="Contact"
      title={`Talk with ${SITE_CONFIG.name}`}
      description="Skip the black hole inbox. Route your note to the right lane—hosts, guests, or partnerships—and we will reply with clear next steps instead of a ticket number and silence."
      actions={
        <>
          <MarketingPrimaryButton href="#contact-form">
            <span className="inline-flex items-center gap-2">
              <Send className="h-4 w-4" />
              Write to us
            </span>
          </MarketingPrimaryButton>
          <MarketingSecondaryButton href="/help">Help Center</MarketingSecondaryButton>
          <MarketingSecondaryButton href="/support">Support</MarketingSecondaryButton>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-1">
            {lanes.map((lane) => (
              <Card key={lane.title} className="border-zinc-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
                <CardContent className="flex gap-4 p-5 sm:p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e11d8c]/10 text-[#e11d8c]">
                    <lane.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900">{lane.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">{lane.body}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-zinc-200 bg-zinc-900 text-zinc-100 shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
            <CardContent className="space-y-4 p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fda4d0]">Direct lines</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <a href={`mailto:hello@${SITE_CONFIG.domain}`} className="inline-flex items-center gap-2 font-medium text-white hover:text-[#fda4d0]">
                  <Mail className="h-4 w-4 text-[#fda4d0]" />
                  hello@{SITE_CONFIG.domain}
                </a>
                <span className="inline-flex items-center gap-2 text-zinc-400">
                  <MapPin className="h-4 w-4" />
                  Remote-first team
                </span>
              </div>
              <div className="flex items-start gap-2 border-t border-zinc-800 pt-4 text-sm text-zinc-400">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                <span>We read every message in order. Most paths get a first reply within one business day; urgent host or guest issues are prioritized sooner.</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card id="contact-form" className="scroll-mt-24 border-zinc-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">Send a message</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              The more context you share—screenshots, links, dates—the faster we can answer without bouncing you between teams.
            </p>
            <form className="mt-6 grid gap-4" action="#" method="post">
              <div>
                <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  className="mt-2 h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50/80 px-4 text-sm text-zinc-900 outline-none transition-colors focus-visible:border-[#e11d8c]/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="mt-2 h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50/80 px-4 text-sm text-zinc-900 outline-none transition-colors focus-visible:border-[#e11d8c]/50"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  Topic
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  className="mt-2 h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50/80 px-4 text-sm text-zinc-900 outline-none transition-colors focus-visible:border-[#e11d8c]/50"
                  placeholder="e.g. Payout delay on Maple Ave listing"
                />
              </div>
              <div>
                <label htmlFor="contact-body" className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  Details
                </label>
                <textarea
                  id="contact-body"
                  name="message"
                  rows={6}
                  className="mt-2 min-h-[160px] w-full resize-y rounded-2xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 text-sm text-zinc-900 outline-none transition-colors focus-visible:border-[#e11d8c]/50"
                  placeholder="Include listing links, reservation IDs, what you expected, and what happened instead."
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#e11d8c] px-6 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(225,29,140,0.28)] transition-colors hover:bg-[#c9197a]"
              >
                Send message
              </button>
              <p className="text-center text-xs text-zinc-500">
                Prefer self-serve?{' '}
                <Link href="/help" className="font-semibold text-[#e11d8c] hover:underline">
                  Browse guides
                </Link>{' '}
                or{' '}
                <Link href="/support" className="font-semibold text-[#e11d8c] hover:underline">
                  open a support case
                </Link>
                .
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </MarketingPageLayout>
  )
}
