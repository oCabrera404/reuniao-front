import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const CreateMeeting = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Reunião criada!", description: `"${title}" foi agendada com sucesso.` });
    navigate("/dashboard/meetings");
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 gap-2 text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Button>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Nova Reunião</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Título da reunião</Label>
              <Input id="title" placeholder="Ex: Reunião de Sprint" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" placeholder="Detalhes da reunião..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start">Início</Label>
                <Input id="start" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end">Término</Label>
                <Input id="end" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="participants">Participantes (emails separados por vírgula)</Label>
              <Input id="participants" placeholder="joao@email.com, maria@email.com" value={participants} onChange={(e) => setParticipants(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Local ou link</Label>
              <Input id="location" placeholder="Sala 01 ou https://meet.google.com/..." value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <Button type="submit" className="w-full">Salvar Reunião</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateMeeting;
