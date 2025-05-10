export type TokenPayload = {
  sub: string;
  roles: ["administrador", "vendedor", "cliente"];
  permissions: string[];
  consigned: string | null;
  iat: number;
};
