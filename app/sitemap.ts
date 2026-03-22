export default function sitemap() {
  return [
    {
      url: 'https://www.passwordmake.com',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ]
}
