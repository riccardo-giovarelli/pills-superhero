'use server';

import { AuthError } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import { z } from 'zod';

import { signIn, signOut } from '@/auth/auth';


/**
 * Authenticates a user using the credentials provider.
 * * @description This Server Action validates the login form data using Zod,
 * attempts to sign in via Auth.js, and handles localized error messages.
 * It is designed to be used with the React `useFormState` or `useActionState` hook.
 * * @param {string | undefined} prevState - The previous state returned by the action (used by React hooks).
 * @param {FormData} formData - The raw form data submitted by the client.
 * @returns {Promise<string | undefined>} A promise that resolves to an error message string if validation
 * or authentication fails, or undefined if successful (triggers a redirect).
 * * @throws {Error} Re-throws non-AuthError exceptions to allow Next.js to handle
 * internal redirects and system errors correctly.
 */
export async function authenticate(prevState: string | undefined, formData: FormData): Promise<string | undefined> {
  const t = await getTranslations('authLib');

  // Zod validation schema for the login form.
  const LoginSchema = z.object({
    email: z.email(t('invalidEmailAddress')),
    password: z.string().min(1, t('passwordRequired')),
  });

  // Validate form fields
  const validatedFields = LoginSchema.safeParse(Object.fromEntries(formData));
  if (!validatedFields.success) {
    return validatedFields.error.issues[0].message;
  }

  // Attempt to sign in and redirect to dashboard on success
  try {
    await signIn('credentials', {
      ...validatedFields.data,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return t('wrongEmailOrPassword');
        default:
          return t('authProblem');
      }
    }
    throw error;
  }
}

/**
 * Handles the user logout process by terminating the session.
 * * @description This is a Server Action that calls the auth provider's signOut method.
 * It clears the session cookies and redirects the user to the login page.
 * * @async
 * @function handleLogout
 * @returns {Promise<void>} A promise that resolves when the sign-out and redirection are initiated.
 */
export async function handleLogout() {
  await signOut({ redirectTo: '/login' });
}
