// app/login/page.tsx
import { login } from './actions';

export default function LoginPage() {
  return (
    <div style={{display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
      <form action={login} style={{display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px'}}>
        <h2>Login de Administrador</h2>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Senha" required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}