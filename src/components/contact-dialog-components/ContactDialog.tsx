import { Dialog } from "primereact/dialog";
import { useState } from "react";

interface PhoneContact {
  clinic: string;
  phone: string;
}

interface EmailContact {
  clinic: string;
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
  const phoneContacts: PhoneContact[] = [
    { clinic: "Clinica Escola de Saúde e Imagem (CESIU)", phone: "3306-8933" },
    { clinic: "Serviço Escola de Psicologia Aplicada (SEPA)", phone: "3468-2500" }, 
    { clinic: "Clínica Escola de Odontologia", phone: "3265-8139" },
    { clinic: "Clínica Escola de Saúde (CES)", phone: "3306-8232" },
    { clinic: "Clínica Escola de Fisioterapia - Campus Parque Ecológico", phone: "3265-8123" },
    { clinic: "Clínica Escola de Fisioterapia - Campus Parquelândia", phone: "3499-1349" },
  ];

  const emailContacts: EmailContact[] = [
    {
      clinic: "Serviço Escola de Psicologia Aplicada (SEPA)",
      email: "secsepa@unichristus.edu.br",
    },
    {
      clinic: "Clínica Escola de Fisioterapia - Campus Parque Ecológico",
      email: "clinicafisioterapia@unichristus.edu.br",
    },
    {
      clinic: "Clínica Escola de Fisioterapia - Campus Parquelândia",
      email: "cef01.pql@unichristus.edu.br",
    },
  ];

  const isPhone = type === "phone";
  const header = isPhone ? "Contatos das Clínicas" : "E-mails das Clínicas";
  const contactLabel = isPhone ? "Telefone:" : "E-mail:";
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
          Informações de {isPhone ? "Contato" : "E-mail"} das clínicas:
        </p>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{item.clinic}</h3>
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
