export type Site = {
  TITLE: string
  DESCRIPTION: string
  EMAIL: string
  NUM_POSTS_ON_HOMEPAGE: number
  POSTS_PER_PAGE: number
  SITEURL: string
}

export type Link = {
  href: string
  label: string
}

export const SITE: Site = {
  TITLE: 'Kai H.dev',
  DESCRIPTION:
    'Freelance frontend web development and cybersecurity shenanigans.',
  EMAIL: 'dangkhoahuynh2511@gmail.com',
  NUM_POSTS_ON_HOMEPAGE: 2,
  POSTS_PER_PAGE: 4,
  SITEURL: 'https://kaih.dev',
}

export const NAV_LINKS: Link[] = [
  { href: '/', label: 'home' },
  { href: '/blog', label: 'blog' },
  { href: '/about', label: 'about me' },
  { href: '/projects', label: 'projects' },
  { href: '/stats', label: 'stats' },
  { href: '/uses', label: 'uses' },
  // { href: '/authors', label: 'authors' },
  // { href: '/tags', label: 'tags' },
]

export const SOCIAL_LINKS: Link[] = [
  { href: 'https://github.com/Khoahuynh2511', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/huynh-dang-khoa-846786218/', label: 'LinkedIn' },
  { href: 'dangkhoahuynh2511@gmail.com', label: 'Email' },
  { href: '/rss.xml', label: 'RSS' },
]
