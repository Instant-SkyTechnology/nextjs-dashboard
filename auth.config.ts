// import type { NextAuthConfig } from 'next-auth';
 
// export const authConfig = {
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
  async authorize(credentials) {
    console.log('🔥 AUTHORIZE CALLED');
    console.log('RAW credentials:', credentials);

    const email = credentials?.email?.toString().trim();
    const password = credentials?.password?.toString().trim();

    console.log('PARSED EMAIL:', email);
    console.log('PARSED PASSWORD:', password);

    if (email === 'user@nextmail.com' && password === '123456') {
      console.log('✅ AUTH SUCCESS');
      return { id: '1', name: 'User', email };
    }

    console.log('❌ AUTH FAILED');
    return null;
  },
}),
  ],
};