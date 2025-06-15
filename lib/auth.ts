import { Lucia } from "lucia";
import { Pool } from 'pg';
import { PostgresJsAdapter } from "@lucia-auth/adapter-postgresql";
import { cookies } from "next/headers";
import { cache } from "react";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const adapter = new PostgresJsAdapter(pool, {
  user: "usuarios",
  session: "sessoes_usuario" // Nome da tabela de sessões
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

// Função para validar a requisição e obter o usuário
export const validateRequest = cache(async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		return {
			user: null,
			session: null
		};
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