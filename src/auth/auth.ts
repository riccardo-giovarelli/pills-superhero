import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { prisma } from '@/lib/prisma';


// NextAuth configuration object.
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      /**
       * Handles the logic for validating user credentials.
       * @param {Record<string, unknown> | undefined} credentials - User-provided email and password.
       * @returns {Promise<any | null>} Returns a user object on success, or null on failure.
       */
      async authorize(credentials: Record<string, unknown> | undefined): Promise<any | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find the user in the database using the provided email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        // If user is not found or has no password (e.g., registered via OAuth), deny access
        if (!user || !user.password) {
          return null;
        }

        // Compare the provided plain-text password with the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(credentials.password as string, user.password);

        if (!isPasswordCorrect) {
          return null;
        }

        // Return a safe user object (excluding the password field for security)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  /**
   * Session Configuration
   * Note: Auth.js defaults to the 'jwt' (JSON Web Token) strategy when using
   * the Credentials provider.
   */
  session: {
    strategy: 'jwt',
  },
  /**
   * Custom Pages
   * Redirects internal auth routes to our custom login page.
   */
  pages: {
    signIn: '/login',
  },
});
