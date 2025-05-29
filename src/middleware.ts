import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "./interfaces/token-payload";

const publicRoutes = [{ path: "/login" }];

const REDIRECT_WHEN_NOT_AUTHENTICATE = "/login";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some((route) => route.path === pathname);

  const accessToken = request.cookies.get("access_token");

  if (!accessToken && !isPublicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATE;
    return NextResponse.redirect(redirectUrl);
  }

  if (accessToken) {
    const decodedToken = jwtDecode<TokenPayload>(accessToken.value);

    const isSeller = decodedToken.roles.includes("vendedor");
    const isCustomer = decodedToken.roles.includes("cliente");
    const customerRedirectUrl = `/consignados/${decodedToken.consigned}/${decodedToken.customerId}/inicio`;

    // Se for rota pública e estiver autenticado, redireciona conforme a role
    if (isPublicRoute) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = isSeller ? "/consignados" : "/dashboard";
      return NextResponse.redirect(redirectUrl);
    }

    if (
      isCustomer &&
      !pathname.includes(decodedToken.consigned ?? decodedToken.sub)
    ) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = customerRedirectUrl;
      return NextResponse.redirect(redirectUrl);
    }

    // Se for "vendedor" e tentar acessar outra rota diferente de "/consignados", redireciona
    if (isSeller && !pathname.startsWith("/consignados")) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/consignados";
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ['/dashboard/((?!general).*)', '/dashboard', '/clientes', '/clientes/((?!general).*)', '/usuarios', '/usuarios/((?!general).*)'],
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
