// Endpoint para revalidar o cache quando admin trocar o tema
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Verificar token de segurança (opcional mas recomendado)
    const authHeader = request.headers.get('authorization')
    const token = process.env.REVALIDATION_TOKEN

    if (token && authHeader !== `Bearer ${token}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Revalidar o cache do tema
    revalidateTag('active-theme')

    console.log('Cache do tema revalidado com sucesso')

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Erro ao revalidar tema:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate theme' },
      { status: 500 }
    )
  }
}

// Exemplo de como chamar este webhook da dashboard de admin:
/*
  fetch('https://seu-site.com/api/revalidate-theme', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer SEU_TOKEN_SECRETO'
    }
  })
*/