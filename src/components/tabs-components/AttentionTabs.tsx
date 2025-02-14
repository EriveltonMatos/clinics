import InfoCardWithButton from "../InfoCardWithButton";
import psicologico from "@/assets/exams/attention/psicologico.png";
import nutricional from "@/assets/exams/attention/nutricional.jpeg";
import hiv from "@/assets/exams/attention/hiv.jpg";
import HealthClinicCard from "../service-cards/HealthClinicCard";
import PsychologyClinicCard from "../service-cards/PsychologyClinicCard";

export default function AttentionTab() {
  return (
    <div className="container mx-auto animate-delay-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:min-h-[18rem] max-lg:h-[50rem] animate-fade">
        <InfoCardWithButton
          imageSrc={psicologico.src}
          title="Atendimento Psicológico"
          titleCard="Atendimento Psicológico"
          description="
          O atendimento psicológico é um serviço que visa promover a saúde mental e o bem-estar emocional. Realizado por psicólogos, ele envolve sessões de terapia onde questões como ansiedade, 
          depressão e traumas são abordadas. O objetivo é ajudar o paciente a compreender seus sentimentos e comportamentos, promovendo mudanças positivas em sua vida."
          imageCard={psicologico.src}
          additionalContent={<PsychologyClinicCard />}
        />

        <InfoCardWithButton
          imageSrc={nutricional.src}
          title="Atendimento Nutricional"
          titleCard="Atendimento Nutricional"
          description="O atendimento nutricional é um serviço que visa avaliar e orientar indivíduos sobre sua alimentação e hábitos saudáveis. Realizado por nutricionistas, esse atendimento envolve 
            a análise do estado nutricional, identificação de necessidades específicas e elaboração de planos alimentares personalizados. O objetivo é promover uma dieta equilibrada, prevenir doenças 
            e melhorar a qualidade de vida do paciente, considerando suas preferências e condições de saúde."
          imageCard={nutricional.src}
          additionalContent={<HealthClinicCard />}
        />

        <InfoCardWithButton
          imageSrc={hiv.src}
          title="Atenção Especializada em ISTS/HIV/Aids"
          titleCard="Atenção Especializada em ISTS/HIV/Aids"
          description="
          A atenção especializada em ISTs, HIV e AIDS é um serviço de saúde que foca na prevenção, diagnóstico e tratamento dessas condições. Oferecida por equipes multidisciplinares, inclui testes rápidos, 
          acompanhamento médico e apoio psicológico. O objetivo é garantir acesso a tratamentos eficazes e promover a saúde das pessoas afetadas."
          imageCard={hiv.src}
          additionalContent={<HealthClinicCard />}
        />
      </div>
    </div>
  );
}
