import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProblemsTable from "@/components/problems/ProblemsTable";
import ProblemFilters from "@/components/problems/ProblemFilters";
import { toast } from "sonner";

export interface Problem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  reporter_email: string | null;
  reporter_name: string | null;
  created_at: string;
  updated_at: string;
}

const Problems = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    priority: "all",
  });

  useEffect(() => {
    fetchProblems();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, problems]);

  const fetchProblems = async () => {
    try {
      const { data, error } = await supabase
        .from("problems")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProblems(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar problemas");
      console.error("Error fetching problems:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...problems];

    if (filters.status !== "all") {
      filtered = filtered.filter((p) => p.status === filters.status);
    }
    if (filters.category !== "all") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.priority !== "all") {
      filtered = filtered.filter((p) => p.priority === filters.priority);
    }

    setFilteredProblems(filtered);
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const updates: any = { status: newStatus };
      if (newStatus === "resolved") {
        updates.resolved_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from("problems")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      toast.success("Status atualizado com sucesso");
      fetchProblems();
    } catch (error: any) {
      toast.error("Erro ao atualizar status");
      console.error("Error updating status:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Problemas</h1>
          <p className="text-muted-foreground mt-1">
            Visualize e gerencie todos os problemas reportados
          </p>
        </div>

        <ProblemFilters filters={filters} setFilters={setFilters} />

        <ProblemsTable
          problems={filteredProblems}
          loading={loading}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>
    </DashboardLayout>
  );
};

export default Problems;