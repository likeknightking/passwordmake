export default function sitemap() {
  return [
    { url: 'https://passwordmake.com', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 1 },
    { url: 'https://passwordmake.com/passphrase-generator', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: 'https://passwordmake.com/pin-generator', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: 'https://passwordmake.com/password-strength-checker', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: 'https://passwordmake.com/privacy-policy', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: 'https://passwordmake.com/terms', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: 'https://passwordmake.com/about', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.4 },
  ]
}
