import { useTranslations } from "next-intl";
import { Dialog } from "primereact/dialog";
import { FaWhatsapp } from "react-icons/fa";

interface Contact {
  clinica: string;
  phone: string;
  whatsappLink: string;
}

interface ContactDialogWhatsappProps {
  contacts?: Contact[];
  visible: boolean;
  onHide: () => void;
}

export default function ContactDialogWhatsapp({
  visible,
  onHide,
}: ContactDialogWhatsappProps) {
  const t = useTranslations("ContactDialog");
  const contacts = [
    {
      clinica: t("clinics.sepa"),
      phone: "99401-5648",
      whatsappLink:
        "https://wa.me/5585994015648?text=Oi%2C%20quero%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20cl%C3%ADnica.",
    },
  ];
  return (
    <Dialog
      header={t("whatsappHeader")}
      visible={visible}
      style={{ width: "90%", maxWidth: "550px" }}
      className="rounded-lg shadow-xl"
      contentClassName="p-0"
      headerClassName="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg p-4"
      onHide={onHide}
      closeOnEscape={true}
    >
      <div className="p-6">
        <p className="text-gray-600 mb-4">
          {t("whatsappDescription")}
        </p>
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="mb-2 md:mb-0">
                <h3 className="font-semibold text-gray-800">
                  {contact.clinica}
                </h3>
                <p className="text-gray-500 text-sm">
                  {t("phoneLabel")} {contact.phone}
                </p>
              </div>
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors font-medium"
              >
                <FaWhatsapp />
                <span>Whatsapp</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
}
