import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground text-sm mt-1">Gerencie suas preferências</p>
      </div>

      <Card className="glass-card">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
            <SettingsIcon className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Página de configurações em construção.</p>
          <p className="text-sm text-muted-foreground mt-1">Em breve você poderá personalizar seu perfil e notificações.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
