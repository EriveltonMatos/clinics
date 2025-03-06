"use client"
import { useState } from "react";
import logoClinica from "../assets/logo-clinica.png";
import { FaPhoneVolume } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import ContactDialog from "./ContactDialog";

export default function NavBar() {
  const [visibleContacts, setVisibleContacts] = useState(false);
  const [visibleWhatsapp, setVisibleWhatsapp] = useState(false);
  const [visibleEmails, setVisibleEmails] = useState(false);

  const contacts = [
    { clinic: "Clínica Escola de Saúde e Imagem (CESIU)", phone: "3306-8232 e 3306-8933" },
    { clinic: "Serviço Escola de Psicologia Aplicada (SEPA)", phone: "3468-2500" },
    { clinic: "Clínica Escola de Odontologia", phone: "3265-8139"},
    { clinic: "Clínica Escola de Atenção Primária (CEAP)", phone: "3214-8776"},
  ];
  const whatsapp = [{ clinic: "Serviço Escola de Psicologia Aplicada (SEPA)", phone: "99401-5648" }];
  const emails = [{ clinic: "Serviço Escola de Psicologia Aplicada (SEPA)", email: "secsepa@unichristus.edu.br" }];

  return (
    <div>
      <nav className="bg-sky-50 h-16 flex items-center max-lg:hidden">
        <div className="flex items-center w-96 h-48 bg-sky-50 rounded-e-full relative z-50">
          <img
            src={logoClinica.src}
            alt="Logo da clínica"
            className="w-80 ml-5 mt-20 object-cover relative z-50 animate-fade-right"
          />
        </div>

        <div className="relative z-10 mx-auto flex">
          <div className="flex space-x-5 ml-[75vh] animate-fade-right">
            <div
              className="flex items-center space-x-1 border rounded-xl p-[1.2vh] bg-[#2B3E70] group hover:scale-105 transition-all"
              onClick={() => setVisibleContacts(true)}
            >
              <FaPhoneVolume className="text-white text-xl group-hover:animate-wiggle-more" />
              <div className="flex flex-col">
                <a href="#" className="text-white text-sm max-xl:text-xs">
                  Contatos
                </a>
              </div>
            </div>
            <ContactDialog
              header="Contatos das Clínicas"
              visible={visibleContacts}
              onHide={() => setVisibleContacts(false)}
              data={contacts}
              fieldName="clinic"
              fieldValue="phone"
              contactLabel="Telefone:"
            />
            <div className="flex space-x-10 ml-96 animate-fade-right">
              <div
                className="flex items-center space-x-1 border rounded-xl p-2 bg-[#40C351] group hover:scale-105 transition-all"
                onClick={() => setVisibleWhatsapp(true)}
              >
                <FaWhatsapp className="text-white text-xl group-hover:animate-wiggle-more" />
                <div className="flex flex-col">
                  <a href="#" className="text-white text-sm max-xl:text-xs">
                    Whatsapp
                  </a>
                </div>
              </div>
            </div>
            <ContactDialog
              header="Whatsapp das Clínicas"
              visible={visibleWhatsapp}
              onHide={() => setVisibleWhatsapp(false)}
              data={whatsapp}
              fieldName="clinic"
              fieldValue="phone"
              contactLabel="Whatsapp:"
            />

            <div className="flex space-x-10 ml-96 animate-fade-right">
              <div
                className="flex items-center space-x-1 border rounded-xl p-2 bg-[#159EEC] group hover:scale-105 transition-all"
                onClick={() => setVisibleEmails(true)}
              >
                <MdOutlineEmail className="text-white text-xl group-hover:animate-wiggle-more" />
                <div className="flex flex-col">
                  <a href="#" className="text-white text-sm max-xl:text-xs">
                    Emails
                  </a>
                </div>
              </div>
            </div>
            <ContactDialog
              header="Emails das Clínicas"
              visible={visibleEmails}
              onHide={() => setVisibleEmails(false)}
              data={emails}
              fieldName="clinic"
              fieldValue="email"
              contactLabel="email:"
             />
          </div>
        </div>
      </nav>
    </div>
  );
}
