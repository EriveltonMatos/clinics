import { Dialog } from "primereact/dialog"

interface ContactData {
    [key: string]: string;
}

interface ContactDialogProps {
    header: string;
    visible: boolean;
    onHide: () => void;
    data: ContactData[];
    fieldName: string;
    fieldValue: string;
    contactLabel: string;
}

const ContactDialog: React.FC<ContactDialogProps> = ({ header, visible, onHide, data, fieldName, fieldValue, contactLabel}) => {
    return (
        <Dialog header={header} visible={visible} onHide={onHide}>
            <ul className="space-y-2">    
                {data.map((item, index) => (
                        <li key={index} className="text-lg">
                            Clínica: <span className="font-semibold">{item[fieldName]}</span> - {contactLabel} <span className="font-semibold">{item[fieldValue]}</span>
                        </li>
                ))}
            </ul>
        </Dialog>
    );
};

export default ContactDialog;
