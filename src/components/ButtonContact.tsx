"use client"
import React, { useRef, useState } from 'react';
import { SpeedDial } from 'primereact/speeddial';
import { Toast } from 'primereact/toast';
import { MenuItem } from 'primereact/menuitem';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { BsFillTelephoneFill } from "react-icons/bs";
import ContactDialog from './contact-dialog-components/ContactDialog';
import ContactDialogWhatsapp from './contact-dialog-components/ContactDialogWhatsapp';

export default function ContactSpeedDial() {
    const toast = useRef<Toast>(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogType, setDialogType] = useState<"phone" | "email">("phone");
    const [whatsappDialogVisible, setWhatsappDialogVisible] = useState(false);
    
    const openDialog = (type: "phone" | "email") => {
        setDialogType(type);
        setDialogVisible(true);
    };
    
    const hideDialog = () => {
        setDialogVisible(false);
    };

    const openWhatsappDialog = () => {
        setWhatsappDialogVisible(true);
    };

    const hideWhatsappDialog = () => {
        setWhatsappDialogVisible(false);
    };

    const contactItems: MenuItem[] = [
        {
            label: 'Telefone',
            icon: BsFillTelephoneFill,
            className: "bg-gradient-to-r from-blue-950 to-blue-800",
            command: () => {
                openDialog("phone");
            }
        },
        {
            label: 'WhatsApp',
            icon: FaWhatsapp,
            className: "bg-emerald-600",
            command: () => {
                openWhatsappDialog();
            }
        },
        {
            label: 'Email',
            icon: FaEnvelope,
            className: "bg-gradient-to-r from-[#159EEC] to-blue-500",
            command: () => {
                openDialog("email");
            }
        }
    ];

    return (
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
            <Toast ref={toast} />
            <div className="bg-emerald-600 text-white p-5 rounded-full shadow-lg hover:bg-emerald-700 transition flex items-center justify-center cursor-pointer">
                <SpeedDial 
                    model={contactItems} 
                    radius={120} 
                    type="quarter-circle" 
                    direction="up-left" 
                    buttonClassName="p-button-rounded p-button-text" 
                    showIcon={<FaWhatsapp/>}
                />
            </div>
            
            <ContactDialog 
                type={dialogType}
                visible={dialogVisible}
                onHide={hideDialog}
            />

            <ContactDialogWhatsapp 
                visible={whatsappDialogVisible}
                onHide={hideWhatsappDialog}
            />
        </div>
    );
}