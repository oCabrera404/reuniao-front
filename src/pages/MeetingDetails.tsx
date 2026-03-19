import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const MeetingDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const [meeting, setMeeting] = useState<any>(null);

  useEffect(() => {
    carregarDetalhes();
  }, []);

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

  if (!meeting) {
    return <p className="p-4">Carregando...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{meeting.titulo}</h1>

      <Card>
        <CardContent className="space-y-3 p-4">

          <p>
            <strong>Data:</strong>{" "}
            {new Date(meeting.data).toLocaleDateString("pt-BR")}
          </p>

          <p>
            <strong>Horário:</strong>{" "}
            {meeting.inicio?.slice(0, 5)} - {meeting.termino?.slice(0, 5)}
          </p>

          <p>
            <strong>Sala:</strong> {meeting.sala?.nome}
          </p>

          <p>
            <strong>Descrição:</strong> {meeting.descricao}
          </p>

          <div>
            <strong>Participantes:</strong>
            <ul className="list-disc ml-6 mt-1">
              {meeting.participantes?.map((p: any) => (
                <li key={p.id}>{p.email}</li>
              ))}
            </ul>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingDetails;