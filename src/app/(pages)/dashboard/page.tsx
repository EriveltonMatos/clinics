"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/api/AuthContext";
import { useRouter } from "next/navigation";
import NavBar from "@/components/navbar-components/Navbar";
import TestStatusBadge, { TestStatus } from "@/components/TestStatusBadge";
import MobileNav from "@/components/navbar-components/MobileNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaArrowLeft, FaSignOutAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Calendar,
  ClipboardList,
  ClipboardX,
  FileText,
  FlaskConical,
  Microscope,
  Layers,
  Clock,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { RequisitionTest, Requisition, GroupedTests } from '@/types/types';
import { ModeToggle } from "@/components/ModeToggle";

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const [requisitions, setRequisitions] = useState<Requisition[]>([]);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_LAB_REPORT_PATH = process.env.NEXT_PUBLIC_API_LAB_REPORT_PATH;

  const calculateEstimatedDate = (requisitionDate: string, estimatedDays: number): string => {
    const reqDate = new Date(requisitionDate);
    const estimatedDate = new Date(reqDate.getTime() + (estimatedDays * 24 * 60 * 60 *1000)); 
    return estimatedDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const userInitial = user?.fullname.charAt(0).toUpperCase();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
  
    if (user && !loading) {
      const fetchRequisitions = async () => {
        try {
          const decodedPassword = atob(user.password);  
  
          const response = await fetch(
            `${API_BASE_URL}/patient/requisitions?cpf=${user.cpf}&password=${decodedPassword}`
          );
          if (!response.ok) throw new Error("Erro ao buscar os exames");
  
          const data = await response.json();
  
          const sortedRequisitions = data.requisition.sort(
            (a: Requisition, b: Requisition) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );
  
          setRequisitions(sortedRequisitions);
        } catch (error) {
          console.error("Erro ao buscar exames:", error);
        }
      };
      fetchRequisitions();
    }
  }, [user, loading, router]);

  // Função para contar exames concluídos
  const getCompletedTestsCount = () => {
    let count = 0;
    requisitions.forEach((req) => {
      req.requisitionTests.forEach((test) => {
        if (
          test.testStatus === TestStatus.CON ||
          test.testStatus === TestStatus.DEL
        ) {
          count++;
        }
      });
    });
    return count;
  };

  // Função para contar total de testes
  const getTotalTestsCount = () => {
    let count = 0;
    requisitions.forEach((req) => {
      count += req.requisitionTests.length;
    });
    return count;
  };

  // Função para agrupar os testes por grouping
  const groupTestsByGrouping = (tests: RequisitionTest[]): GroupedTests => {
    const grouped: GroupedTests = {};
    
    tests.forEach((test) => {
      const groupName = test.test.grouping || "Sem Grupo";
      
      if (!grouped[groupName]) {
        grouped[groupName] = [];
      }
      
      grouped[groupName].push(test);
    });
    
    return grouped;
  };

  // Se ainda estiver carregando, mostra um indicador
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-slate-900 dark:to-slate-800">
      <NavBar />
      <MobileNav
        links={[{ href: "/", label: "Voltar ao site", icon: <FaArrowLeft /> }]}
      />
      <div className="min-h-screen pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 shadow-lg border-0 dark:border dark:border-slate-600">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-white">
                        {userInitial}
                      </span>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Olá, {user?.fullname}
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Acompanhe seus exames e resultados
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ModeToggle />
                    <button
                      onClick={logout}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl transition-colors font-medium"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      Sair
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
            <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total de Laudos
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {requisitions.length}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total de Exames
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {getTotalTestsCount()}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                    <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Concluídos
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {getCompletedTestsCount()}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Último Exame
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                      {requisitions.length > 0 
                        ? new Date(requisitions[0].date).toLocaleDateString('pt-BR')
                        : '---'
                      }
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                  <ClipboardList className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Histórico de Exames
                </CardTitle>
              </div>
            </CardHeader>
            
             <CardContent className="pt-6">
              {requisitions.length > 0 ? (
                <div className="space-y-4">
                  {requisitions.map((req) => (
                    <Card key={req.id} className="border border-blue-100 dark:border-slate-600 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
                      <CardContent className="p-0">
                        <Accordion type="single" collapsible>
                          <AccordionItem value={req.id} className="border-0">
                            <AccordionTrigger className="px-6 py-4 hover:no-underline bg-white dark:bg-slate-800">
                              <div className="flex items-center gap-4 w-full">
                                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full">
                                  <FlaskConical className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div className="flex-1 text-left">
                                  <h3 className="font-semibold text-blue-900 dark:text-slate-100">
                                    Médico: {req.doctorName}
                                  </h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Calendar className="h-4 w-4 text-indigo-900 dark:text-indigo-300" />
                                    <span className="text-sm text-indigo-900 dark:text-indigo-300 font-medium">
                                      {new Date(req.date).toLocaleDateString('pt-BR')}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right">
                                </div>
                              </div>
                            </AccordionTrigger>
                            
                            <AccordionContent className="px-6 pt-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 ">
                              <div className="space-y-3">
                                
                                {Object.entries(groupTestsByGrouping(req.requisitionTests)).map(([groupName, tests]) => (
                                  <Card key={`${req.id}-${groupName}`} className="border border-indigo-200 dark:border-slate-600 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <CardContent className="p-0">
                                      <Accordion type="multiple">
                                        <AccordionItem value={`${req.id}-${groupName}`} className="border-0">
                                          <AccordionTrigger className="px-4 py-3 hover:no-underline bg-indigo-50 dark:bg-slate-700">
                                            <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
                                              <div className="bg-indigo-200 dark:bg-indigo-800 p-2 rounded-full mr-3">
                                                <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                                              </div>
                                              <span className="font-medium text-indigo-700 dark:text-indigo-200">
                                                {groupName}
                                              </span>
                                              <span className="ml-2 text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 py-1 px-2 rounded-full w-full md:w-auto mt-1 sm:mt-0">
                                                {tests.length} {tests.length === 1 ? "teste" : "testes"}
                                              </span>
                                            </div>
                                          </AccordionTrigger>
                                          
                                          <AccordionContent className="p-2">
                                            <div className="space-y-3">
                                              {tests.map((test) => {
                                                const estimatedDays = test.test.estimated || 0;
                                                const estimatedDate = estimatedDays > 0 ? calculateEstimatedDate(req.date, estimatedDays) : null;
                                                
                                                return (
                                                  <div key={test.id} className="flex flex-col md:flex-row md:items-center justify-between bg-white dark:bg-slate-800 p-3 rounded-lg border-l-4 border-indigo-400 dark:border-indigo-500">
                                                    <div className="flex items-center gap-3">
                                                      <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full">
                                                        <Microscope className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                      </div>
                                                      <div>
                                                        <span className="font-medium text-gray-800 dark:text-slate-200">
                                                          {test.test.description}
                                                        </span>
                                                        <span className="text-sm text-indigo-500 dark:text-indigo-400 ml-2">
                                                          ({test.test.abbreviation})
                                                        </span>
                                                      </div>
                                                    </div>
                                                    
                                                    <div className="flex flex-col gap-2 mt-2 md:mt-0 md:flex-row md:items-center md:justify-between w-full md:w-auto">
                                                      
                                                      {estimatedDate && test.testStatus !== TestStatus.CON && test.testStatus !== TestStatus.DEL && (
                                                        <div className="flex items-center gap-2">
                                                          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                          <p className="text-sm text-blue-700 dark:text-blue-300">
                                                            Previsão: {estimatedDate}
                                                          </p>
                                                        </div>
                                                      )}
                                                      <div className="flex items-center gap-2">
                                                        <p className="text-blue-700 dark:text-blue-300 text-sm">Status:</p>
                                                        <TestStatusBadge status={test.testStatus} />
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          </AccordionContent>
                                        </AccordionItem>
                                      </Accordion>
                                    </CardContent>
                                  </Card>
                                ))}
                                
                                {req.requisitionTests.some(
                                  (test) =>
                                    test.testStatus === TestStatus.CON ||
                                    test.testStatus === TestStatus.DEL
                                ) && (
                                  <button
                                    onClick={() =>
                                      router.push(
                                        `${API_BASE_URL}${API_LAB_REPORT_PATH}/${req.id}`
                                      )
                                    }
                                    className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 transition-colors flex items-center justify-center font-medium shadow-md"
                                  >
                                    <FileText className="h-5 w-5 mr-2" />
                                    Ver Laudo Completo
                                  </button>
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ClipboardX className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Nenhum exame encontrado
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Seus exames aparecerão aqui quando estiverem disponíveis
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}