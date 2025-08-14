import { Dialog } from "primereact/dialog";
import { useTranslations } from "next-intl";

interface PhoneContact {
  clinicKey: string;
  phone: string;
}

interface EmailContact {
  clinicKey: string;
  email: string;
}

interface ContactDialogProps {
  type: "phone" | "email";
  visible: boolean;
  onHide: () => void;
}

export default function ContactDialog({
  type,
  visible,
  onHide,
}: ContactDialogProps) {
  const t = useTranslations('ContactDialog');

  const phoneContacts: PhoneContact[] = [
    { clinicKey: "cesiu", phone: "3306-8933" },
    { clinicKey: "sepa", phone: "3468-2500" }, 
    { clinicKey: "dentistry", phone: "3265-8139" },
    { clinicKey: "healthClinic", phone: "3306-8232" },
    { clinicKey: "physiotherapyEcological", phone: "3265-8123" },
    { clinicKey: "physiotherapyParquelandia", phone: "3499-1349" },
  ];

  const emailContacts: EmailContact[] = [
    {
      clinicKey: "sepa",
      email: "secsepa@unichristus.edu.br",
    },
    {
      clinicKey: "physiotherapyEcological",
      email: "clinicafisioterapia@unichristus.edu.br",
    },
    {
      clinicKey: "physiotherapyParquelandia",
      email: "cef01.pql@unichristus.edu.br",
    },
  ];

  const isPhone = type === "phone";
  const header = t(isPhone ? 'phoneHeader' : 'emailHeader');
  const contactLabel = t(isPhone ? 'phoneLabel' : 'emailLabel');
  const description = t(isPhone ? 'phoneDescription' : 'emailDescription');
  const gradientColors = isPhone
    ? "bg-gradient-to-r from-blue-950 to-blue-800"
    : "bg-gradient-to-r from-[#159EEC] to-blue-500";
  const data = isPhone ? phoneContacts : emailContacts;

  return (
    <Dialog
      header={header}
      visible={visible}
      style={{ width: "90%", maxWidth: "550px" }}
      className="rounded-lg shadow-xl"
      contentClassName="p-0"
      headerClassName={`text-white rounded-t-lg p-4 ${gradientColors}`}
      onHide={onHide}
      dismissableMask={true}
      closeOnEscape={true}
    >
      <div className="p-6">
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div>
                <h3 className="font-semibold text-gray-800">
                  {t(`clinics.${item.clinicKey}`)}
                </h3>
                <p className="text-gray-600 text-sm flex items-center gap-2">
                  <span className="font-medium">{contactLabel}</span>
                  <span>
                    {isPhone
                      ? (item as PhoneContact).phone
                      : (item as EmailContact).email}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
}