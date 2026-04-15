import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

const CalendarPage = () => {

  const navigate = useNavigate();

  const [meetings, setMeetings] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const carregarReunioes = async () => {
    try {
      const data = await api("/reunioes/minhas");

      const formatado = data.map((r: any) => ({
        id: r.id,
        title: r.titulo,
        date: r.data, 
        time: r.inicio?.slice(0, 5),
        status: r.status?.toLowerCase()
      }));

      setMeetings(formatado);

    } catch (e) {
      console.error("Erro ao carregar reuniões", e);
    }
  };

  useEffect(() => {
    carregarReunioes();
  }, []);

  const meetingsByDate = meetings.reduce((acc: any, meeting) => {
    if (!acc[meeting.date]) {
      acc[meeting.date] = [];
    }
    acc[meeting.date].push(meeting);
    return acc;
  }, {});

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];

  const dayNames = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getDateKey = (day: number) =>
    `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div className="space-y-6 animate-fade-in">

      <div>
        <h1 className="text-2xl font-bold">Calendário</h1>
        <p className="text-muted-foreground text-sm">
          Visualize suas reuniões por mês
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <CardTitle>
              {monthNames[month]} {year}
            </CardTitle>

            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-7 gap-px">

            {dayNames.map((d) => (
              <div key={d} className="text-center text-xs py-2">
                {d}
              </div>
            ))}

            {cells.map((day, i) => {
              const dateKey = day ? getDateKey(day) : "";
              const events = day ? meetingsByDate[dateKey] || [] : [];

              return (
                <div
                  key={i}
                  className={`min-h-[100px] p-2 border rounded-md ${
                    day ? "bg-card" : ""
                  } ${day && isToday(day) ? "ring-2 ring-primary/30" : ""}`}
                >
                  {day && (
                    <>
                      <span className="text-xs font-medium">
                        {day}
                      </span>

                      <div className="mt-1 space-y-1">
                        {events.map((evt: any) => (
                          <button
                            key={evt.id}
                            onClick={() =>
                              navigate(`/dashboard/meetings/${evt.id}`)
                            }
                            className="w-full text-left text-xs px-1 py-0.5 rounded bg-primary/10 text-primary truncate"
                          >
                            {evt.time} {evt.title}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage;