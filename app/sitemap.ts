export default function sitemap() {
  return [
    {
      url: 'https://passwordmake.com',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ]
}
