import { getAllPostMeta } from '@/lib/blog';
import { BLOG_URL } from '@/lib/blog-shared';
import { CONTACT, SITE } from '@/lib/profile';

export const dynamic = 'force-static';

const escape = (s: string) =>
    s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

export function GET() {
    const posts = getAllPostMeta();
    const items = posts
        .map((p) => {
            const url = `${SITE.url}${BLOG_URL(p.slug)}`;
            return `    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(p.excerpt)}</description>
      <category>${escape(p.category)}</category>
${p.tags.map((t) => `      <category>${escape(t)}</category>`).join('\n')}
    </item>`;
        })
        .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tech Nation — ${escape(SITE.name)}</title>
    <link>${SITE.url}/blog</link>
    <atom:link href="${
        SITE.url
    }/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Notes on software engineering, offline-first design, building in Africa, and lessons from real projects.</description>
    <language>en</language>
    <managingEditor>${CONTACT.email} (${escape(SITE.name)})</managingEditor>
${
    posts[0]
        ? `    <lastBuildDate>${new Date(
              `${posts[0].date}T00:00:00Z`,
          ).toUTCString()}</lastBuildDate>\n`
        : ''
}${items}
  </channel>
</rss>
`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
    });
}
