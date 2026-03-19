import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const CreateMeeting = () => {

  const navigate = useNavigate();
  const { toast } = useToast();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [inicio, setInicio] = useState("");
  const [termino, setTermino] = useState("");
  const [participantes, setParticipantes] = useState("");

  const [salas, setSalas] = useState<any[]>([]);
  const [salaId, setSalaId] = useState("");
 
  useEffect(() => {

    const carregarSalas = async () => {

      try {

        const data = await api("/salas/disponiveis", "GET");

        setSalas(data);

      } catch (error) {

        console.error("Erro ao carregar salas", error);

      }

    };

    carregarSalas();

  }, []);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      await api("/reunioes/criar", "POST", {
        titulo,
        descricao,
        data,
        inicio,
        termino,
        salaId,
        participantesEmails: participantes
          .split(",")
          .map((p) => p.trim())
      });

      toast({
        title: "Reunião criada!",
        description: "A reunião foi agendada com sucesso."
      });

      navigate("/dashboard/meetings");

    } catch (error) {

      toast({
        title: "Erro",
        description: "Não foi possível criar a reunião.",
        variant: "destructive"
      });

    }

  };

  return (

    <div className="max-w-3xl mx-auto p-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-muted-foreground"
      >
        ← Voltar
      </button>

      <div className="bg-white shadow rounded-xl p-6">

        <h1 className="text-2xl font-bold mb-6">
          Nova Reunião
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm font-medium">
              Título da reunião
            </label>

            <input
              type="text"
              placeholder="Ex: Reunião de Sprint"
              className="w-full mt-1 border rounded-md p-2"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Descrição
            </label>

            <textarea
              placeholder="Detalhes da reunião..."
              className="w-full mt-1 border rounded-md p-2"
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">

            <div>
              <label className="text-sm font-medium">
                Data
              </label>

              <input
                type="date"
                className="w-full mt-1 border rounded-md p-2"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Início
              </label>

              <input
                type="time"
                className="w-full mt-1 border rounded-md p-2"
                value={inicio}
                onChange={(e) => setInicio(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Término
              </label>

              <input
                type="time"
                className="w-full mt-1 border rounded-md p-2"
                value={termino}
                onChange={(e) => setTermino(e.target.value)}
                required
              />
            </div>

          </div>

          <div>
            <label className="text-sm font-medium">
              Participantes (emails separados por vírgula)
            </label>

            <input
              type="text"
              placeholder="joao@email.com, maria@email.com"
              className="w-full mt-1 border rounded-md p-2"
              value={participantes}
              onChange={(e) => setParticipantes(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Sala
            </label>

            <select
              className="w-full mt-1 border rounded-md p-2"
              value={salaId}
              onChange={(e) => setSalaId(e.target.value)}
              required
            >

              <option value="">
                Selecione uma sala
              </option>

              {salas.map((sala) => (
                <option key={sala.id} value={sala.id}>
                  {sala.nome}
                </option>
              ))}

            </select>

          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md"
          >
            Salvar Reunião
          </button>

        </form>

      </div>

    </div>

  );

};

export default CreateMeeting;
