import { decode } from 'html-entities'

export function decodeAndStripHtml(encodedHtml: string): string {
  // Decode HTML entities to plain text
  const decodedHtml = decode(encodedHtml)

  // Use regex to remove HTML tags, leaving only the text content
  return decodedHtml.replace(/<[^>]+>/g, '').trim()
}
