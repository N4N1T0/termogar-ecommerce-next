import {
  BASE_URL,
  PER_PAGE,
  CONSUMER_KEY,
  CONSUMER_SECRET
} from '../../constants'
import type { WordPressDataType, WordPressDataTypeResponses } from '../../types'

export async function wpDataTypeFetch<T extends WordPressDataType>(
  type: T,
  page: number
): Promise<WordPressDataTypeResponses[T]> {
  const wpApiUrl = new URL(`${BASE_URL}/${type}`)
  wpApiUrl.searchParams.set('page', page.toString())
  wpApiUrl.searchParams.set('per_page', PER_PAGE.toString())
  wpApiUrl.searchParams.set('consumer_key', CONSUMER_KEY.toString())
  wpApiUrl.searchParams.set('consumer_secret', CONSUMER_SECRET.toString())

  return fetch(wpApiUrl).then((res) => (res.ok ? res.json() : null))
}
