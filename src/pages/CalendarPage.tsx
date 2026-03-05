import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const meetingsByDate: Record<string, { id: string; title: string; time: string }[]> = {
  "2026-03-05": [
    { id: "1", title: "Reunião de Sprint", time: "09:00" },
    { id: "2", title: "Alinhamento", time: "11:00" },
  ],
  "2026-03-06": [
    { id: "3", title: "Review Semanal", time: "14:00" },
  ],
  "2026-03-10": [
    { id: "6", title: "Planning", time: "10:00" },
  ],
  "2026-03-18": [
    { id: "7", title: "Demo", time: "15:00" },
  ],
};

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // March 2026
  const navigate = useNavigate();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getDateKey = (day: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const today = new Date();
  const isToday = (day: number) => day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Calendário</h1>
        <p className="text-muted-foreground text-sm mt-1">Visualize suas reuniões por mês</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <CardTitle className="text-lg">
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
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
            ))}
            {cells.map((day, i) => {
              const dateKey = day ? getDateKey(day) : "";
              const events = day ? meetingsByDate[dateKey] || [] : [];
              return (
                <div
                  key={i}
                  className={`min-h-[80px] md:min-h-[100px] p-1.5 border border-border/30 rounded-md transition-colors ${
                    day ? "bg-card hover:bg-secondary/30" : "bg-transparent"
                  } ${isToday(day!) ? "ring-2 ring-primary/30" : ""}`}
                >
                  {day && (
                    <>
                      <span className={`text-xs font-medium ${isToday(day) ? "text-primary font-bold" : "text-foreground"}`}>
                        {day}
                      </span>
                      <div className="mt-1 space-y-0.5">
                        {events.map((evt) => (
                          <button
                            key={evt.id}
                            onClick={() => navigate(`/dashboard/meetings/${evt.id}`)}
                            className="w-full text-left text-[10px] md:text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary truncate hover:bg-primary/20 transition-colors"
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
