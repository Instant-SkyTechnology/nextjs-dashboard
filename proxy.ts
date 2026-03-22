// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
 
// export default NextAuth(authConfig).auth;
 
// export const config = {
//   // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };

// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// import { NextResponse } from 'next/server';

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   const isLoggedIn = !!req.auth;
//   const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');

//   // 🚨 If NOT logged in and trying to access dashboard → redirect
//   if (!isLoggedIn && isDashboard) {
//     const loginUrl = new URL('/login', req.nextUrl.origin);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Otherwise allow
//   return NextResponse.next();
// });

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/invoices') ||
    pathname.startsWith('/customers');

  // 🚨 Redirect if not logged in
  if (!isLoggedIn && isProtectedRoute) {
    const loginUrl = new URL('/login', req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
