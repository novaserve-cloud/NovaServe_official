import { NextResponse } from "next/server";
import { novaFeedData } from "@/lib/feedData";

export const dynamic = "force-static";

export async function GET() {
  const xmlItems = novaFeedData
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>https://novaserve.cloud${item.link}</link>
      <guid isPermaLink="false">${item.id}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <dc:creator><![CDATA[${item.creator}]]></dc:creator>
      <category><![CDATA[${item.category}]]></category>
      <description><![CDATA[${item.description}]]></description>
    </item>`
    )
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NovaServe Cloud Official Engineering Feed</title>
    <link>https://novaserve.cloud</link>
    <description>Live updates on cloud compiler architecture, zero-trust security, multi-cloud engine, and open-source NovaServe releases.</description>
    <language>en-us</language>
    <atom:link href="https://novaserve.cloud/feed.xml" rel="self" type="application/rss+xml"/>
    ${xmlItems}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
