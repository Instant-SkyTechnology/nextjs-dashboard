'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/app/ui/button';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [errorMessage, formAction, isPending] = useActionState(
  authenticate,
  undefined
);

  return (
    <form action={formAction} className="space-y-3">
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <Button aria-disabled={isPending} type="submit">
        Log in
      </Button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </form>
  );
}