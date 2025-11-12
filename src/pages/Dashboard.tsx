import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface Stats {
  total: number;
  pending: number;
  resolved: number;
  avgResolutionTime: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from("problems")
        .select("*");

      if (error) throw error;

      const total = data?.length || 0;
      const pending = data?.filter((p) => p.status === "pending").length || 0;
      const resolved = data?.filter((p) => p.status === "resolved").length || 0;

      // Calculate average resolution time
      const resolvedProblems = data?.filter((p) => p.resolved_at) || [];
      const avgTime = resolvedProblems.length > 0
        ? resolvedProblems.reduce((acc, p) => {
            const created = new Date(p.created_at).getTime();
            const resolved = new Date(p.resolved_at!).getTime();
            return acc + (resolved - created);
          }, 0) / resolvedProblems.length / (1000 * 60 * 60)
        : 0;

      setStats({
        total,
        pending,
        resolved,
        avgResolutionTime: Math.round(avgTime * 10) / 10,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, description, colorClass }: any) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${colorClass}`} />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <>
            <div className="text-3xl font-bold">{value}</div>
            <CardDescription className="mt-1">{description}</CardDescription>
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral da plataforma IdeaHub
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total de Problemas"
            value={stats?.total || 0}
            icon={AlertCircle}
            description="Total reportados"
            colorClass="text-primary"
          />
          <StatCard
            title="Pendentes"
            value={stats?.pending || 0}
            icon={Clock}
            description="Aguardando análise"
            colorClass="text-warning"
          />
          <StatCard
            title="Resolvidos"
            value={stats?.resolved || 0}
            icon={CheckCircle}
            description="Problemas solucionados"
            colorClass="text-success"
          />
          <StatCard
            title="Tempo Médio"
            value={`${stats?.avgResolutionTime || 0}h`}
            icon={TrendingUp}
            description="De resolução"
            colorClass="text-info"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sobre a Plataforma</CardTitle>
            <CardDescription>
              Sistema de gerenciamento de problemas reportados via aplicativo mobile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Funcionalidades Principais</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Visualização e gerenciamento de problemas reportados</li>
                <li>Sistema de categorização automática</li>
                <li>Painel de métricas e analytics em tempo real</li>
                <li>Gestão de usuários com controle de acesso (Admin/Moderador)</li>
                <li>Integração com aplicativo mobile para recebimento de problemas</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;