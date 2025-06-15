// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/session'; // Corrigido para caminho relativo

export async function middleware(request: NextRequest) {
    // ... (O resto do código da função middleware continua o mesmo)
}
export const config = {
  matcher: ['/admin/:path*', '/login'],
};