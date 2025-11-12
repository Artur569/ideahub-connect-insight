import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Problem } from "@/pages/Problems";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ProblemsTableProps {
  problems: Problem[];
  loading: boolean;
  onUpdateStatus: (id: string, status: string) => void;
}

const ProblemsTable = ({ problems, loading, onUpdateStatus }: ProblemsTableProps) => {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: { variant: "secondary", label: "Pendente" },
      analyzing: { variant: "default", label: "Analisando" },
      resolved: { variant: "default", label: "Resolvido", className: "bg-success text-white" },
      rejected: { variant: "destructive", label: "Rejeitado" },
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, any> = {
      low: { variant: "secondary", label: "Baixa" },
      medium: { variant: "default", label: "Média" },
      high: { variant: "default", label: "Alta", className: "bg-warning text-white" },
      critical: { variant: "destructive", label: "Crítica" },
    };
    const config = variants[priority] || variants.medium;
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>;
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      bug: "Bug",
      feature_request: "Funcionalidade",
      performance: "Performance",
      ui_ux: "UI/UX",
      security: "Segurança",
      other: "Outro",
    };
    return labels[category] || category;
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (problems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nenhum problema encontrado</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Reportado em</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem) => (
            <TableRow key={problem.id}>
              <TableCell className="font-medium">
                <div>
                  <p className="font-semibold">{problem.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {problem.description}
                  </p>
                </div>
              </TableCell>
              <TableCell>{getCategoryLabel(problem.category)}</TableCell>
              <TableCell>{getStatusBadge(problem.status)}</TableCell>
              <TableCell>{getPriorityBadge(problem.priority)}</TableCell>
              <TableCell>
                {format(new Date(problem.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
              </TableCell>
              <TableCell>
                <Select
                  value={problem.status}
                  onValueChange={(value) => onUpdateStatus(problem.id, value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="analyzing">Analisando</SelectItem>
                    <SelectItem value="resolved">Resolvido</SelectItem>
                    <SelectItem value="rejected">Rejeitado</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProblemsTable;