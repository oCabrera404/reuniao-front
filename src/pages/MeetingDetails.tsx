import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  confirmada: "bg-success/10 text-success border-success/20",
  cancelada: "bg-destructive/10 text-destructive border-destructive/20",
  finalizada: "bg-muted text-muted-foreground border-muted",
};

const MeetingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [meeting, setMeeting] = useState<any>(null);

  const carregarDetalhes = async () => {
    try {
      const data = await api(`/reunioes/${id}`);
      setMeeting(data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar a reunião",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    carregarDetalhes();
  }, [id]);

  if (!meeting) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Carregando reunião...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {meeting.titulo}
            </h1>
            <p className="text-muted-foreground text-sm">
              Detalhes da reunião
            </p>
          </div>
        </div>

        <Badge
          variant="outline"
          className={statusColors[meeting.status?.toLowerCase()]}
        >
          {meeting.status}
        </Badge>
      </div>

      {/* CARD PRINCIPAL */}
      <Card className="glass-card">
        <CardContent className="p-6 space-y-6">

          {/* GRID INFO */}
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-muted-foreground">Data</p>
              <p className="font-medium">
                {new Date(meeting.data).toLocaleDateString("pt-BR")}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Horário</p>
              <p className="font-medium">
                {meeting.inicio?.slice(0, 5)} - {meeting.termino?.slice(0, 5)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Sala</p>
              <p className="font-medium">
                {meeting.sala?.nome || "—"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Participantes</p>
              <p className="font-medium">
                {meeting.participantes?.length || 0}
              </p>
            </div>

          </div>

          {/* DESCRIÇÃO */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Descrição
            </p>

            <div className="bg-secondary/30 rounded-lg p-4 text-sm">
              {meeting.descricao || "Sem descrição"}
            </div>
          </div>

          {/* PARTICIPANTES */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Participantes
            </p>

            <div className="flex flex-wrap gap-2">
              {meeting.participacoes?.map((p: any) => (
                <Badge key={p.id} variant="secondary">
                  {p.usuario?.email} ({p.status})
                </Badge>
              ))}
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingDetails;