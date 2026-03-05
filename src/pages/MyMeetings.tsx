import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Eye, Pencil, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const meetings = [
  { id: "1", title: "Reunião de Sprint", date: "2026-03-05", time: "09:00 - 10:00", participants: ["ana@email.com", "carlos@email.com"], status: "confirmada" },
  { id: "2", title: "Alinhamento de Projeto", date: "2026-03-05", time: "11:00 - 11:30", participants: ["maria@email.com"], status: "confirmada" },
  { id: "3", title: "Review Semanal", date: "2026-03-06", time: "14:00 - 15:00", participants: ["time@email.com", "lead@email.com"], status: "confirmada" },
  { id: "4", title: "Retrospectiva", date: "2026-03-04", time: "16:00 - 17:00", participants: ["equipe@email.com"], status: "concluída" },
  { id: "5", title: "Call com Cliente", date: "2026-03-03", time: "10:00 - 10:30", participants: ["cliente@email.com"], status: "cancelada" },
];

const statusColors: Record<string, string> = {
  confirmada: "bg-success/10 text-success border-success/20",
  cancelada: "bg-destructive/10 text-destructive border-destructive/20",
  "concluída": "bg-muted text-muted-foreground border-muted",
};

const MyMeetings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCancel = (title: string) => {
    toast({ title: "Reunião cancelada", description: `"${title}" foi cancelada.` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Minhas Reuniões</h1>
          <p className="text-muted-foreground text-sm mt-1">Gerencie suas reuniões agendadas</p>
        </div>
        <Button onClick={() => navigate("/dashboard/meetings/new")} className="gap-2">
          <Plus className="h-4 w-4" /> Nova Reunião
        </Button>
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Título</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Data</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Horário</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Participantes</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((m) => (
                  <tr key={m.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="p-4 font-medium text-foreground">{m.title}</td>
                    <td className="p-4 text-sm text-muted-foreground">{new Date(m.date).toLocaleDateString("pt-BR")}</td>
                    <td className="p-4 text-sm text-muted-foreground">{m.time}</td>
                    <td className="p-4 text-sm text-muted-foreground">{m.participants.length}</td>
                    <td className="p-4">
                      <Badge variant="outline" className={statusColors[m.status]}>{m.status}</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/dashboard/meetings/${m.id}`)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/dashboard/meetings/${m.id}`)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        {m.status === "confirmada" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleCancel(m.title)}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-border">
            {meetings.map((m) => (
              <div key={m.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{m.title}</p>
                    <p className="text-sm text-muted-foreground">{new Date(m.date).toLocaleDateString("pt-BR")} · {m.time}</p>
                  </div>
                  <Badge variant="outline" className={statusColors[m.status]}>{m.status}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/dashboard/meetings/${m.id}`)}>Ver detalhes</Button>
                  {m.status === "confirmada" && (
                    <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleCancel(m.title)}>Cancelar</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyMeetings;
