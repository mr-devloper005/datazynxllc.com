import Link from 'next/link'
import { Globe, Mail, MapPin, Phone, ShieldCheck, Star, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { DirectoryPhotoGallery } from '@/design/products/directory/directory-photo-gallery'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const services = Array.isArray(content.services) ? content.services.filter((item): item is string => typeof item === 'string') : []
  const keyPeople = Array.isArray(content.people) ? content.people.filter((item): item is string => typeof item === 'string') : []
  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')

  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-[1280px] px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950">
          ← Back to {taskLabel}
        </Link>

        <section className="overflow-hidden bg-[#131e3a] text-white">
          <div className="px-6 py-8 md:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex gap-6">
                <div className="relative h-36 w-36 shrink-0 overflow-hidden border-8 border-white/95 bg-slate-200">
                  <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
                </div>
                <div>
                  <h1 className="text-3xl font-semibold tracking-[-0.02em]">{post.title}</h1>
                  {location ? (
                    <p className="mt-2 inline-flex items-center gap-2 text-base font-medium text-slate-100">
                      <MapPin className="h-4 w-4" /> {location}
                    </p>
                  ) : null}
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-sm font-semibold">0</span>
                    <span className="inline-flex items-center gap-1 text-slate-200">
                      {[0, 1, 2, 3, 4].map((item) => (
                        <Star key={item} className="h-4 w-4 fill-current" />
                      ))}
                    </span>
                    <span className="text-sm font-semibold text-sky-300">REVIEW(S)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-8 lg:items-end">
                <div className="flex flex-wrap gap-3">
                  {website ? (
                    <a href={website} target="_blank" rel="noreferrer" className="rounded bg-[#ff7a00] px-5 py-2.5 text-sm font-medium text-white">
                      Visit Website
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black px-6 py-3 md:px-10">
          <div className="flex flex-wrap items-center gap-7 text-sm font-semibold uppercase tracking-[0.08em] text-white">
            {[
              { label: 'Overview', id: 'overview' },
              { label: 'Blogs', id: 'blogs' },
              { label: 'Events', id: 'events' },
              { label: 'Photos', id: 'photos' },
              { label: 'Videos', id: 'videos' },
              { label: 'Reviews', id: 'reviews' },
            ].map((tab, idx) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className={idx === 0 ? 'border-b-2 border-[#ff7a00] pb-2 text-[#ff7a00] hover:text-[#ff7a00]' : 'pb-2 hover:text-sky-300'}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </section>

        <section className="grid gap-7 px-1 pt-8 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="space-y-3">
            <div className="rounded-lg border border-[#c7ccd4] bg-white p-5">
              <h3 className="text-3xl font-semibold tracking-[-0.02em] text-[#1f3a70]">{category || taskLabel}</h3>
              <h4 className="mt-2 text-xl font-semibold text-[#1f3a70]">Primary Address</h4>
              {location ? <p className="mt-2 inline-flex items-start gap-2 text-sm text-slate-700"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {location}</p> : null}
              <p className="mt-3 font-semibold text-slate-900">{post.title}</p>
              {phone ? <p className="mt-3 inline-flex items-center gap-2 font-semibold text-slate-900"><Phone className="h-4 w-4" /> {phone}</p> : null}
              {email ? <p className="mt-2 inline-flex items-center gap-2 text-sm text-slate-700"><Mail className="h-4 w-4" /> {email}</p> : null}
              {website ? (
                <p className="mt-2 inline-flex items-center gap-2 text-sm text-slate-700">
                  <Globe className="h-4 w-4" />
                  <a href={website} target="_blank" rel="noreferrer" className="break-all hover:underline">{website}</a>
                </p>
              ) : null}
            </div>

            <div className="rounded-lg border border-[#c7ccd4] bg-white p-5">
              <h4 className="text-2xl font-semibold tracking-[-0.02em] text-[#1f3a70]">Services</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {(services.length ? services : highlights).slice(0, 5).map((item) => (
                  <li key={item} className="inline-flex items-start gap-2"><span className="mt-2 h-1 w-1 rounded-full bg-slate-700" /> {item}</li>
                ))}
                {!services.length && !highlights.length ? <li>General services available</li> : null}
              </ul>
            </div>

            <div className="rounded-lg border border-[#c7ccd4] bg-white p-5">
              <h4 className="text-2xl font-semibold tracking-[-0.02em] text-[#1f3a70]">Key People</h4>
              <p className="mt-3 text-sm text-slate-700">{keyPeople[0] || post.authorName || `${post.title} team`}</p>
            </div>

            <div className="rounded-lg border border-[#c7ccd4] bg-white p-5">
              <h4 className="text-2xl font-semibold tracking-[-0.02em] text-[#1f3a70]">Claim Your Profile</h4>
              <p className="mt-3 text-base font-semibold leading-7 text-slate-900">
                Claim your profile to access your account details and brand promotion.
              </p>
            </div>
          </aside>

          <div className="space-y-8">
            <section id="overview" className="scroll-mt-24 rounded-lg bg-transparent p-0">
              <h2 className="text-5xl font-semibold tracking-[-0.02em] text-[#1f3a70]">Overview</h2>
              <RichContent html={descriptionHtml} className="mt-4 text-base leading-8 text-slate-700" />
            </section>

            <div>
              <h3 className="text-[42px] font-semibold tracking-[-0.02em] text-[#1f3a70]">Sponsorship in {new Date().getFullYear()}</h3>
              <div className="mt-4 rounded bg-[#efe3b4] px-5 py-4 text-sm text-[#856404]">
                There is no data, please login to become a sponsor.
              </div>
            </div>

            <section id="blogs" className="scroll-mt-24">
              <div className="flex items-center justify-between">
                <h3 className="text-[42px] font-semibold tracking-[-0.02em] text-[#1f3a70]">Blogs</h3>
                <Link href={taskRoute} className="rounded bg-[#dce2f2] px-5 py-2 text-sm font-semibold tracking-[0.12em] text-[#1f3a70]">
                  See More Blog →
                </Link>
              </div>
              <div className="mt-4 rounded bg-[#efe3b4] px-5 py-4 text-sm text-[#856404]">
                There is no data, please login to add blog.
              </div>
            </section>

            <section id="events" className="scroll-mt-24">
              <h3 className="text-[42px] font-semibold tracking-[-0.02em] text-[#1f3a70]">Events</h3>
              <div className="mt-4 rounded bg-[#efe3b4] px-5 py-4 text-sm text-[#856404]">
                There is no event data available at the moment.
              </div>
            </section>

            <section id="photos" className="scroll-mt-24">
              <h3 className="text-[42px] font-semibold tracking-[-0.02em] text-[#1f3a70]">Photos</h3>
              <DirectoryPhotoGallery images={images} title={post.title} />
            </section>

            <section id="videos" className="scroll-mt-24">
              <h3 className="text-[42px] font-semibold tracking-[-0.02em] text-[#1f3a70]">Videos</h3>
              <div className="mt-4 rounded bg-[#efe3b4] px-5 py-4 text-sm text-[#856404]">
                There are no videos available for this profile yet.
              </div>
            </section>

            <section id="reviews" className="scroll-mt-24">
              <h3 className="text-[42px] font-semibold tracking-[-0.02em] text-[#1f3a70]">Reviews</h3>
              <div className="mt-4 rounded bg-[#efe3b4] px-5 py-4 text-sm text-[#856404]">
                No reviews found yet. Be the first to leave a review.
              </div>
            </section>

            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-lg border border-[#c7ccd4] bg-white">
                <div className="border-b border-[#c7ccd4] px-5 py-3">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f3a70]"><ShieldCheck className="h-4 w-4" /> Location Map</p>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[300px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-slate-300 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">Related surfaces</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#1f3a70]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
