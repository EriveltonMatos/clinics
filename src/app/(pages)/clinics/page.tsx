import clinicaOdonto from "@/assets/unidades/clinica-odonto.jpg";
import clinicaSaude from "@/assets/unidades/clinica-saude.jpg";
import clinicaPsicologia from "@/assets/unidades/clinica-psicologia.jpg";
import clinicaFisioterapia from "@/assets/unidades/clinica-fisio.jpg";
import clinicaCesiu from "@/assets/unidades/cesiu.jpeg";
import MobileNav from "@/components/MobileNav";
import unichristusAldeota from "@/assets/unichristus.jpg";
import NavbarReturn from "@/components/NavbarReturn";
import { FaArrowLeft } from "react-icons/fa";
import { ScrollFromBottom } from "@/components/ScrollComponent";
import NavBar from "@/components/Navbar";
import ClinicComponent from "@/components/ClinicComponent";
import FooterSection from "@/components/home-sections/FooterSection";
import IconPhone from "@/components/IconPhone";

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
      <div
        className="relative w-full bg-blue-100 border-t-2 border-sky-50 mt-16 md:mt-0 animate-fade"
        style={{
          backgroundImage: `url(${unichristusAldeota.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-65"></div>
        <div className="relative z-10 flex md:py-40 py-12 md:text-start md:ml-10 text-white px-4 text-center">
          <div>
            <h1 className="md:text-8xl font-bold mb-4 text-4xl p-5">
              EXCELÊNCIA EM <span className="text-[#159EEC]">SAÚDE</span>,{" "}
              <br /> PERTO DE <span className="text-[#159EEC]">VOCÊ</span>
            </h1>
            <p className="md:text-3xl md:ml-6 ml-4 text-lg mt-4 md:mt-0">
              Clínicas modernas e equipadas, com profissionais dedicados ao
              cuidado <br />
              completo da sua saúde e de sua família.
            </p>
          </div>
        </div>
      </div>
      <section className="py-12 bg-gradient-to-br from-blue-100 to-indigo-200">
        <h1 className="text-[#1F2B6C] text-4xl md:text-6xl font-bold md:mb-8 md:mt-20 mt-5 text-center">
          Nossas <span className="text-[#159EEC]">Unidades</span>
          <div className="flex justify-center mt-4 space-x-4">
            <div className="w-3 h-3 bg-[#3575FE] rounded-full hover:scale-150 transition-all"></div>
            <div className="w-3 h-3 bg-[#3575FE] rounded-full hover:scale-150 transition-all"></div>
            <div className="w-3 h-3 bg-[#3575FE] rounded-full hover:scale-150 transition-all"></div>
          </div>
        </h1>
        <ScrollFromBottom>
          <ClinicComponent
            imageBackground={clinicaOdonto.src}
            imageSrc={clinicaOdonto.src}
            title="Clínica Escola de Odontologia"
            description={[
              "A Clínica Escola de Odontologia da Unichristus (CEO) é um complexo odontológico moderno na qual os alunos de graduação e pós-graduação desenvolvem as mais atuais técnicas ortodônticas orientados por profissionais experientes, com a missão de tratar o paciente de forma completa, trazendo bem-estar e transformando sorrisos.",
              "São 100 estações odontológicas, onde são realizados, mensalmente, mais de 2800 atendimentos gratuitos e a preços populares nas mais diversas especialidades.",
            ]}
            address="Nossa unidade fica no Campus Parque Ecológico, localizado no coração da cidade, oferecendo fácil acesso e ambiente moderno."
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
            buttonLink="https://www.google.com/maps/dir/?api=1&destination=Rua+Vereador+Paulo+Mamede,+130+-+Cocó,+Fortaleza+-+CE,+60192-350"
            reverse={false}
          />
        </ScrollFromBottom>

        <ScrollFromBottom>
          <ClinicComponent
            imageBackground={clinicaSaude.src}
            imageSrc={clinicaSaude.src}
            title="Clínica Escola de Saúde"
            description={[
              "Na Clínica Escola de Saúde (CES) da Unichristus, os alunos de Enfermagem, Medicina, Nutrição e Psicologia, realizam atendimentos de alta qualidade com orientação e supervisão de profissionais especialistas, com experiência e renome em sua respectiva área, com o compromisso de oferecer cuidados integrados com foco na humanização e no bem-estar de cada paciente.",
              "Além dos serviços especializados em diversas áreas da saúde, com foco nos atendimentos Clínicos em Ginecologia e Pediatria. Nossa clínica conta com programas de destaque, como o Serviço de Atenção Especializada (SAE) em IST/AIDS, em parceria com o Sistema Único de Saúde (SUS), e Prevenção ao Câncer Ginecológico, que garantem aos pacientes um cuidado de excelência.",
              "A CES está estrategicamente localizada no coração da cidade, com fácil acesso e um ambiente moderno, projetado para proporcionar a melhor experiência para você. Aqui, a sua saúde está nas melhores mãos.\n",
              "O s atendimentos ocorrem de maneira totalmente gratuita e a marcação de consultas para o mês seguinte ocorrem por meio dos telefones 3306-8932 e 3306-8933 com agendas abertas no 1o dia útil de cada mês.\n"
          ]}
            address="Nossa unidade central está localizada no endereço: R. Vicente Linhares, 308 - Aldeota, Fortaleza - CE, 60135-270"
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
            buttonLink="https://www.google.com/maps/dir/?api=1&destination=Rua+Vicente+Linhares,+308+-+Aldeota,+Fortaleza+-+CE,+60125-058"
            reverse={true}
          />
        </ScrollFromBottom>
        <ScrollFromBottom>
          <ClinicComponent
            imageBackground={clinicaFisioterapia.src}
            imageSrc={clinicaFisioterapia.src}
            title="Clínica Escola de Fisioterapia"
            description={["A Clínica Escola de Fisioterapia da Unichristus é um ambiente acadêmico equipado para alunos do curso de Fisioterapia desenvolverem e executarem as atividades práticas para reabilitação e assistência na atenção primária e secundária em saúde à sociedade.",
              "Na Clínica Escola de Fisioterapia ocorrem atendimentos nas seguintes áreas: traumatologia, ortopedia, desportiva, dermatologia, pediatria, reumatologia, cardiologia, pneumologia, ginecologia, obstetrícia, urologia, neurologia, oncologia, craniomandibular e hidroterapia. No espaço também são realizadas as aulas práticas das disciplinas específicas, além de cursos, palestras, atividades, projetos de extensão e eventos de promoção de saúde.",
              ]}
            address="Nossa unidade central está localizada no coração da cidade, oferecendo fácil acesso e um ambiente moderno."
            services={[
              "Fisioterapia em Traumato-ortopedia",
              "Fisioterapia Esportiva",
              "Fisioterapia Neurofuncional",
              "Fisioterapia Pediátrica",
              "Fisioterapia Aquática",
              "Fisioterapia em Gerontologia",
              "Fisioterapia em Reumatologia",
              "Fisioterapia na Saúde da mulher",
              "Fisioterapia em Oncologia",
              "Fisioterapia Respiratória",
              "Fisioterapia Cardiovascular",
              "Fisioterapia em Gerontologia",
            ]}
            buttonLink="https://www.google.com/maps/dir/?api=1&destination=Rua+Vereador+Paulo+Mamede+-+Cocó,+Fortaleza+-+CE,+60192-350"
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
              "Nosso espaço foi totalmente desenvolvido para que os alunos dos cursos da área da saúde da Unichristus possam acompanhar, em tempo real, os procedimentos de atendimento, aprendendo com profissionais especialistas e tendo como foco o cuidado com o paciente.",
              "Contamos com equipamentos de última geração para a realização de exames de ressonância magnética, tomografia computadorizada, ultrassonografia e radiografia digital, com o objetivo de proporcionar imagens de alta qualidade e diagnósticos confiáveis.",
              "A CESIU está estrategicamente localizada no coração da cidade, oferecendo fácil acesso e um ambiente moderno, projetado para proporcionar a melhor experiência para você. Aqui, a sua saúde está em boas mãos.",
              "Neste início de operação, os agendamentos e tipos de exames estão sendo definidos sob a supervisão direta dos radiologistas, para garantir que realizemos apenas aqueles dentro da nossa expertise. Com a equipe atual (dois radiologistas em quatro turnos semanais), estamos ajustando o fluxo de atendimento da Clínica, mas a expectativa é expandir em breve, incluindo novos colegas e diversificando os exames oferecidos.",
            ]}
            address="Nossa unidade central está localizada no endereço: R. Vicente Linhares, 308 - Aldeota, Fortaleza - CE, 60135-270"
            services={[
              "Ressonância magnética",
              "Tomografia computadorizada",
              "Ultrassonografia",
              "Radiografia digital",
            ]}
            buttonLink="https://www.google.com/maps/dir/?api=1&destination=R.+Vicente+Linhares,+308+-+Aldeota,+Fortaleza+-+CE,+60135-270"
            reverse={true}
          />
        </ScrollFromBottom>

        <ScrollFromBottom>
          <ClinicComponent
            imageBackground={clinicaPsicologia.src}
            imageSrc={clinicaPsicologia.src}
            title="Serviço Escola de Psicologia Aplicada (SEPA)"
            description={["O Serviço Escola de Psicologia Aplicada (SEPA) é um espaço dedicado ao curso de Psicologia da Unichristus e conta com oito salas para atendimentos psicológicos gratuitos, por meio de acolhimento individual ou em grupo, além de uma testoteca, espaço que tem como finalidade ofertar à comunidade acadêmica da área de Psicologia um conjunto de instrumentos de medida e avaliação psicológica. A equipe do SEPA é composta por estudantes a partir do 9º ano e oferece atendimentos de segunda à sexta-feira, das 14h às 20h. O público alvo do espaço são crianças, adolescentes e adultos."]}
            address="Nossa unidade central está localizada no endereço: Av. Des. Moreira, 2120 - Aldeota, Fortaleza - CE, 60170-002"
            services={[
              "Atendimento em grupo",
              "Psicodiagnóstico",
              "Terapia de Casal",
              "Orientação Profissional",
              "Atendimento individual de crianças, adolescentes, adultos e idosos",
            ]}
            buttonLink="https://www.google.com/maps/dir/?api=1&destination=Av.+Des.+Moreira,+2120+-+Aldeota,+Fortaleza+-+CE,+60170-002"
            reverse={false}
          />
        </ScrollFromBottom>
        </section>
      <div>
        <FooterSection />
        <IconPhone />
      </div>
    </>
  );
}
