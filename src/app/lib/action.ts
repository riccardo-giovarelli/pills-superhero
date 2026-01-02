'use server';

import { AuthError } from 'next-auth';
import { z } from 'zod';

import { signIn } from '@/auth/auth';


// Zod validation schema for the login form.
const LoginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * Server Action to handle user authentication.
 *
 * @param {string | undefined} prevState - The previous state of the form, used by the useActionState hook.
 * @param {FormData} formData - The data submitted by the login form.
 * @returns {Promise<string | undefined>} - Returns an error message string if authentication fails,
 * otherwise performs a redirect.
 */
export async function authenticate(prevState: string | undefined, formData: FormData): Promise<string | undefined> {
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
          return 'Invalid email or password.';
        default:
          return 'Something went wrong during authentication.';
      }
    }
    throw error;
  }
}
