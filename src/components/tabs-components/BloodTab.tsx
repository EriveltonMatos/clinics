import hemograma from "@/assets/exams/blood/hemograma.jpg";
import urina from "@/assets/exams/blood/urina.jpg";
import antibiograma from "@/assets/exams/blood/antibiograma.jpg";
import fezes from "@/assets/exams/blood/fezes.jpg";
import hormonal from "@/assets/exams/blood/hormonal.png";
import glicemia from "@/assets/exams/blood/glicemia.jpg";
import colesterol from "@/assets/exams/blood/colesterol.jpg";
import InfoCardWithButton from "../InfoCardWithButton";
import HealthClinicCard from "../service-cards/HealthClinicCard";


export default function BloodTab() {
  return (
    <div className="animate-delay-700">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:min-h-[58rem] max-lg:h-[120rem] animate-fade">
      <InfoCardWithButton
        imageSrc={hemograma.src}
        title="Hemograma"
        titleCard="Hemograma"
        description="O hemograma é um exame de sangue completo que avalia os componentes do sangue, como
            glóbulos vermelhos (hemácias), glóbulos brancos (leucócitos) e plaquetas. Ele é utilizado para
            diagnosticar e monitorar diversas condições de saúde, como anemias, infecções, inflamações e
            distúrbios do sangue."
        imageCard={hemograma.src}
        additionalContent={<HealthClinicCard />}
      />

      <InfoCardWithButton
        imageSrc={glicemia.src}
        title="Glicose"
        titleCard="Glicose"
        description="O exame de glicemia é um teste que mede a quantidade de glicose (açúcar) no sangue. Ele é
            utilizado principalmente para diagnosticar e monitorar condições relacionadas ao controle de
            açúcar no corpo, como o diabetes e a hipoglicemia."
        imageCard={glicemia.src}
        additionalContent={<HealthClinicCard />}
      />

      <InfoCardWithButton
        imageSrc={colesterol.src}
        title="Colesterol"
        titleCard="Colesterol"
        description="O exame de colesterol é um teste de sangue que mede os níveis de diferentes tipos de gorduras
            no sangue, incluindo o colesterol. Esse exame é utilizado para avaliar o risco de doenças
            cardiovasculares, como infarto e derrames, que podem estar associadas a níveis elevados de
            colesterol e outras gorduras no sangue."
        imageCard={colesterol.src}
        additionalContent={<HealthClinicCard />}
      />

      <InfoCardWithButton
        imageSrc={hormonal.src}
        title="Exames hormonais"
        titleCard="Exames hormonais"
        description="Exames hormonais são testes laboratoriais que medem os níveis de hormônios no sangue, urina
            ou saliva. Esses exames são utilizados para avaliar o funcionamento de glândulas endócrinas e
            detectar possíveis desequilíbrios hormonais, que podem afetar várias funções do corpo, como o
            crescimento, o metabolismo, a reprodução e o humor."
        imageCard={hormonal.src}
        additionalContent={<HealthClinicCard />}
      />

      <InfoCardWithButton
        imageSrc={urina.src}
        title="Sumário de Urina"
        titleCard="Sumário de Urina"
        description="O sumário de urina é um exame laboratorial que analisa a composição da urina para identificar
            possíveis problemas no trato urinário, rins e outras condições de saúde. Esse exame é amplamente
            utilizado para diagnosticar infecções urinárias, doenças renais, diabetes, entre outras condições."
        imageCard={urina.src}
        additionalContent={<HealthClinicCard />}
      />

      <InfoCardWithButton
        imageSrc={antibiograma.src}
        title="Antibiograma"
        titleCard="Antibiograma"
        description="Um antibiograma é um teste laboratorial que determina a sensibilidade de bactérias a diferentes
            antibióticos. O objetivo é identificar quais medicamentos são eficazes no combate a uma infecção
            específica causada por uma bactéria."
        imageCard={antibiograma.src}
        additionalContent={<HealthClinicCard />}
      />

      <InfoCardWithButton
        imageSrc={fezes.src}
        title="Parasitológico de fezes"
        titleCard="Parasitológico de fezes"
        description="O exame parasitológico de fezes é um teste laboratorial utilizado para detectar a presença de
            parasitas intestinais, como vermes e protozoários, nas fezes de uma pessoa. Esse exame é
            fundamental para diagnosticar infecções parasitárias, que podem causar sintomas como diarreia,
            dor abdominal, náuseas e perda de peso."
        imageCard={fezes.src}
        additionalContent={<HealthClinicCard />}
      />
    </div>
  </div>
  );
}