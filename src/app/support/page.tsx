import Link from 'next/link'
import { Headphones, MessageCircle, Clock, Mail, Shield } from 'lucide-react'
import { MarketingPageLayout, MarketingPrimaryButton, MarketingSecondaryButton } from '@/components/shared/marketing-page-layout'
import { Card, CardContent } from '@/components/ui/card'

const channels = [
  {
    title: 'Priority inbox',
    body: 'Billing, payouts, and trust & safety escalations are routed to a dedicated queue so hosts are not stuck in a generic help tree.',
    icon: Mail,
  },
  {
    title: 'Live chat windows',
    body: 'Peak hours coverage for guests who need quick answers before they confirm a booking—without leaving the listing context.',
    icon: MessageCircle,
  },
  {
    title: 'Phone callbacks',
    body: 'Schedule a callback when you are managing multiple properties or migrating inventory from another platform.',
    icon: Headphones,
  },
]

const commitments = [
  { title: 'First response', detail: 'Under two hours on business days for verified hosts.' },
  { title: 'Resolution target', detail: 'Most payout and calendar issues closed within one business day.' },
  { title: 'Escalation path', detail: 'Clear tiers so urgent incidents reach the right specialist quickly.' },
]

export default function SupportPage() {
  return (
    <MarketingPageLayout
      heroPattern
      eyebrow="Support"
      title="Human support for hosts and guests"
      description="Whether you are troubleshooting a calendar sync or helping a guest before check-in, our team is structured around listings—not a maze of unrelated product areas."
      actions={
        <>
          <MarketingPrimaryButton href="/contact">Open a ticket</MarketingPrimaryButton>
          <MarketingSecondaryButton href="/help">Browse Help Center</MarketingSecondaryButton>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {channels.map((item) => (
          <Card key={item.title} className="border-zinc-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <CardContent className="p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e11d8c]/10 text-[#e11d8c]">
                <item.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-zinc-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div className="rounded-[1.75rem] border border-zinc-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-2 text-[#e11d8c]">
            <Clock className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">Service levels</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900">What you can expect</h3>
          <ul className="mt-6 space-y-5">
            {commitments.map((row) => (
              <li key={row.title} className="border-b border-zinc-100 pb-5 last:border-0 last:pb-0">
                <p className="font-semibold text-zinc-900">{row.title}</p>
                <p className="mt-1 text-sm text-zinc-600">{row.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[1.75rem] border border-zinc-200 bg-zinc-900 p-8 text-zinc-100 shadow-[0_24px_70px_rgba(15,23,42,0.2)]">
          <div className="flex items-center gap-2 text-[#fda4d0]">
            <Shield className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">Trust & safety</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight">Incidents that need a careful hand</h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300">
            For disputes, damage reports, or identity concerns, keep details inside a private ticket. Attach photos, reservation IDs, and timelines so our specialists can
            reconstruct the story without bouncing you between departments.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-[#e11d8c] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c9197a]"
          >
            Start a confidential case
          </Link>
        </div>
      </div>
    </MarketingPageLayout>
  )
}
