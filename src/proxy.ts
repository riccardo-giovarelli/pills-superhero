import { auth } from '@/auth';


// Assegniamo la funzione auth alla costante proxy richiesta
export const proxy = auth;

export const config = {
  matcher: ['/dashboard/:path*'],
};
