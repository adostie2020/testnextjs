// app/login/page.tsx
import { Suspense } from 'react';
import Login from './login';

function Loading() {
  return <h2>🌀 Loading login page...</h2>;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Login />
    </Suspense>
  );
}
