import clinicaOdonto from "@/assets/unidades/clinica-odonto.jpg";
import clinicaSaude from "@/assets/unidades/clinica-saude.jpg";
import clinicaPsicologia from "@/assets/unidades/clinica-psicologia.jpg";
import clinicaFisioterapia from "@/assets/unidades/clinica-fisio.jpeg";
import clinicaCesiu from "@/assets/unidades/cesiu.jpeg";
import clinicaLeac from "@/assets/unidades/leac.jpg";
import MobileNav from "@/components/navbar-components/MobileNav";
import unichristusAldeota from "@/assets/unichristus.jpg";
import NavbarReturn from "@/components/navbar-components/NavbarReturn";
import { FaArrowLeft } from "react-icons/fa";
import { ScrollFromBottom } from "@/components/ScrollComponent";
import NavBar from "@/components/navbar-components/Navbar";
import ClinicComponent from "@/components/ClinicComponent";
import FooterSection from "@/components/home-sections/FooterSection";
import Image from "next/image";

export default function Clinics() {
  return (
    <>
      <div>
        <NavBar />
        <NavbarReturn />
        <MobileNav
          links={[
            { href: "/", label: "Voltar ao site", icon: <FaArrowLeft /> },
          ]}
        />
      </div>

      <div className="relative w-full mt-16 md:mt-0 animate-fade">
        <Image
          src={unichristusAldeota.src}
          alt="Unichristus Aldeota"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-65"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-blue-900/70"></div>

        <div className="relative z-10 flex md:py-40 py-12 md:text-start md:ml-10 text-white px-4 text-center">
          <div>
            <div className="inline-block mb-3 px-4 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
              <span className="text-blue-300 font-medium text-sm md:text-base tracking-wider">
                CLÍNICAS ESCOLAS UNICHRISTUS
              </span>
            </div>
            <h1 className="text-4xl md:text-[13vh] font-extrabold mb-6 text-white leading-tight">
              EXCELÊNCIA EM{" "}
              <span className="text-[#159EEC] inline-block">SAÚDE</span>,{" "}
              <br className="hidden md:block" /> PERTO DE{" "}
              <span className="text-[#159EEC] inline-block relative">
                VOCÊ
                <svg
                  className="absolute -bottom-2 left-0 w-full h-2 text-[#159EEC]/60"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 25 10, 50 5 Q 75 0, 100 5"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </h1>
            <p className="md:text-3xl ml-4 md:ml-2 text-lg mt-4 ">
              Clínicas modernas e equipadas, com profissionais dedicados ao
              cuidado <br />
              completo da sua saúde e de sua família.
            </p>
          </div>
        </div>
      </div>
      <section className="py-12 bg-gradient-to-br from-blue-100 to-indigo-200">
        <h2 className="text-[#1F2B6C] text-4xl md:text-6xl font-bold md:mb-8 md:mt-10 mt-5 text-center">
          Nossas <span className="text-[#159EEC]">Unidades</span>
          <div className="flex justify-center mt-4 space-x-4">
            <div className="w-3 h-3 bg-[#3575FE] rounded-full hover:scale-150 transition-all"></div>
            <div className="w-3 h-3 bg-[#3575FE] rounded-full hover:scale-150 transition-all"></div>
            <div className="w-3 h-3 bg-[#3575FE] rounded-full hover:scale-150 transition-all"></div>
          </div>
        </h2>
        <ScrollFromBottom>
          <ClinicComponent
            imageBackground={clinicaOdonto.src}
            imageSrc={clinicaOdonto.src}
            title="Clínica Escola de Odontologia"
            description={[
              "A Clínica Escola de Odontologia da Unichristus (CEO) é um complexo odontológico moderno na qual os alunos(as) de graduação e pós-graduação desenvolvem as mais atuais técnicas odontológicas orientados por profissionais experientes, com a missão de tratar o paciente de forma completa, trazendo bem-estar e transformando sorrisos.",
              "São 117 estações odontológicas, onde são realizados, mensalmente, mais de 2800 atendimentos gratuitos e a valores acessíveis nas mais diversas especialidades.",
            ]}
            address={[
              "Nossa unidade central está localizada no endereço: Rua Vereador Paulo Mamede, 130 - Cocó, Fortaleza - CE, 60192-350",
            ]}
            services={[
              "Triagem Odontológica",
              "Promoção da Saúde",
              "Dentística",
              "Periodontia",
              "Endodontia",
              "Prótese Dentária",
              "Prótese Maxilo Facial",
              "Cirurgia",
              "Radiologia",
              "Tratamento de Pacientes Com Necessidades Especiais",
              "Implantodontia",
              "Ortodontia",
              "Estética",
              "Saúde Coletiva",
              "Dor e Disfunções da ATM",
              "Odontologia Hospitalar",
              "Estomatologia",
              "Odontopediatria",
              "Ortopedia Funcional dos Maxilares",
              "Patologia Bucal",
              "Odontogeriatria",
              "Saúde e Educação Sexual",
              "Harmonização Orofacial",
            ]}
            buttonLink={[
              "https://www.google.com/maps/dir/?api=1&destination=Rua+Vereador+Paulo+Mamede,+130+-+Cocó,+Fortaleza+-+CE,+60192-350",
            ]}
            buttonText={["Como chegar"]}
            reverse={false}
          />
        </ScrollFromBottom>

        <ScrollFromBottom>
          <ClinicComponent
            imageBackground={clinicaSaude.src}
            imageSrc={clinicaSaude.src}
            title="Clínica Escola de Saúde"
            description={[
              "Na Clínica Escola de Saúde da Unichristus (CES), os estudantes(as) dos cursos de Enfermagem, Medicina, Nutrição e Psicologia realizam atendimentos supervisionados por professores(as) especialistas, reconhecidos por sua excelência acadêmica e profissional. O foco está no cuidado integral, com ênfase na humanização, acolhimento e bem-estar do paciente.",
              "A CES oferece consultas em 13 especialidades médicas, proporcionando à comunidade serviços de saúde com qualidade, ética e compromisso social. ",
              "Destacam-se entre suas ações dois programas de grande relevância comunitária:\n",
              "• Serviço de Atenção Especializada (SAE) em IST/AIDS, desenvolvido em parceria com o Sistema Único de Saúde (SUS), com oferta de acompanhamento integral e gratuito a pessoas vivendo com infecções sexualmente transmissíveis.",
              "• Programa de Prevenção ao Câncer Ginecológico, voltado à detecção precoce, rastreamento e monitoramento de mulheres com maior risco para neoplasias do trato genital inferior.",
            ]}
            address={[
              "Nossa unidade central está localizada no endereço: R. Vicente Linhares, 308 - Aldeota, Fortaleza - CE, 60135-270",
            ]}
            services={[
              "Pediatria",
              "Ginecologia ",
              "Cardiologia",
              "Clínica Médica",
              "Dermatologia",
              "Endocrinologia",
              "Gastrologia",
              "Geriatria",
              "Infectologia",
              "Nefrologia",
              "Neurologia",
              "Pneumologia",
              "Psiquiatria",
              "Reumatologia",
              "Atendimento Psicológico e Psicopedagógico",
              "Consulta de Enfermagem à Criança",
              "Consulta de Enfermagem ao Idoso",
              "Consulta de Enfermagem Saúde do Homem",
              "Consulta de Enfermagem Saúde Mental",
              "Consulta de Enfermagem HPV",
              "Consulta de Enfermagem em Ginecologia",
              "Consulta de Enfermagem DM / HAS / Tb / Hanseníase",
            ]}
            buttonLink={[
              "https://www.google.com/maps/dir/?api=1&destination=R.+Vicente+Linhares,+308+-+Aldeota,+Fortaleza+-+CE,+60135-270",
            ]}
            buttonText={["Como chegar"]}
            reverse={true}
          />
        </ScrollFromBottom>
        <ScrollFromBottom>
          <ClinicComponent
            imageBackground={clinicaFisioterapia.src}
            imageSrc={clinicaFisioterapia.src}
            title="Clínica Escola de Fisioterapia"
            description={[
              "A Clínica Escola de Fisioterapia da Unichristus é um espaço de cuidado à saúde e excelência acadêmica, voltado à promoção e reabilitação funcional de pacientes da comunidade. Com estrutura moderna, equipamentos atualizados e atendimento humanizado, oferecemos serviços fisioterapêuticos gratuitos em diversas especialidades.",
              "Os atendimentos são realizados por estudantes do curso de Fisioterapia, sob supervisão direta de professores(as) com ampla experiência clínica e acadêmica, garantindo qualidade, segurança e comprometimento com o bem-estar dos nossos pacientes.",
              "Nosso compromisso é duplo: contribuir com a formação prática dos nossos alunos(as) e oferecer à população um atendimento fisioterapêutico ético, acessível e baseado em evidências.",
            ]}
            address={[
              "Estamos com duas unidades da Clínica Escola de Fisioterapia Unichristus",
              "Campus Parque Ecológico (Rua Vereador Paulo Mamede, 130 - Papicu - CEP: 60190-050)",
              "Campus Parquelândia (Rua Uruguai, 11 - Bela vista - CEP: 60442-590)",
            ]}
            services={[
              "Fisioterapia em Traumato-ortopedia",
              "Fisioterapia Esportiva",
              "Fisioterapia Neurofuncional",
              "Fisioterapia Pediátrica",
              "Fisioterapia Aquática",
              "Fisioterapia em Reumatologia",
              "Fisioterapia na Saúde da mulher",
              "Fisioterapia em Oncologia",
              "Fisioterapia Respiratória",
              "Fisioterapia Cardiovascular",
              "Fisioterapia em Gerontologia",
              "Fisioterapia em dermatofuncional",
            ]}
            buttonLink={[
              "https://www.google.com/maps/dir/?api=1&destination=Rua+Vereador+Paulo+Mamede+-+Cocó,+Fortaleza+-+CE,+60192-350",
              "https://www.google.com/maps/dir/?api=1&destination=Rua+Uruguai,11+-+Bela+Vista,+Fortaleza+-+CE,+60442-590",
            ]}
            buttonText={["Campus Parque Ecológico", "Campus Parquelândia"]}
            reverse={false}
          />
        </ScrollFromBottom>

        <ScrollFromBottom>
          <ClinicComponent
            imageBackground={clinicaCesiu.src}
            imageSrc={clinicaCesiu.src}
            title="Clínica-Escola de Saúde e Imagem Unichristus (CESIU)"
            description={[
              "A Clínica-Escola de Saúde e Imagem Unichristus (CESIU) é um espaço que une ensino na área da saúde, atendimento de excelência e qualidade em diagnóstico por imagem.",
              "Nosso espaço foi totalmente desenvolvido para que os alunos(as) dos cursos da área da saúde da Unichristus possam acompanhar, em tempo real, os procedimentos de atendimento, aprendendo com profissionais especialistas e tendo como foco o cuidado com o paciente.",
              "Além disso, o ambiente conta com equipamentos de última geração para realização de exames de ressonância magnética, tomografia computadorizada, ultrassonografia e raio-x, com o objetivo de proporcionar a melhor qualidade em imagem e diagnósticos confiáveis.",
              "A CESIU está estrategicamente localizada no coração da cidade, com fácil acesso e um ambiente moderno, projetado para proporcionar a melhor experiência para você. Aqui, a sua saúde está nas melhores mãos.",
            ]}
            address={[
              "Nossa unidade central está localizada no endereço: R. Vicente Linhares, 308 - Aldeota, Fortaleza - CE, 60135-270",
            ]}
            services={[
              "Ressonância magnética",
              "Tomografia computadorizada",
              "Ultrassonografia",
              "Raio-X",
            ]}
            buttonLink={[
              "https://www.google.com/maps/dir/?api=1&destination=R.+Vicente+Linhares,+308+-+Aldeota,+Fortaleza+-+CE,+60135-270",
            ]}
            buttonText={["Como chegar"]}
            reverse={true}
          />
        </ScrollFromBottom>

        <ScrollFromBottom>
          <ClinicComponent
            imageBackground={clinicaPsicologia.src}
            imageSrc={clinicaPsicologia.src}
            title="Serviço Escola de Psicologia Aplicada (SEPA)"
            description={[
              " O Serviço-Escola de Psicologia Aplicada (SEPA) é um espaço de ensino e prática no qual os(as) estudantes do curso de Psicologia da Unichristus desenvolvem habilidades em escuta, acolhimento, prática clínica e trabalho em equipe, sempre sob a supervisão de professores(as) de referência em diversas áreas de atuação.",
              "Com compromisso com a responsabilidade social, o SEPA oferece atendimentos psicológicos gratuitos à comunidade, beneficiando crianças, adolescentes e adultos, e promovendo a qualidade de vida e a saúde mental dos(as) usuários(as).",
              "As modalidades de atendimento incluem psicoterapia individual, grupos terapêuticos, avaliação psicológica, avaliação neuropsicológica, orientação profissional e plantão psicológico. Além dos consultórios para os atendimentos clínicos, o SEPA conta com uma testoteca devidamente estruturada e atualizada, que oferece um acervo diversificado de instrumentos psicológicos autorizados pelo Conselho Federal de Psicologia (CFP) utilizada, ainda, nas práticas de avaliação junto à comunidade.",
            ]}
            address={[
              "O SEPA funciona de segunda a sexta-feira nos seguintes endereços e horários: \n",
              "Campus A: Av. Desembargador Moreira, 2120 – Dionísio Torres (08h às 12h e das 14h às 18h)- SEPA\n",
              "Campus B: Rua Vicente Linhares, 308 – Aldeota (17h às 20h)- CESIU",
            ]}
            services={[
              "Atendimento em grupo",
              "Avaliação Psicológica",
              "Terapia de Casal",
              "Orientação Profissional",
              "Atendimento individual de crianças, adolescentes, adultos e idosos",
              "Avaliação Neuropsicológica",
              "Plantão Psicológico",
            ]}
            buttonLink={[
              "https://www.google.com/maps/dir/?api=1&destination=Av.+Des.+Moreira,+2120+-+Aldeota,+Fortaleza+-+CE,+60170-002",
              "https://www.google.com/maps/dir/?api=1&destination=R.+Vicente+Linhares,+308+-+Aldeota,+Fortaleza+-+CE,+60135-270",
            ]}
            buttonText={["Campus A", "Campus B"]}
            reverse={false}
          />
        </ScrollFromBottom>

        <ScrollFromBottom>
          <ClinicComponent
            imageBackground={clinicaLeac.src}
            imageSrc={clinicaLeac.src}
            title="LEAC - Laboratório Escola de Análises Clínicas"
            description={[
              "Com uma estrutura pedagógica inovadora, desde 2016, o LEAC atua como um importante suporte aos serviços de saúde da Clínica Escola de Saúde (CES) e da Clínica Escola de Odontologia (CEO). Através da realização de exames laboratoriais gratuitos, contribui para o diagnóstico de pacientes que buscam atendimento nessas unidades.",
            ]}
            address={[
              "O agendamento para coleta deve ser feito diretamente na clínica onde ocorre os atendimentos:",
              "Clínica Escola de Saúde e Imagem Unichristus (CESIU) / Telefones: 3306-8932 / 3306-8933 / Endereço: Rua Vicente Linhares, 308 - Aldeota.",
            ]}
            services={[
              "Fisioterapia em Traumato-ortopedia",
              "Fisioterapia Esportiva",
              "Triglicerídeos",
              "Hemoglobina Glicada (HbA1c)",
              "Creatinina",
              "Bilirrubina Total e Frações",
              "Ácido Úrico",
              "Albumina",
              "Cálcio",
              "CPK (Creatina Fosfoquinase)",
              "Ferro Sérico",
              "PCR (Proteína C Reativa)",
              "Uréia",
              "Glicemia",
              "TGO (AST) e TGP (ALT)",
              "T3 Total",
              "T4 Livre",
              "TSH",
              "VDRL",
              "Hemograma",
              "TAP e TTPA",
              "VHS (Velocidade de Hemossedimentação)",
              "Sumário de Urina (EAS)",
              "Bacterioscopia de Urina",
              "Parasitológico de Fezes",
              "Exame Direto para Fungos",
              "Cultura para Fungos",
              "Urinocultura",
            ]}
            buttonLink={[
              "https://www.google.com/maps/dir/?api=1&destination=R.+Vicente+Linhares,+308+-+Aldeota,+Fortaleza+-+CE,+60135-270",
            ]}
            buttonText={["Como chegar"]}
            reverse={true}
          />
        </ScrollFromBottom>
      </section>
      <div>
        <FooterSection />
      </div>
    </>
  );
}
