import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Eye, Pencil, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { api } from "../lib/api";
import { useEffect, useState } from "react";

const formatarData = (data: string) => {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
};

const statusColors: Record<string, string> = {
  confirmada: "bg-success/10 text-success border-success/20",
  cancelada: "bg-destructive/10 text-destructive border-destructive/20",
  concluida: "bg-muted text-muted-foreground border-muted",
};

const MyMeetings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [meetings, setMeetings] = useState<any[]>([]);

  useEffect(() => {
    const carregarReunioes = async () => {
      try {
        const data = await api("/reunioes/minhas");

        console.log("REUNIOES BACK:", data); // 🔥 DEBUG

        const formatado = data.map((r: any) => {
          console.log("REUNIAO:", r); // 🔥 DEBUG

          return {
            id: r.id, 
            title: r.titulo,
            date: r.data,
            time: `${r.inicio?.slice(0, 5)} - ${r.termino?.slice(0, 5)}`, // 🔥 corrigido
            participants: r.participantes || [],
            status: r.status?.toLowerCase()
          };
        });

        setMeetings(formatado);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar as reuniões",
        });
      }
    };

    carregarReunioes();
  }, []);

  const handleCancel = async (id: number, title: string) => {
  try {
    await api(`/reunioes/cancelar/${id}`, "PUT");

    toast({
      title: "Reunião cancelada",
      description: `"${title}" foi cancelada.`,
    });

    // 🔥 atualiza lista
    setMeetings((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: "cancelada" } : m
      )
    );

  } catch (error) {
    toast({
      title: "Erro",
      description: "Não foi possível cancelar a reunião",
      variant: "destructive",
    });
  }
};

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Minhas Reuniões
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gerencie suas reuniões agendadas
          </p>
        </div>

        <Button
          onClick={() => navigate("/dashboard/meetings/new")}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Nova Reunião
        </Button>
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left text-sm text-muted-foreground">Título</th>
                  <th className="p-4 text-left text-sm text-muted-foreground">Data</th>
                  <th className="p-4 text-left text-sm text-muted-foreground">Horário</th>
                  <th className="p-4 text-left text-sm text-muted-foreground">Participantes</th>
                  <th className="p-4 text-left text-sm text-muted-foreground">Status</th>
                  <th className="p-4 text-right text-sm text-muted-foreground">Ações</th>
                </tr>
              </thead>

              <tbody>
                {meetings.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-border/50 hover:bg-secondary/30"
                  >
                    <td className="p-4 font-medium">{m.title}</td>

                    <td className="p-4 text-sm text-muted-foreground">
                      {formatarData(m.date)}
                    </td>

                    <td className="p-4 text-sm text-muted-foreground">
                      {m.time}
                    </td>

                    <td className="p-4 text-sm text-muted-foreground">
                      {m.participants.length}
                    </td>

                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={statusColors[m.status]}
                      >
                        {m.status}
                      </Badge>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1">

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            console.log("ID clicado:", m.id);

                            if (!m.id) {
                              console.error("ID inválido:", m);
                              return;
                            }

                            navigate(`/dashboard/meetings/${m.id}`);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        {/* ✏️ EDITAR */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            navigate(`/dashboard/meetings/${m.id}`)
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        {m.status === "confirmada" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => handleCancel(m.id, m.title)}
                          >
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

          {/* MOBILE */}
          <div className="md:hidden divide-y divide-border">
            {meetings.map((m) => (
              <div key={m.id} className="p-4 space-y-3">

                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{m.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {m.date.split("-").reverse().join("/")} · {m.time}
                    </p>
                  </div>

                  <Badge
                    variant="outline"
                    className={statusColors[m.status]}
                  >
                    {m.status}
                  </Badge>
                </div>

                <div className="flex gap-2">

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      console.log("ID clicado:", m.id);

                      if (!m.id) {
                        console.error("ID inválido:", m);
                        return;
                      }

                      navigate(`/dashboard/meetings/${m.id}`);
                    }}
                  >
                    Ver detalhes
                  </Button>

                  {(m.status?.toLowerCase() || "confirmada") === "confirmada" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleCancel(m.id, m.title)}
                    >
                      Cancelar
                    </Button>
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