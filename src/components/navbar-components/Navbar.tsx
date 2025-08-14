"use client";
import Image from "next/image";
import logoClinica from "@/assets/logo-clinica.png";
import { useState } from "react";
import { FaPhoneVolume } from "react-icons/fa";
import ContactDialog from "../contact-dialog-components/ContactDialog";
import ContactDialogWhatsapp from "../contact-dialog-components/ContactDialogWhatsapp";
import { MdOutlineEmail, MdWhatsapp } from "react-icons/md";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const [visibleContacts, setVisibleContacts] = useState(false);
  const [visibleEmails, setVisibleEmails] = useState(false);
  const [visibleWhatsapp, setVisibleWhatsapp] = useState(false);
  const t = useTranslations("ContactDialog");
  

  return (
    <div>
      <nav className="bg-sky-50 h-16 flex items-center max-lg:hidden">
        <div className="flex items-center w-96 h-48 bg-sky-50 rounded-e-full relative z-50">
          <Image
            src={logoClinica.src}
            alt="Logo da Unichristus"
            className="w-80 ml-4 mt-16 object-cover relative z-50 animate-fade-right"
            width={1000}
            height={1000}
          />
        </div>

        <div className="relative z-10 mx-auto flex">
          <div className="flex space-x-5 ml-[75vh] animate-fade-right">
            <div
              className="flex items-center space-x-1 border rounded-xl p-[1.2vh] bg-[#2B3E70] group hover:scale-105 transition-all cursor-pointer"
              onClick={() => setVisibleContacts(true)}
            >
              <FaPhoneVolume className="text-white text-xl group-hover:animate-wiggle-more" />
              <div className="flex flex-col">
                <span className="text-white text-sm max-xl:text-xs">
                  {t("phone")}
                </span>
              </div>
            </div>

            <div
              className="flex items-center space-x-1 border rounded-xl p-2 bg-emerald-500 group hover:scale-105 transition-all cursor-pointer"
              onClick={() => setVisibleWhatsapp(true)}
            >
              <MdWhatsapp className="text-white text-xl group-hover:animate-wiggle-more" />
              <div className="flex flex-col">
                <span className="text-white text-sm max-xl>text-xs">
                  Whatsapp
                </span>
              </div>
            </div>

            <div
              className="flex items-center space-x-1 border rounded-xl p-2 bg-[#159EEC] group hover:scale-105 transition-all cursor-pointer"
              onClick={() => setVisibleEmails(true)}
            >
              <MdOutlineEmail className="text-white text-xl group-hover:animate-wiggle-more" />
              <div className="flex flex-col">
                <span className="text-white text-sm max-xl>text-xs">
                  Emails
                </span>
              </div>
            </div>

            <ContactDialog
              type="phone"
              visible={visibleContacts}
              onHide={() => setVisibleContacts(false)}
            />

            <ContactDialogWhatsapp
              visible={visibleWhatsapp}
              onHide={() => setVisibleWhatsapp(false)}
            />

            <ContactDialog
              type="email"
              visible={visibleEmails}
              onHide={() => setVisibleEmails(false)}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
