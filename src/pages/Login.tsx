import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck2, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "../lib/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async () => {
  try {

    const data = await api("/auth/login", "POST", {
      email,
      senha: password
    });

    localStorage.setItem("token", data.token);

    toast({
      title: "Login realizado!",
      description: "Redirecionando..."
    });

    navigate("/dashboard");

  } catch (error) {

    toast({
      title: "Erro no login",
      description: "Credenciais inválidas",
      variant: "destructive"
    });

  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">

        <div className="flex items-center justify-center gap-2 mb-8">
          <CalendarCheck2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">MeetFlow</span>
        </div>

        <Card className="glass-card">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Bem-vindo de volta</CardTitle>
            <CardDescription>
              Entre com suas credenciais para continuar
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Entrar
              </Button>

            </form>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Não tem conta?{" "}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                Criar conta
              </Link>
            </p>

          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Login;
