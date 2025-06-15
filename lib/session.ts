// lib/session.ts
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d') // Sessão expira em 1 dia
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    // Retorna null se o token for inválido ou expirado
    return null;
  }
}

export async function createSession(user: { id: number; email: string; role: string }) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 dia
  const session = await encrypt({ user, expires });

  cookies().set('session', session, { expires, httpOnly: true });
}

export async function getSession() {
  const sessionCookie = cookies().get('session')?.value;
  if (!sessionCookie) return null;
  return await decrypt(sessionCookie);
}

export async function deleteSession() {
  cookies().delete('session');
}