import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { api } from "../lib/api";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";


const statusColors: Record<string, string> = {
  confirmada: "bg-success/10 text-success border-success/20",
  cancelada: "bg-destructive/10 text-destructive border-destructive/20",
  concluida: "bg-muted text-muted-foreground border-muted",
};

const MeetingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const [meeting, setMeeting] = useState<any>(null);

  useEffect(() => {
    carregarDetalhes();
  }, []);

  const carregarDetalhes = async () => {
    try {
      const data = await api(`/reunioes/${id}`);

      const formatado = {
        id: data.id,
        title: data.titulo,
        description: data.descricao,
        date: data.data,
        time: `${data.inicio?.slice(0, 5)} - ${data.termino?.slice(0, 5)}`,
        room: data.sala?.nome || "Sem sala",
        participants: data.participantes || [],
        status: "confirmada",
      };

      setMeeting(formatado);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar a reunião",
        variant: "destructive",
      });
    }
  };

  if (!meeting) {
    return <p className="p-4">Carregando...</p>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {meeting.title}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Detalhes da reunião
          </p>
        </div>

        <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      </div>

      {/* Card principal */}
      <Card className="glass-card">
        <CardContent className="p-6 space-y-4">

          <div className="flex justify-between items-center">
            <p className="text-muted-foreground text-sm">
              {new Date(meeting.date).toLocaleDateString("pt-BR")} · {meeting.time}
            </p>

            <Badge
              variant="outline"
              className={statusColors[meeting.status]}
            >
              {meeting.status}
            </Badge>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">Sala</p>
            <p className="text-muted-foreground">{meeting.room}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">Descrição</p>
            <p className="text-muted-foreground">
              {meeting.description || "Sem descrição"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">
              Participantes ({meeting.participants.length})
            </p>

            <ul className="mt-2 space-y-1">
              {meeting.participants.map((p: any) => (
                <li
                  key={p.id}
                  className="text-sm text-muted-foreground border-b border-border pb-1"
                >
                  {p.email}
                </li>
              ))}
            </ul>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingDetails;