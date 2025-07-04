'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { lucia, validateRequest } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// --- Ação de criar pedido (existente) ---
export async function createOrder(cartItems: any[]) {
    // ... (sua lógica de createOrder)
    console.log("Pedido criado com os itens:", cartItems);
    return { success: true, message: "Pedido finalizado com sucesso!" };
}

// --- Ações de Usuário (existentes) ---
const registerSchema = z.object({
  nome: z.string().min(3, 'O nome precisa ter no mínimo 3 caracteres.'),
  email: z.string().email('Formato de e-mail inválido.'),
  senha: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres.'),
});

export async function registerUser(prevState: any, formData: FormData) {
  // ... (código existente, sem alterações)
  const validatedFields = registerSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { nome, email, senha } = validatedFields.data;

  try {
    const existingUser = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return { message: 'Este e-mail já está em uso.' };
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const newUser = await db.query(
      'INSERT INTO usuarios (nome, email, senha, funcao) VALUES ($1, $2, $3, $4) RETURNING id',
      [nome, email, senhaHash, 'cliente']
    );

    const userId = newUser.rows[0].id;
    const session = await lucia.createSession(userId.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return { success: true };
  } catch (error) {
    console.error('Erro no registo:', error);
    return { message: 'Não foi possível realizar o registo.' };
  }
}

export async function loginUser(prevState: any, formData: FormData) {
    // ... (código existente, sem alterações)
    const email = formData.get('email') as string;
    const senha = formData.get('senha') as string;

    if (!email || !senha) {
        return { message: 'E-mail e senha são obrigatórios.' };
    }

    try {
        const existingUser = await db.query('SELECT * FROM usuarios WHERE email = $1 AND funcao = $2', [email, 'cliente']);
        if (existingUser.rows.length === 0) {
            return { message: 'E-mail ou senha inválidos.' };
        }

        const user = existingUser.rows[0];
        const isPasswordValid = await bcrypt.compare(senha, user.senha);

        if (!isPasswordValid) {
            return { message: 'E-mail ou senha inválidos.' };
        }

        const session = await lucia.createSession(user.id.toString(), {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        
        return { success: true };
    } catch (error) {
        console.error('Erro no login:', error);
        return { message: 'Ocorreu um erro no servidor.' };
    }
}

// CORREÇÃO APLICADA AQUI
export async function logoutUser(formData: FormData) {
    const { session } = await validateRequest();
    if (!session) {
        return { error: "Não autorizado" };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/");
}