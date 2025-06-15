import { Lucia } from "lucia";
import { Pool } from 'pg';
import { PostgresJsAdapter } from "@lucia-auth/adapter-postgresql";
import { cookies } from "next/headers";
import { cache } from "react";
import type { Session, User } from "lucia";

// Adapta a conexão do 'node-postgres' para o Lucia
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const adapter = new PostgresJsAdapter(pool, {
  user: "usuarios",
  session: "sessoes_usuario"
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production"
    }
  },
  getUserAttributes: (attributes) => {
    return {
      nome: attributes.nome,
      email: attributes.email,
      funcao: attributes.funcao
    };
  }
});

// Valida a sessão do usuário em cada requisição
export const validateRequest = cache(async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		return { user: null, session: null };
	}

	const result = await lucia.validateSession(sessionId);
	try {
		if (result.session && result.session.fresh) {
			const sessionCookie = lucia.createSessionCookie(result.session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
		if (!result.session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
	} catch {}
	return result;
});

// Tipagem para o Lucia entender os campos do nosso usuário
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      nome: string;
      email: string;
      funcao: string;
    };
  }
}