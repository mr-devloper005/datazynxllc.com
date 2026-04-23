import Link from 'next/link'
import { BookOpen, CalendarRange, Camera, CreditCard, Search, Sparkles } from 'lucide-react'
import { MarketingPageLayout, MarketingPrimaryButton, MarketingSecondaryButton } from '@/components/shared/marketing-page-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const helpFaqs = [
  {
    id: 'list-photos',
    question: 'How many photos should a listing include?',
    answer: 'Lead with a wide hero shot of the main space, then add detail angles, amenities, and the neighborhood. Most successful hosts upload at least twelve images.',
  },
  {
    id: 'list-calendar',
    question: 'Can I block dates on short notice?',
    answer: 'Yes. Open your calendar from the dashboard, select the nights to hold, and guests will instantly see the space as unavailable.',
  },
  {
    id: 'list-payout',
    question: 'When do payouts arrive?',
    answer: 'Funds typically release after check-in according to your payout method. You can download statements anytime from the billing area in settings.',
  },
  {
    id: 'list-search',
    question: 'Why is my listing not appearing in search?',
    answer: 'Confirm your listing is published, pricing is set, and location pins are accurate. Incomplete profiles are ranked lower until required fields are finished.',
  },
] as const

const guides = [
  {
    title: 'Publish a standout listing',
    description: 'Cover photos, titles, and amenity tags that help guests compare spaces in seconds.',
    icon: Camera,
  },
  {
    title: 'Calendars, pricing, and rules',
    description: 'Keep availability honest, sync external calendars, and set clear house rules up front.',
    icon: CalendarRange,
  },
  {
    title: 'Search like a guest',
    description: 'Use filters, map pins, and saved shortlists the same way travelers do before they book.',
    icon: Search,
  },
  {
    title: 'Payouts and receipts',
    description: 'Understand when funds move, how statements look, and where to export for accounting.',
    icon: CreditCard,
  },
]

export default function HelpPage() {
  return (
    <MarketingPageLayout
      heroPattern
      eyebrow="Help Center"
      title="Guides built around listings—not generic docs"
      description="Every article here assumes you are hosting, traveling, or managing inventory on a marketplace. Skip the noise and jump straight to workflows that match how the product actually behaves."
      actions={
        <>
          <MarketingPrimaryButton href="/support">Contact support</MarketingPrimaryButton>
          <MarketingSecondaryButton href="/listings">Browse listings</MarketingSecondaryButton>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {guides.map((g) => (
          <Card key={g.title} className="border-zinc-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
            <CardContent className="flex h-full flex-col p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e11d8c]/10 text-[#e11d8c]">
                <g.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-base font-semibold text-zinc-900">{g.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{g.description}</p>
              <Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#e11d8c] hover:underline">
                <Sparkles className="h-4 w-4" />
                Request a walkthrough
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.75rem] border border-zinc-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-2 text-[#e11d8c]">
            <BookOpen className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">FAQ</span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900">Answers that ship with the product</h3>
          <Accordion type="single" collapsible className="mt-6 w-full">
            {helpFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-zinc-200">
                <AccordionTrigger className="text-left text-sm font-medium text-zinc-900 hover:text-[#e11d8c] hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-zinc-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <aside className="flex flex-col justify-between gap-6 rounded-[1.75rem] border border-zinc-200 bg-gradient-to-b from-white to-zinc-50 p-8 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Still stuck?</p>
            <h3 className="mt-3 text-xl font-semibold text-zinc-900">Tell us what screen you are on</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Screenshots, listing URLs, and approximate timestamps get you to a fix faster than a long thread of “it is not working.”
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <p className="text-sm font-medium text-zinc-900">Pro tip</p>
            <p className="mt-2 text-sm text-zinc-600">Open the Help drawer from any listing card—your context travels with the ticket automatically.</p>
            <div className="mt-5">
              <MarketingPrimaryButton href="/contact">Email the team</MarketingPrimaryButton>
            </div>
          </div>
        </aside>
      </div>
    </MarketingPageLayout>
  )
}
