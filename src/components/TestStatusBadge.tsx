// components/TestStatusBadge.tsx
export enum TestStatus {
  REQ = "REQ", // REQUESTED
  SCH = "SCH", // SCHEDULED
  PEN = "PEN", // PENDING
  COL = "COL", // COLLECTED
  DEL = "DEL", // DELIVERED
  LOS = "LOS", // LOST
  REC = "REC", // RECEIVED
  TYP = "TYP", // TYPED
  CON = "CON", // COMPLETED
}

interface TestStatusBadgeProps {
  status: string;
}

export const TestStatusBadge: React.FC<TestStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (
    status: string
  ): { label: string; color: string } => {
    switch (status) {
      case TestStatus.REQ:
        return { label: "Requisitado", color: "bg-blue-100 text-blue-800" };
      case TestStatus.SCH:
        return { label: "Agendado", color: "bg-purple-100 text-purple-800" };
      case TestStatus.PEN:
        return { label: "Pendente", color: "bg-yellow-100 text-yellow-800" };
      case TestStatus.COL:
        return { label: "Coletado", color: "bg-indigo-100 text-indigo-800" };
      case TestStatus.DEL:
        return { label: "Enviado", color: "bg-green-100 text-green-800" };
      case TestStatus.LOS:
        return { label: "Perdido", color: "bg-red-100 text-red-800" };
      case TestStatus.REC:
        return { label: "Recebido", color: "bg-teal-100 text-teal-800" };
      case TestStatus.TYP:
        return { label: "Digitado", color: "bg-cyan-100 text-cyan-800" };
      case TestStatus.CON:
        return { label: "Concluído", color: "bg-emerald-100 text-emerald-800" };
      default:
        return { label: "Desconhecido", color: "bg-gray-100 text-gray-800" };
    }
  };

  const { label, color } = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
    >
      {label}
    </span>
  );
};

export default TestStatusBadge;