"use client";

import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { login } from "@/app/actions/login";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { TriangleAlert } from "lucide-react";
import { useActionState } from "react";

export function LoginForm() {
  const [formState, action, isPending] = useActionState(
    login,
    EMPTY_FORM_STATE
  );

  return (
    <form className="space-y-4" action={action}>
      {formState.status === "ERROR" && (
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>Não foi possível realizar o login</AlertTitle>
          <AlertDescription>{formState.message}</AlertDescription>
        </Alert>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          placeholder="Digite seu email"
          name="email"
          defaultValue={formState.payload?.get("email") as string}
        />
        {formState.fieldErrors.password && (
          <span className="text-destructive pl-1 text-xs block mt-1">
            {formState.fieldErrors.password}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <Input
          type="password"
          id="password"
          placeholder="Digite sua senha"
          name="password"
          defaultValue={formState.payload?.get("password") as string}
        />
        {formState.fieldErrors.email && (
          <span className="text-destructive pl-1 text-xs block mt-1">
            {formState.fieldErrors.email}
          </span>
        )}
      </div>
      <button
        disabled={isPending}
        className="bg-[#93173c] disabled:opacity-55 w-full py-3 px-4 text-sm cursor-pointer transition hover:bg-[#c03642] text-white rounded-sm leading-none"
      >
        Entrar
      </button>
    </form>
  );
}
