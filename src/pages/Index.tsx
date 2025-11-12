import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, BarChart3, Shield, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-info/5">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">IdeaHub</span>
          </div>
          <Button onClick={() => navigate("/auth")}>
            Acessar Plataforma <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-info">
            Plataforma Web IdeaHub
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Sistema completo de gerenciamento e análise de problemas reportados via aplicativo mobile
          </p>
          <Button size="lg" onClick={() => navigate("/auth")} className="shadow-lg">
            Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics em Tempo Real</h3>
            <p className="text-muted-foreground">
              Dashboard completo com métricas e estatísticas dos problemas reportados
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Controle de Acesso</h3>
            <p className="text-muted-foreground">
              Sistema de roles com permissões para admins e moderadores
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-info" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Categorização Inteligente</h3>
            <p className="text-muted-foreground">
              Sistema de categorias e prioridades para organizar problemas
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 shadow-sm border border-border/50">
          <h2 className="text-3xl font-bold mb-6 text-center">Arquitetura Técnica</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Backend</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  PostgreSQL com Lovable Cloud
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Autenticação JWT segura
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Row Level Security (RLS)
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  API RESTful completa
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-info">Frontend</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-info mr-2">•</span>
                  React + TypeScript
                </li>
                <li className="flex items-start">
                  <span className="text-info mr-2">•</span>
                  Tailwind CSS moderno
                </li>
                <li className="flex items-start">
                  <span className="text-info mr-2">•</span>
                  Componentes shadcn/ui
                </li>
                <li className="flex items-start">
                  <span className="text-info mr-2">•</span>
                  Design responsivo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>© 2024 IdeaHub. Plataforma de gerenciamento de problemas.</p>
      </footer>
    </div>
  );
};

export default Index;
