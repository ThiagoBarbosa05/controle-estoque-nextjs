export type TokenPayload = {
  sub: string;
  roles: ["administrador", "vendedor", "cliente"];
  permissions: string[];
  consigned: string | null;
  customerId: string | null;
  iat: number;
};
