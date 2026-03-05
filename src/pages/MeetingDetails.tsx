import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CalendarDays, Clock, MapPin, Users, Pencil, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const meetingsData: Record<string, { title: string; description: string; date: string; time: string; participants: string[]; location: string; status: string }> = {
  "1": { title: "Reunião de Sprint", description: "Planejamento do sprint 14 com toda a equipe de desenvolvimento.", date: "2026-03-05", time: "09:00 - 10:00", participants: ["ana@email.com", "carlos@email.com", "julia@email.com", "marcos@email.com", "fernanda@email.com"], location: "https://meet.google.com/abc-defg-hij", status: "confirmada" },
  "2": { title: "Alinhamento de Projeto", description: "Revisão do progresso do projeto X com stakeholders.", date: "2026-03-05", time: "11:00 - 11:30", participants: ["maria@email.com", "pedro@email.com", "lucas@email.com"], location: "Sala de reuniões 3 - 2º andar", status: "confirmada" },
  "3": { title: "Review Semanal", description: "Apresentação dos entregáveis da semana para o time.", date: "2026-03-06", time: "14:00 - 15:00", participants: ["time@email.com", "lead@email.com", "gestor@email.com"], location: "https://zoom.us/j/123456789", status: "confirmada" },
};

const statusColors: Record<string, string> = {
  confirmada: "bg-success/10 text-success border-success/20",
  cancelada: "bg-destructive/10 text-destructive border-destructive/20",
  "concluída": "bg-muted text-muted-foreground border-muted",
};

const MeetingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const meeting = meetingsData[id || ""];

  if (!meeting) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <p className="text-muted-foreground">Reunião não encontrada.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/dashboard/meetings")}>Voltar</Button>
      </div>
    );
  }

  const handleCancel = () => {
    toast({ title: "Reunião cancelada", description: `"${meeting.title}" foi cancelada.` });
    navigate("/dashboard/meetings");
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 gap-2 text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Button>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-xl">{meeting.title}</CardTitle>
            <Badge variant="outline" className={statusColors[meeting.status]}>{meeting.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">{meeting.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CalendarDays className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Data</p>
                <p className="text-sm text-muted-foreground">{new Date(meeting.date).toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Horário</p>
                <p className="text-sm text-muted-foreground">{meeting.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Local / Link</p>
                <p className="text-sm text-muted-foreground break-all">{meeting.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Participantes ({meeting.participants.length})</p>
                <div className="mt-1 space-y-0.5">
                  {meeting.participants.map((p) => (
                    <p key={p} className="text-sm text-muted-foreground">{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button variant="outline" className="gap-2" onClick={() => navigate(`/dashboard/meetings/new`)}>
              <Pencil className="h-4 w-4" /> Editar
            </Button>
            {meeting.status === "confirmada" && (
              <Button variant="outline" className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={handleCancel}>
                <X className="h-4 w-4" /> Cancelar Reunião
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingDetails;
