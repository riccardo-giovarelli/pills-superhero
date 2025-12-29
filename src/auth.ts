import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Qui inserisci la logica per verificare l'utente sul tuo database
        const user = { id: '1', name: 'Rick', email: 'riccardo.giovarelli@gmail.com' };
        return user || null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});
