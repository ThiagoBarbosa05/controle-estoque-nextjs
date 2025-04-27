import { LoginForm } from "@/components/login/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserCircle } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex relative flex-col items-center bg-[#93173c]/90  justify-center min-h-screen">
      <span className="absolute inset-0 bg-zinc-950/70"></span>
      <Card className="z-20">
        <CardHeader>
          <CardTitle className="text-center text-[#93173c] text-xl">
            Bem vindo ao Controle de Estoque
          </CardTitle>
          <CardDescription className="text-center">
            Por favor preencha os campos abaixo para prosseguir.
          </CardDescription>
        </CardHeader>
        <CardContent className="sm:min-w-[400px] min-w-[320px]">
          <div className="w-full flex mb-4 justify-center">
            <UserCircle
              className="size-28 text-zinc-400 opacity-50"
              strokeWidth={1}
            />
          </div>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
