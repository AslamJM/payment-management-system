import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ req, token }) => {
            // Allow access if the user is authenticated or if accessing the /login page
            return !!token || req.nextUrl.pathname === "/login";
        },
    },
});

export const config = {
    matcher: [
        /*
         * Match all paths except:
         * - API routes
         * - Static files (_next/static)
         * - Image optimization (_next/image)
         * - Favicon (favicon.ico)
         * - The login page
         */
        "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
    ],
};