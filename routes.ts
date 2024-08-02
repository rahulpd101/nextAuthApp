/**
 * An array of routes that are accessible to the public and do not require authentication
 * @type{string[]}
 */

export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect loggedin users to /settings.
 * @type{string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * The prefix for api authentication routes.
 Routes that start with this prefix are used for API authentication processes.
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default route for redirecting the user after they are logged in.
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
