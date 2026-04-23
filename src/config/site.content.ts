import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Spaces & listings',
  },
  footer: {
    tagline: 'Spaces & listings',
  },
  hero: {
    badge: 'Featured stays & venues',
    title: ['Find your next', 'space without the noise.'],
    description:
      'Browse curated listings for Datazynxllc—clear photos, honest descriptions, and search that stays out of your way.',
    primaryCta: {
      label: 'Browse listings',
      href: '/listings',
    },
    secondaryCta: {
      label: 'Search places',
      href: '/search',
    },
    searchPlaceholder: 'Search by city, neighborhood, or listing name',
    focusLabel: 'Focus',
    featureCardBadge: 'Fresh this week',
    featureCardTitle: 'New listings shape what visitors see first on the home surface.',
    featureCardDescription:
      'The homepage keeps imagery and pricing cues upfront so guests can compare spaces quickly.',
  },
  home: {
    metadata: {
      title: 'Listings and bookable spaces',
      description: 'Discover listings and spaces on Datazynxllc—built for clean search, strong imagery, and simple discovery.',
      openGraphTitle: 'Listings and bookable spaces',
      openGraphDescription: 'Explore curated listings, compare options, and move from search to booking with less friction.',
      keywords: ['listings', 'spaces', 'local discovery', 'rentals', 'venues', 'Datazynxllc'],
    },
    introBadge: 'About this site',
    introTitle: 'One destination for listings—designed like a marketplace, not a blog.',
    introParagraphs: [
      'Every screen is tuned for hosts and guests: large imagery, scannable cards, and navigation that keeps listings in focus.',
      'Search and filters stay close to the hero so visitors spend less time hunting and more time shortlisting what fits.',
      'Whether someone arrives from search, social, or a direct link, they land in a consistent listing-first experience.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Listing-first layout with generous imagery and soft cards.',
      'Recommended rows and featured picks for faster browsing.',
      'Lightweight interactions that keep pages fast on real devices.',
    ],
    primaryLink: {
      label: 'Browse listings',
      href: '/listings',
    },
    secondaryLink: {
      label: 'Open search',
      href: '/search',
    },
  },
  cta: {
    badge: 'Start exploring',
    title: 'Compare spaces, save favorites, and reach hosts from one listings hub.',
    description: 'Built for Datazynxllc guests and hosts who want a calmer, more visual marketplace rhythm.',
    primaryCta: {
      label: 'Browse listings',
      href: '/listings',
    },
    secondaryCta: {
      label: 'List a space',
      href: '/register',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'A Listing site for Datazynxllc, built for clean discovery and structured publishing.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'A Listing site for Datazynxllc, built for clean discovery and structured publishing.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'A Listing site for Datazynxllc, built for clean discovery and structured publishing.',
  },
  image: {
    title: 'Images and visual posts',
    description: 'A Listing site for Datazynxllc, built for clean discovery and structured publishing.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'A Listing site for Datazynxllc, built for clean discovery and structured publishing.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'A Listing site for Datazynxllc, built for clean discovery and structured publishing.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'A Listing site for Datazynxllc, built for clean discovery and structured publishing.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Use search to narrow by area and dates, then open cards for full detail, photos, and host context.',
      'Save favorites as you compare so the shortlist stays with you during the session.',
    ],
    links: [
      { label: 'Open search', href: '/search' },
      { label: 'List a space', href: '/register' },
      { label: 'Contact support', href: '/contact' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open images', href: '/images' },
      { label: 'Browse resources', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images take the lead in this section through galleries, visual posts, and story-led content where imagery carries the experience.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with stories, listings, documents, and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Browse images', href: '/images' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'See listings', href: '/listings' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
