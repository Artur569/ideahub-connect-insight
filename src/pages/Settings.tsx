import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Settings = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as configurações da plataforma
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações da Conta</CardTitle>
            <CardDescription>
              Suas informações pessoais e configurações de perfil
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">ID do Usuário</p>
              <p className="text-sm text-muted-foreground font-mono">{user?.id}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sobre a Plataforma</CardTitle>
            <CardDescription>
              Arquitetura e funcionalidades técnicas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Backend</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Banco de dados PostgreSQL com Lovable Cloud</li>
                <li>Autenticação segura com JWT</li>
                <li>Row Level Security (RLS) para proteção de dados</li>
                <li>API RESTful com Supabase</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Frontend</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>React + TypeScript</li>
                <li>Tailwind CSS para estilização</li>
                <li>shadcn/ui para componentes</li>
                <li>Design responsivo e moderno</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Funcionalidades</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Dashboard com métricas em tempo real</li>
                <li>Sistema de categorização de problemas</li>
                <li>Gerenciamento de status e prioridades</li>
                <li>Controle de acesso baseado em roles</li>
                <li>Interface intuitiva e responsiva</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;