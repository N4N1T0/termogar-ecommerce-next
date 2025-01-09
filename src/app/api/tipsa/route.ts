import { tipsa } from '@/lib/fetchers'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const idSession = await tipsa.generateSessionId()
    return NextResponse.json({ success: true, data: idSession })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    })
  }
}
