"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/api/AuthContext";
import { useRouter } from "next/navigation";
import NavBar from "@/components/Navbar";
import TestStatusBadge, { TestStatus } from "@/components/TestStatusBadge";
import MobileNav from "@/components/MobileNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaArrowLeft, FaSignOutAlt } from "react-icons/fa";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BarChart3,
  Calendar,
  ClipboardList,
  ClipboardX,
  FileText,
  FlaskConical,
  Microscope,
  Layers,
} from "lucide-react";
import { RequisitionTest, Requisition, GroupedTests } from '@/types/types';


export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const [requisitions, setRequisitions] = useState<Requisition[]>([]);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_LAB_REPORT_PATH = process.env.NEXT_PUBLIC_API_LAB_REPORT_PATH;

  useEffect(() => {
    // Aguarda o carregamento do contexto de autenticação
    if (!loading && !user) {
      router.push("/login");
      return;
    }
  
    // Apenas busca requisições se o usuário estiver autenticado e o carregamento concluído
    if (user && !loading) {
      const fetchRequisitions = async () => {
        try {
          // Decodificar a senha antes de usá-la na API
          const decodedPassword = atob(user.password);  // Aqui você decodifica a senha
  
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

  // Função para agrupar os testes por grouping
  const groupTestsByGrouping = (tests: RequisitionTest[]): GroupedTests => {
    const grouped: GroupedTests = {};
    
    tests.forEach((test) => {
      const groupName = test.test.grouping || "Sem Grupo"; // Caso não tenha grupo
      
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
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não houver usuário após o carregamento, isso será tratado pelo useEffect

  const userInitial = user?.fullname.charAt(0).toUpperCase();

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <NavBar />
      <MobileNav
        links={[{ href: "/", label: "Voltar ao site", icon: <FaArrowLeft /> }]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 mt-12">
        <div className="mx-auto md:mx-10 px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Perfil do Usuário */}
            <Card className="lg:col-span-3 bg-white/50 backdrop-blur">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <div className="md:h-16 h-8 md:w-16 w-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                    <span className="md:text-2xl font-bold text-white">
                      {userInitial}
                    </span>
                  </div>
                  <div>
                    <h1 className="md:text-2xl text-xl font-bold text-blue-900">
                      Bem-vindo, {user?.fullname}
                    </h1>
                    <p className="text-gray-500">
                      Seus exames estão disponíveis abaixo
                    </p>
                  </div>
                </div>
                <div className="">
                  <button
                    onClick={logout}
                    className="md:mt-0 p-2 flex bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors group gap-1 font-medium"
                  >
                    <FaSignOutAlt className="md:w-5 md:h-5 md:mt-0.5 mt-1 group-hover:rotate-180 transition-transform " />
                    Sair
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Exames */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg border-0">
                <CardHeader className="border-b border-blue-100 pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-500 p-2 rounded-lg">
                      <ClipboardList className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-blue-900 font-bold">
                      Histórico de Exames Realizados
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ScrollArea className="h-auto">
                    {requisitions.length > 0 ? (
                      <Accordion
                        type="single"
                        collapsible
                        className="space-y-4"
                      >
                        {requisitions.map((req) => (
                          <AccordionItem
                            key={req.id}
                            value={req.id}
                            className="border border-blue-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                          >
                            <AccordionTrigger className="hover:no-underline p-5 bg-white">
                              <div className="flex items-center w-full">
                                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                  <FlaskConical className="h-5 w-5 text-indigo-600" />
                                </div>
                                <div className="flex-1 text-left ">
                                  <h3 className="font-semibold text-blue-900">
                                    Médico: {req.doctorName}
                                  </h3>
                                  <p className="text-sm font-medium text-indigo-900 flex items-center mt-1">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {new Date(req.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="bg-gradient-to-r from-indigo-50 to-blue-50">
                              <div className="p-6 space-y-5">
                                <h4 className="font-medium text-indigo-800 flex items-center">
                                  <FlaskConical className="h-5 w-5 mr-2 text-indigo-600" />
                                  Testes Solicitados:
                                </h4>
                                
                                {/* Accordion aninhado para os grupos */}
                                <Accordion type="multiple" className="space-y-3">
                                  {Object.entries(groupTestsByGrouping(req.requisitionTests)).map(([groupName, tests]) => (
                                    <AccordionItem 
                                      key={`${req.id}-${groupName}`} 
                                      value={`${req.id}-${groupName}`}
                                      className="border border-indigo-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                                    >
                                      <AccordionTrigger className="hover:no-underline p-3 bg-indigo-50">
                                        <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
                                          <div className="bg-indigo-200 p-2 rounded-full mr-3">
                                            <Layers className="h-4 w-4 text-indigo-600" />
                                          </div>
                                          <span className="font-medium text-indigo-700">
                                            {groupName}
                                          </span>
                                          <span className="ml-2 text-xs bg-indigo-100 text-indigo-600 py-1 px-2 rounded-full w-full md:w-auto mt-1 sm:mt-0">
                                          {tests.length} {tests.length === 1 ? "teste" : "testes"}
                                          </span>
                                        </div>
                                        
                                      </AccordionTrigger>
                                      <AccordionContent className="p-2">
                                        <ul className="space-y-2">
                                          {tests.map((test) => (
                                            <li
                                              key={test.id}
                                              className="flex flex-col md:flex-row md:items-center justify-between bg-white p-3 rounded-lg border-l-4 border-indigo-400"
                                            >
                                              <div className="flex items-center gap-3">
                                                <div className="bg-indigo-100 p-2 rounded-full">
                                                  <Microscope className="h-4 w-4 text-indigo-600" />
                                                </div>
                                                <div>
                                                  <span className="font-medium text-gray-800">
                                                    {test.test.description}
                                                  </span>
                                                  <span className="text-sm text-indigo-500 ml-2">
                                                    ({test.test.abbreviation})
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 md:mt-0 p-2">
                                                <p className="text-blue-700">
                                                  Status:
                                                </p>
                                                <TestStatusBadge
                                                  status={test.testStatus}
                                                />
                                              </div>
                                            </li>
                                          ))}
                                        </ul>
                                      </AccordionContent>
                                    </AccordionItem>
                                  ))}
                                </Accordion>
                                
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
                                    className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-colors flex items-center justify-center font-medium shadow-md"
                                  >
                                    <FileText className="h-5 w-5 mr-2" />
                                    Ver Laudo Completo
                                  </button>
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <div className="text-center py-12 bg-white rounded-xl">
                        <div className="bg-blue-50 p-4 rounded-full inline-block mb-4">
                          <ClipboardX className="h-8 w-8 text-blue-400" />
                        </div>
                        <p className="text-gray-600 font-medium">
                          Nenhum exame encontrado
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Seus exames aparecerão aqui quando estiverem
                          disponíveis
                        </p>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Resumo/Estatísticas */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg border-0">
              <CardHeader className="border-b border-blue-100 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-blue-900 font-bold">
                    Resumo
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-5">
                  <div className="bg-white rounded-xl p-3.5 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-3 rounded-full mr-4">
                        <ClipboardList className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-sm text-indigo-500 font-medium">
                          Total de Laudos
                        </div>
                        <div className="text-2xl font-bold text-blue-900 mt-1">
                          {requisitions.length}
                        </div>
                      </div>
                    </div>
                  </div>

                  {requisitions.length > 0 && (
                    <>
                      <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center">
                          <div className="bg-emerald-100 p-3 rounded-full mr-4">
                            <FileText className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <div className="text-sm text-emerald-500 font-medium">
                              Exames Concluídos
                            </div>
                            <div className="text-xl font-bold text-blue-900 mt-1">
                              {getCompletedTestsCount()}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center">
                          <div className="bg-indigo-100 p-3 rounded-full mr-4">
                            <Calendar className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <div className="text-sm text-indigo-500 font-medium">
                              Último Exame
                            </div>
                            <div className="text-xl font-bold text-blue-900 mt-1">
                              {new Date(
                                requisitions[0].date
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
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