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
        return { label: "Em andamento", color: "bg-yellow-100 text-yellow-800" };
      case TestStatus.SCH:
        return { label: "Em andamento", color: "bg-yellow-100 text-yellow-800" };
      case TestStatus.PEN:
        return { label: "Em andamento", color: "bg-yellow-100 text-yellow-800" };
      case TestStatus.COL:
        return { label: "Em andamento", color: "bg-yellow-100 text-yellow-800" };
      case TestStatus.DEL:
        return { label: "Em andamento", color: "bg-yellow-100 text-yellow-800" };
      case TestStatus.LOS:
        return { label: "Em andamento", color: "bg-yellow-100 text-yellow-800" };
      case TestStatus.REC:
        return { label: "Em andamento", color: "bg-yellow-100 text-yellow-800" };
      case TestStatus.TYP:
        return { label: "Em andamento", color: "bg-yellow-100 text-yellow-800" };
      case TestStatus.CON:
        return { label: "Concluído", color: "bg-emerald-100 text-emerald-800" };
      default:
        return { label: "Em andamento", color: "bg-yellow-100 text-yellow-800" };
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