import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ressonanciaIcon from "@/assets/exams/resonance/ressonancia-icon.png";
import { MdBloodtype } from "react-icons/md";
import { FaHandHoldingMedical, FaHospitalUser } from "react-icons/fa";
import { AiOutlineWoman } from "react-icons/ai";
import ImageTab from "./tabs-components/ImageTab";
import BloodTab from "./tabs-components/BloodTab";
import TreatmentTab from "./tabs-components/TreatmentTab";
import WomanTab from "./tabs-components/WomanTab";
import AttentionTab from "./tabs-components/AttentionTabs";

export default function ServicesTabs() {
  return (
    <Tabs
      defaultValue="image"
      className="mx-auto container flex flex-col xl:flex-row gap-[60px]"
    >
      <TabsList className="flex flex-col text-base md:w-[40rem] mx-auto xl:mx-0 gap-6 mt-2">
        <TabsTrigger value="image" className="gap-3">
          <img src={ressonanciaIcon.src} alt="" className="md:w-10 md:h-10 w-7 h-7" /> Exames de Imagem
        </TabsTrigger>
        <TabsTrigger value="blood" className="gap-3">
          <MdBloodtype className="md:w-10 md:h-10 w-7 h-7 text-red-600" /> Exames de Sangue
        </TabsTrigger>
        <TabsTrigger value="treatment" className="gap-3">
          <FaHandHoldingMedical className="md:w-10 md:h-10 w-7 h-7 text-emerald-500" />
          Consultas Médicas
        </TabsTrigger>
        <TabsTrigger value="woman" className="gap-3">
          <AiOutlineWoman className="md:w-10 md:h-10 w-7 h-7 text-pink-500" /> Saúde da Mulher
        </TabsTrigger>
        <TabsTrigger value="attention" className="gap-3">
          <FaHospitalUser className="w-14 h-12 text-amber-300 ml-10" />
          <span className="text-center mr-8">
            Atendimento Psicológico, Nutricional e de atenção Especializada
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="image" className="w-full">
        <ImageTab />
      </TabsContent>

      <TabsContent value="blood" className="w-full">
        <BloodTab />
      </TabsContent>

      <TabsContent value="treatment" className="w-full">
        <TreatmentTab />
      </TabsContent>

      <TabsContent value="woman" className="w-full">
        <WomanTab />
      </TabsContent>

      <TabsContent value="attention" className="w-full">
        <AttentionTab />
      </TabsContent>
    </Tabs>
  );
}
