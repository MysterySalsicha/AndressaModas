// app/login/actions.ts
'use server';

import { redirect } from 'next/navigation';
import { createSession } from '@/lib/session';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

// (O resto do código da função login continua o mesmo)
export async function login(formData: FormData) {
  // ...
}