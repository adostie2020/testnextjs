'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function Signup() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr]           = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // 1) Call your eventual /api/auth/signup (stubbed for now)
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setErr((await res.json()).error ?? 'Unknown error');
      return;
    }

    // 2) Immediately log them in & land on first gated page
    await signIn('credentials', { email, password, callbackUrl: '/401k' });
    router.refresh();        // useful during local dev hot-reloads
  }

  return (
    <main className="mx-auto max-w-sm p-4">
      <h1 className="text-2xl font-bold mb-4">Create Your Account</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input  type="email"    placeholder="Email"    required
                className="input" value={email}    onChange={e=>setEmail(e.target.value)} />
        <input  type="password" placeholder="Password" required
                className="input" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <p className="text-red-500">{err}</p>}
        <button className="btn-primary">Sign up</button>
      </form>
    </main>
  );
}
