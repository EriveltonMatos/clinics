export default function HealthPrimaryClinicCard() {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-950 p-8 max-w-3xl mx-auto mt-8 rounded-xl shadow-2xl ">
        <p className="md:text-lg font-semibold text-blue-300 mb-2 flex justify-center items-center tracking-wide animate-pulse">
          Você encontra esse serviço na:
        </p>
  
        <h1 className="md:text-2xl text-xl font-extrabold text-white mb-6 flex justify-center items-center tracking-wider ">
         CLÍNICA ESCOLA DE SAÚDE UNICHRISTUS (CES) e na CLÍNICA ESCOLA DE ATENÇÃO PRIMÁRIA (CEAP)
        </h1>
  
        <p className="text-white text-sm md:text-lg leading-relaxed bg-black bg-opacity-30 p-4 rounded-lg shadow-md">
          A <span className="text-[#159EEC]"> Clínica Escola de Saúde (CES) </span>da Unichristus é uma estrutura acadêmica
          equipada para os alunos dos cursos da área de saúde a desenvolverem e
          executarem as atividades práticas tendo uma melhor experiência de
          aprendizado. A clínica também realiza atendimentos gratuitos à
          comunidade, em múltiplas especialidades, de forma integrada e
          humanizada, além de desenvolver programas como: Serviço de Atenção
          Especializada (SAE) em IST/AIDS, em parceria com o Sistema Único de
          Saúde (SUS) e Prevenção de câncer ginecológico.
        </p>

        <p className="text-white text-sm md:text-lg leading-relaxed bg-black bg-opacity-30 p-4 rounded-lg shadow-md">
        A <span className="text-[#159EEC]">CEAP - Clínica Escola de Atenção Primária da Unichristus</span> é um espaço de aprendizado e atendimento à comunidade, onde estudantes da área da saúde da Unichristus 
        colocam em prática seus conhecimentos sob a supervisão de profissionais experientes. A clínica oferece uma variedade de serviços de saúde, contribuindo para a 
        formação de futuros profissionais e para o bem-estar da população.
        </p>
      </div>
    );
  }
  