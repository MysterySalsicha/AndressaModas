'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { lucia } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Schema de validação para o formulário de registo
const registerSchema = z.object({
  nome: z.string().min(3, 'O nome precisa ter no mínimo 3 caracteres.'),
  email: z.string().email('Formato de e-mail inválido.'),
  senha: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres.'),
});

export async function registerUser(prevState: any, formData: FormData) {
  const validatedFields = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { nome, email, senha } = validatedFields.data;

  try {
    const existingUser = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return { message: 'Este e-mail já está em uso.' };
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const funcao = 'cliente'; // Definir a função como cliente

    const newUser = await db.query(
      'INSERT INTO usuarios (nome, email, senha, funcao) VALUES ($1, $2, $3, $4) RETURNING id',
      [nome, email, senhaHash, funcao]
    );

    const userId = newUser.rows[0].id;
    
    // Cria a sessão para o novo usuário
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return { success: true };

  } catch (error) {
    console.error('Erro no registo:', error);
    return { message: 'Não foi possível realizar o registo. Tente novamente.' };
  }
}


export async function loginUser(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const senha = formData.get('senha') as string;

    if (!email || !senha) {
        return { message: 'E-mail e senha são obrigatórios.' };
    }

    try {
        const existingUser = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (existingUser.rows.length === 0) {
            return { message: 'E-mail ou senha inválidos.' };
        }

        const user = existingUser.rows[0];
        const isPasswordValid = await bcrypt.compare(senha, user.senha);

        if (!isPasswordValid) {
            return { message: 'E-mail ou senha inválidos.' };
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        
        return { success: true };

    } catch (error) {
        console.error('Erro no login:', error);
        return { message: 'Ocorreu um erro no servidor.' };
    }
}


export async function logoutUser() {
    const { session } = await validateRequest();
    if (!session) {
        return { error: "Não autorizado" };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/");
}