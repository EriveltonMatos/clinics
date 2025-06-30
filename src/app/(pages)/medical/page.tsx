"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/navbar-components/Navbar";
import TestStatusBadge, { TestStatus } from "@/components/TestStatusBadge";
import MobileNav from "@/components/navbar-components/MobileNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  BarChart3,
  Calendar,
  ClipboardList,
  ClipboardX,
  FileText,
  Clock,
  Users,
  User,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  CheckCircle,
} from "lucide-react";
import { Requisition } from "@/types/types";
import { Dialog } from "primereact/dialog";
import Link from "next/link";

interface Patient {
  birthDate: string;
  fullname: string;
  cpf: string;
  rg: {
    id: string;
    number: string;
    issuingAgency: string;
    issuingState: string;
    issueDate: string;
  };
}

interface PatientWithRequisitions extends Patient {
  requisitions?: Requisition[];
}

export default function Medical() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] =
    useState<PatientWithRequisitions | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingRequisitions, setLoadingRequisitions] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchCpf, setSearchCpf] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // Novo estado
  const [displayPdfModal, setDisplayPdfModal] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_TEST_URL;
  const API_LAB_REPORT_PATH = process.env.NEXT_PUBLIC_API_LAB_REPORT_PATH;

  const fetchPatients = async () => {
    // Só busca se houver algum termo de pesquisa
    if (!searchName.trim() && !searchCpf.trim()) {
      setPatients([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);
    try {
      let baseUrl = `${API_BASE_URL}/patient/patients-by-requisition`;

      const params = new URLSearchParams();
      if (searchName.trim()) {
        params.append("name", searchName.trim());
      }
      if (searchCpf.trim()) {
        params.append("cpf", searchCpf.trim());
      }

      const url = `${baseUrl}?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Erro ao buscar pacientes");

      const data = await response.json();
      let filteredPatients = [];
      if (data.content) {
        // Filtrar apenas pacientes que têm requisições com exames concluídos
        filteredPatients = data.content
          .filter((item: any) => {
            // Verifica se tem requisições
            if (!item.requisition || item.requisition.length === 0) {
              return false;
            }

            // Verifica se pelo menos uma requisição tem exames concluídos
            const hasCompletedExams = item.requisition.some((req: any) => {
              const hasCompleted =
                req.requisitionTests &&
                req.requisitionTests.some(
                  (test: any) =>
                    test.testStatus === TestStatus.CON ||
                    test.testStatus === TestStatus.DEL
                );
              return hasCompleted;
            });

            return hasCompletedExams;
          })
          .map((item: { patient: any }) => item.patient); // Extrai apenas os dados do paciente
      } else if (data.patients) {
        // Se tem uma propriedade patients (formato alternativo)
        filteredPatients = data.patients.filter((patient: any) => {
          if (!patient.requisitions || patient.requisitions.length === 0) {
            return false;
          }
          return patient.requisitions.some((req: any) => {
            return (
              req.requisitionTests &&
              req.requisitionTests.some(
                (test: any) =>
                  test.testStatus === TestStatus.CON ||
                  test.testStatus === TestStatus.DEL
              )
            );
          });
        });
      } else if (Array.isArray(data)) {
        // Se data é um array direto - verificar estrutura
        filteredPatients = data
          .filter((item: any) => {
            if (item.requisition) {
              return item.requisition.some((req: any) => {
                return (
                  req.requisitionTests &&
                  req.requisitionTests.some(
                    (test: any) =>
                      test.testStatus === TestStatus.CON ||
                      test.testStatus === TestStatus.DEL
                  )
                );
              });
            }
            return false;
          })
          .map((item: any) => item.patient || item);
      }

      setPatients(filteredPatients);
      setTotalPages(Math.ceil(filteredPatients.length / pageSize));
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientRequisitions = async (patient: Patient) => {
    setLoadingRequisitions(true);
    try {
      // Assumindo que você tem um endpoint para buscar requisições por CPF
      const response = await fetch(
        `${API_BASE_URL}/patient/patients-by-requisition`
      );

      if (!response.ok) throw new Error("Erro ao buscar exames do paciente");

      const data = await response.json();
      const patientData = data.content.find(
        (item: any) => item.patient.cpf === patient.cpf
      ); // Find the patient's data

      const sortedRequisitions =
        patientData?.requisition?.sort(
          // Access requisitions from patientData
          (a: Requisition, b: Requisition) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        ) || [];

      setSelectedPatient({
        ...patient,
        requisitions: sortedRequisitions,
      });
    } catch (error) {
      console.error("Erro ao buscar exames do paciente:", error);
      setSelectedPatient({
        ...patient,
        requisitions: [],
      });
    } finally {
      setLoadingRequisitions(false);
    }
  };

  const handleSearch = () => {
    if (!searchName.trim() && !searchCpf.trim()) {
      alert("Por favor, digite um nome ou CPF para pesquisar");
      return;
    }
    setCurrentPage(1);
    fetchPatients();
  };
  const clearFilters = () => {
    setSearchName("");
    setSearchCpf("");
    setCurrentPage(1);
    setPatients([]);
    setHasSearched(false);
  };

  const handlePatientSelect = (patient: Patient) => {
    fetchPatientRequisitions(patient);
  };

  // Função para verificar se uma requisição tem pelo menos um exame concluído
  const hasCompletedTests = (requisition: Requisition): boolean => {
    return requisition.requisitionTests.some(
      (test) =>
        test.testStatus === TestStatus.CON || test.testStatus === TestStatus.DEL
    );
  };

  // Função para lidar com o clique na requisição
  const handleRequisitionClick = (requisition: Requisition) => {
    if (hasCompletedTests(requisition)) {
      const url = `${API_BASE_URL}${API_LAB_REPORT_PATH}/${requisition.id}`;
      setPdfUrl(url);
      setDisplayPdfModal(true);
    } 
  };

  if (loading && hasSearched) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Buscando pacientes...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <NavBar />
      <MobileNav
        links={[{ href: "/", label: "Voltar ao site", icon: <FaArrowLeft /> }]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 mt-12">
        <div className="mx-auto md:mx-10 px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Header */}
            <Card className="lg:col-span-3 bg-white/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="md:h-16 h-8 md:w-16 w-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                      <Users className="md:h-8 md:w-8 h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h1 className="md:text-2xl text-xl font-bold text-blue-900">
                        Portal Médico
                      </h1>
                      <p className="text-gray-500">
                        Consulte os exames e laudos dos pacientes
                      </p>
                    </div>
                  </div>
                  {selectedPatient && (
                    <button
                      onClick={() => setSelectedPatient(null)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Voltar à lista
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>

            {!selectedPatient ? (
              <>
                <Card className="lg:col-span-3 bg-white/50 backdrop-blur">
                  <CardHeader className="border-b border-blue-100 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="bg-blue-500 p-2 rounded-lg">
                          <Filter className="h-5 w-5 text-white" />
                        </div>
                        <CardTitle className="text-blue-900 font-bold">
                          Filtros de Busca
                        </CardTitle>
                      </div>
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                      >
                        <Filter className="h-4 w-4" />
                        {showFilters ? "Ocultar" : "Filtros"}
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent
                    className={`pt-6 ${
                      showFilters ? "block" : "hidden md:block"
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">
                          Nome do Paciente
                        </label>
                        <input
                          type="text"
                          value={searchName}
                          onChange={(e) => setSearchName(e.target.value)}
                          placeholder="Digite o nome..."
                          className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleSearch()
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">
                          CPF do Paciente
                        </label>
                        <input
                          type="text"
                          value={searchCpf}
                          onChange={(e) => setSearchCpf(e.target.value)}
                          placeholder="Digite o CPF..."
                          className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleSearch()
                          }
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <button
                          onClick={handleSearch}
                          disabled={loading}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                        >
                          <FaSearch className="h-4 w-4" />
                          {loading ? "Buscando..." : "Buscar"}
                        </button>
                        <button
                          onClick={clearFilters}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                          Limpar
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Lista de Pacientes */}
                <Card className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg border-0">
                  <CardHeader className="border-b border-blue-100 pb-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-blue-500 p-2 rounded-lg">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-blue-900 font-bold">
                        Pacientes Encontrados
                      </CardTitle>
                    </div>
                  </CardHeader>{" "}
                  <CardContent className="pt-6">
                    <ScrollArea className="h-auto">
                      {!hasSearched ? (
                        // Mensagem inicial quando não houve pesquisa
                        <div className="text-center py-12 bg-white rounded-xl">
                          <div className="bg-blue-50 p-4 rounded-full inline-block mb-4">
                            <FaSearch className="h-8 w-8 text-blue-400" />
                          </div>
                          <p className="text-gray-600 font-medium">
                            Digite um nome ou CPF para pesquisar pacientes
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Use os filtros acima para encontrar o paciente
                            desejado
                          </p>
                        </div>
                      ) : patients.length > 0 ? (
                        <div className="space-y-4">
                          {patients.map((patient) => (
                            <div
                              key={patient.cpf}
                              onClick={() => handlePatientSelect(patient)}
                              className="border border-blue-100 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="bg-indigo-100 p-3 rounded-full">
                                    <User className="h-5 w-5 text-indigo-600" />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-blue-900">
                                      {patient.fullname}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                      CPF: {patient.cpf}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-blue-500">
                                  <ChevronRight className="h-5 w-5" />
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Paginação */}
                          {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-6">
                              <button
                                onClick={() =>
                                  setCurrentPage((prev) =>
                                    Math.max(prev - 1, 1)
                                  )
                                }
                                disabled={currentPage === 1}
                                className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <ChevronLeft className="h-4 w-4" />
                                Anterior
                              </button>

                              <span className="px-4 py-2 bg-white rounded-md border border-blue-200 font-medium">
                                Página {currentPage} de {totalPages}
                              </span>

                              <button
                                onClick={() =>
                                  setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                  )
                                }
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Próxima
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-white rounded-xl">
                          <div className="bg-blue-50 p-4 rounded-full inline-block mb-4">
                            <ClipboardX className="h-8 w-8 text-blue-400" />
                          </div>
                          <p className="text-gray-600 font-medium">
                            Nenhum paciente com laudos encontrado
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Apenas pacientes com exames concluídos são exibidos
                          </p>
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Resumo da Busca */}
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg border-0">
                  <CardHeader className="border-b border-blue-100 pb-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-blue-500 p-2 rounded-lg">
                        <BarChart3 className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-blue-900 font-bold">
                        Resumo da Busca
                      </CardTitle>
                    </div>
                  </CardHeader>{" "}
                  <CardContent className="pt-6">
                    <div className="space-y-5">
                      <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                        <div className="flex items-center">
                          <div className="bg-indigo-100 p-3 rounded-full mr-4">
                            <Users className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <div className="text-sm text-indigo-500 font-medium">
                              {hasSearched
                                ? "Pacientes Encontrados"
                                : "Aguardando Pesquisa"}
                            </div>
                            <div className="text-2xl font-bold text-blue-900 mt-1">
                              {hasSearched ? patients.length : "-"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {/* Detalhes do Paciente Selecionado */}
                <Card className="lg:col-span-3 bg-white/50 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="md:h-16 h-8 md:w-16 w-12 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
                        <span className="md:text-2xl font-bold text-white">
                          {selectedPatient.fullname.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h1 className="md:text-2xl text-xl font-bold text-blue-900">
                          {selectedPatient.fullname}
                        </h1>
                        <p className="text-gray-600">
                          CPF: {selectedPatient.cpf} •{" "}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {loadingRequisitions ? (
                  <div className="lg:col-span-3 flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                      <p className="mt-4 text-gray-600">
                        Carregando exames do paciente...
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Lista de Laudos do Paciente */}
                    <div className="lg:col-span-2">
                      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg border-0">
                        <CardHeader className="border-b border-blue-100 pb-4">
                          <div className="flex items-center space-x-2">
                            <div className="bg-blue-500 p-2 rounded-lg">
                              <ClipboardList className="h-5 w-5 text-white" />
                            </div>
                            <CardTitle className="text-blue-900 font-bold">
                              Histórico de Laudos
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ScrollArea className="h-auto">
                            {selectedPatient.requisitions &&
                            selectedPatient.requisitions.length > 0 ? (
                              <div className="space-y-4">
                                {selectedPatient.requisitions.map((req) => {
                                  const isAvailable = hasCompletedTests(req);
                                  return (
                                    <div
                                      key={req.id}
                                      onClick={() =>
                                        handleRequisitionClick(req)
                                      }
                                      className={`
                                        border border-blue-100 rounded-xl p-5 bg-white shadow-sm transition-all duration-200
                                        ${
                                          isAvailable
                                            ? "hover:shadow-md cursor-pointer hover:border-blue-300 hover:bg-blue-50"
                                            : "opacity-75 cursor-not-allowed"
                                        }
                                      `}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                          <div
                                            className={`p-3 rounded-full ${
                                              isAvailable
                                                ? "bg-green-100"
                                                : "bg-yellow-100"
                                            }`}
                                          >
                                            {isAvailable ? (
                                              <CheckCircle className="h-5 w-5 text-green-600" />
                                            ) : (
                                              <Clock className="h-5 w-5 text-yellow-600" />
                                            )}
                                          </div>
                                          <div>
                                            <h3 className="font-semibold text-blue-900">
                                              Médico: {req.doctorName}
                                            </h3>
                                            <p className="text-sm font-medium text-indigo-900 flex items-center mt-1">
                                              <Calendar className="h-4 w-4 mr-1" />
                                              {new Date(
                                                req.date
                                              ).toLocaleDateString()}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <span
                                            className={`
                                            px-3 py-1 rounded-full text-sm font-medium
                                            ${
                                              isAvailable
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }
                                          `}
                                          >
                                            {isAvailable
                                              ? "Disponível"
                                              : "Em andamento"}
                                          </span>
                                          {isAvailable ? (
                                            <div className="text-blue-500">
                                              <FileText className="h-5 w-5" />
                                            </div>
                                          ) : (
                                            <div className="text-gray-400">
                                              <Clock className="h-5 w-5" />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      {!isAvailable && (
                                        <div className="mt-3 text-sm text-gray-600">
                                          <p>
                                            Aguardando conclusão dos exames...
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="text-center py-12 bg-white rounded-xl">
                                <div className="bg-blue-50 p-4 rounded-full inline-block mb-4">
                                  <ClipboardX className="h-8 w-8 text-blue-400" />
                                </div>
                                <p className="text-gray-600 font-medium">
                                  Nenhum laudo encontrado
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  Este paciente ainda não possui laudos
                                  cadastrados
                                </p>
                              </div>
                            )}
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </div>

                    <Dialog
                      header="Visualizar Laudo"
                      visible={displayPdfModal}
                      style={{ width: "80vw", height: "90vh" }} 
                      onHide={() => setDisplayPdfModal(false)}
                      maximizable
                      modal
                    >
                        <iframe
                          src={pdfUrl}
                          width="100%"
                          height="100%"
                          style={{ border: "none" }}
                          title="Visualizador de PDF"
                        >
                            
                        </iframe>
                    </Dialog>

                    {/* Resumo do Paciente */}
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg border-0">
                      <CardHeader className="border-b border-blue-100 pb-4">
                        <div className="flex items-center space-x-2">
                          <div className="bg-blue-500 p-2 rounded-lg">
                            <BarChart3 className="h-5 w-5 text-white" />
                          </div>
                          <CardTitle className="text-blue-900 font-bold">
                            Resumo do Paciente
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-5">
                          <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center">
                              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                <ClipboardList className="h-5 w-5 text-indigo-600" />
                              </div>
                              <div>
                                <div className="text-sm text-indigo-500 font-medium">
                                  Total de Laudos
                                </div>
                                <div className="text-2xl font-bold text-blue-900 mt-1">
                                  {selectedPatient.requisitions?.length || 0}
                                </div>
                              </div>
                            </div>
                          </div>

                          {selectedPatient.requisitions &&
                            selectedPatient.requisitions.length > 0 && (
                              <>
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-200">
                                  <div className="flex items-center">
                                    <div className="bg-emerald-100 p-3 rounded-full mr-4">
                                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <div>
                                      <div className="text-sm text-emerald-500 font-medium">
                                        Laudos Disponíveis
                                      </div>
                                      <div className="text-xl font-bold text-blue-900 mt-1">
                                        {
                                          selectedPatient.requisitions.filter(
                                            (req) => hasCompletedTests(req)
                                          ).length
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-200">
                                  <div className="flex items-center">
                                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                                      <Clock className="h-5 w-5 text-yellow-600" />
                                    </div>
                                    <div>
                                      <div className="text-sm text-yellow-500 font-medium">
                                        Laudos Em Andamento
                                      </div>
                                      <div className="text-xl font-bold text-blue-900 mt-1">
                                        {
                                          selectedPatient.requisitions.filter(
                                            (req) => !hasCompletedTests(req)
                                          ).length
                                        }
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
                                          selectedPatient.requisitions[0].date
                                        ).toLocaleDateString()}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-200">
                                  <div className="flex items-center">
                                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                                      <User className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                      <div className="text-sm text-purple-500 font-medium">
                                        Data de Nascimento
                                      </div>
                                      <div className="text-xl font-bold text-blue-900 mt-1">
                                        {new Date(
                                          selectedPatient.birthDate
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
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
