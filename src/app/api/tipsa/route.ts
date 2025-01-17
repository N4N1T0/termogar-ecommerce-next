import { tipsa } from '@/lib/fetchers'
import { NextRequest, NextResponse } from 'next/server'

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

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const {
    dtFecha,
    strCodTipoServ,
    strNomDes,
    strDirDes,
    strPobDes,
    strCPDes,
    strTlfDes,
    intPaq,
    strContenido
  } = body

  try {
    const response = await tipsa.grabaEnvio24(
      dtFecha,
      strCodTipoServ,
      strNomDes,
      strDirDes,
      strPobDes,
      strCPDes,
      strTlfDes,
      intPaq,
      strContenido
    )
    return NextResponse.json({ success: true, data: response })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    })
  }
}
