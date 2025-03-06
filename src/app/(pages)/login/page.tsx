"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/api/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, LogIn, User } from "lucide-react";
import footerBackground from "@/assets/footer-background.jpg";
import logoClinicaBranca from "@/assets/logo-branca.png";

export default function LoginPage() {
  const { login, user, loading, isAuthenticated } = useAuth();
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // Efeito para redirecionar usuário já autenticado
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [loading, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await login(cpf, password);
      // Após login bem-sucedido, o useEffect acima vai redirecionar
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    }
  };

  // Se já estiver autenticado, não mostra nada enquanto redireciona
  if (isAuthenticated) {
    return null;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${footerBackground.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden bg-white/10 backdrop-blur-lg relative z-10 animate-fade">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900/80 to-blue-700/80 p-12 flex-col justify-between">
          <div className="flex flex-col gap-4">
            <img
              src={logoClinicaBranca.src}
              className="w-full -mt-10"
              alt="Logo"
            />
            <h1 className="text-4xl font-bold text-white text-center -mt-2">
              Portal de Resultados
            </h1>
            <p className="text-white/80 text-lg">
              Acesse seus exames laboratoriais de forma rápida e segura.
              Resultados disponíveis 24 horas por dia, 7 dias por semana.
            </p>
          </div>

          <div className="space-y-4 text-white/80">
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur">
              <h3 className="font-semibold mb-2">Precisão e Qualidade</h3>
              <p className="text-sm">
                Tecnologia avançada e profissionais especializados para garantir
                a precisão dos seus resultados.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur">
              <h3 className="font-semibold mb-2">Acesso Simplificado</h3>
              <p className="text-sm">
                Visualize seus exames de forma prática e faça o download dos
                resultados quando precisar.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-8 md:p-12 bg-white/20 ">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Área do Paciente
            </h2>
            <p className="text-blue-100">
              Digite suas credenciais para acessar seus exames
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Usuário</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-10 py-3 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
                  placeholder="Digite seu CPF ou código de acesso"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-10 py-3 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
                  placeholder="Digite sua senha de acesso"
                />
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all flex items-center justify-center gap-2 group"
              >
                <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Acessar Resultados
              </button>

              <Link
                href="/"
                className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all flex items-center justify-center gap-2 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Voltar ao site
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/80 text-sm">
              Primeira vez acessando? Entre em contato com o laboratório para
              obter suas credenciais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}