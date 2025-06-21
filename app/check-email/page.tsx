'use client';

export default function CheckEmail() {
  return (
    <main className="mx-auto max-w-md p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Verify your email</h1>
      <p className="mb-2">
        We've sent a confirmation link to your email address. Click the link in that email to
        activate your account.
      </p>
      <p>
        After confirming, this tab will automatically log you in, or you can return and sign in
        with your credentials.
      </p>
    </main>
  );
} 