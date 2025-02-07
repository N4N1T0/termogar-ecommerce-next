import { tipsa } from '@/lib/fetchers'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export const POST = async (req: NextRequest) => {
  try {
    const { strAlbaran } = await req.json()

    if (typeof strAlbaran !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input: strAlbaran must be a string' },
        { status: 400 }
      )
    }

    const response = await tipsa.construirEtiqueta8(strAlbaran)
    return NextResponse.json({ response })
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred', details: error },
      { status: 500 }
    )
  }
}
