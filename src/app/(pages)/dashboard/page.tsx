"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/api/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, FileText, User } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NavBar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';

interface Exame {
  id: string;
  name: string;
  date: string;
  doctor: string;
  reportId: string;
}

const API_BASE_URL = "http://130.11.0.35:8080/health-service";

const sortExamesByDate = (exames: Exame[]) => {
  return exames.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
};

const ExameAccordionItem = ({ exame }: { exame: Exame }) => {
  const pdfUrl = `${API_BASE_URL}/laboratory-report/view/${exame.reportId}`;
  
  return (
    <AccordionItem value={exame.id.toString()} className="border-blue-100">
      <AccordionTrigger className="hover:bg-blue-50/50 px-4 py-2 rounded-lg">
        <div className="flex items-center space-x-4 w-full p-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-lg">{exame.name}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(`${exame.date}T00:00:00`).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {exame.doctor}
              </div>
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="p-4 bg-white rounded-lg mt-2">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Visualizar Exame
            </h4>
            <div className="w-full h-[700px] rounded-lg overflow-hidden border border-gray-200">
              <iframe
                src={pdfUrl}
                className="w-full h-full"
                title={`PDF do Exame ${exame.name}`}
              />
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default function Dashboard() {
  const [exames, setExames] = useState<Exame[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchExames = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/laboratory-reports`, {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });
        
        const formattedExames = response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          date: item.date,
          doctor: item.doctor,
          reportId: item.reportId
        }));
        
        setExames(formattedExames);
      } catch (error) {
        console.error('Erro ao buscar exames:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExames();
  }, [user, router]);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    );
  }

  const sortedExames = sortExamesByDate(exames);
  const lastExame = sortedExames[0];

  // Garantir que temos um nome de usuário, mesmo que seja vazio
  const username = user?.username || 'Usuário';
  const userInitial = username.charAt(0).toUpperCase();

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <NavBar />
      <MobileNav links={[{href: "/", label: "Voltar ao site", icon: <FaArrowLeft /> }]} />  
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 mt-12">
        <div className="mx-auto md:mx-10 px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Perfil do Usuário */}
            <Card className="lg:col-span-3 bg-white/50 backdrop-blur">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {userInitial}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">
                      Bem-vindo, {user?.username}
                    </h1>
                    <p className="text-gray-500">
                      Seus exames estão disponíveis abaixo
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Exames */}
            <div className="lg:col-span-2">
              <Card className="bg-white/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Seus Exames Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[60vh]">
                    {exames.length > 0 ? (
                      <Accordion type="single" collapsible className="space-y-4">
                        {sortedExames.map((exame) => (
                          <ExameAccordionItem key={exame.id} exame={exame} />
                        ))}
                      </Accordion>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        Nenhum exame encontrado
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Resumo/Estatísticas */}
            <Card className="bg-white/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-500">Total de Exames</div>
                    <div className="text-2xl font-bold">{exames.length}</div>
                  </div>
                  {lastExame && (
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-500">Último Exame</div>
                      <div className="text-2xl font-bold">
                        {new Date(`${lastExame.date}T00:00:00`).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}