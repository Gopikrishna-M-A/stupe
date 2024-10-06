import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/privacy', 
  '/terms', 
  '/contact', 
  '/about', 
  '/faq', 
  '/help', 
  '/shipping', 
  '/refunds', 
  '/',
  '/api(.*)'
])

export default clerkMiddleware((auth, request) => {
  console.log(`Request path: ${request.nextUrl.pathname}`);
  if (!isPublicRoute(request)) {
    console.log('Route is protected');
    auth().protect();
  } else {
    console.log('Route is public');
  }
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
