import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtected = createRouteMatcher(["/dashboard"]);

// export default clerkMiddleware(async (auth, req) => {
//   if (isProtected(req)) await auth.protect();
// });

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/landing",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userID, redirectToSignIn } = await auth();
  if (!isPublicRoute(req)) {
    return redirectToSignIn();
    // await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
