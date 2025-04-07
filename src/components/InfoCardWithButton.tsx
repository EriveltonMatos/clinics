"use client"
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { Dialog } from "primereact/dialog";
import { JSX, useState } from "react";

export default function InfoCardWithButton({
  imageSrc,
  title,
  titleCard,
  description,
  imageCard,
  additionalContent,
}: {
  imageSrc: string;
  title: string;
  titleCard: string;
  description: string;
  imageCard: string;
  additionalContent?: JSX.Element | JSX.Element[];
}): JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <div
        className="
        relative 
        md:w-full w-80 h-full rounded-[10px] mx-auto
        shadow-[16px_16px_20px_#0000008c] 
        overflow-hidden
        before:absolute 
        before:top-[-50%]
        before:right-[-50%] before:bottom-[-50%] 
        before:left-[-50%] 
        hover:before:bg-[conic-gradient(transparent,transparent,#1F2B6C)]
        before:animate-spin-slow
        group
      "
      >
        <div
          className="
            absolute inset-1
            flex justify-center items-center
            hover:top-[10px] hover:right-[10px] hover:bottom-[10px] hover:left-[10px]
            rounded-[10px] px-4 bg-black
            shadow-[20px_20px_20px_#0000008c_inset]
            flex-col
            gap-4
          "
        >
          <Image
            src={imageSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-60"
            width={1000}
            height={1000}
          />
          <h2 className="relative flex justify-center text-white text-2xl md:text-[3vh] w-48 font-bold py-2 rounded-md">
            {title}
          </h2>

          <button
            onClick={() => setVisible(true)}
            className="group relative overflow-hidden rounded-lg bg-[#1F2B6C] px-[5vh] py-[2vh] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 border border-indigo-500"
          >
            <div className="absolute inset-0 flex translate-y-[100%] items-center justify-center bg-white/10 transition-transform duration-300 group-hover:translate-y-[0%]"></div>
            <div className="relative flex items-center justify-center gap-2 text-white">
            <ExternalLink size={18} className="transition-transform duration-300" />
            <span className="font-medium md:text-[1.5vh]">Saiba Mais</span>
            </div>
          </button>
          <Dialog
            header="Serviços"
            visible={visible}
            style={{ width: "auto" }}
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
          >
            <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-950 p-8 max-w-3xl mx-auto rounded-xl shadow-2xl">
              <h1 className="md:text-4xl text-3xl text-center font-extrabold text-white mb-6 flex justify-center p-4 items-center tracking-wide">
                {titleCard}
              </h1>
              <p className="text-white text-sm md:text-lg leading-relaxed bg-black bg-opacity-30 p-4 mx-auto rounded-lg shadow-md flex justify-center items-center gap-8 max-lg:flex-col">
                {description}
                <Image
                  src={imageCard}
                  alt={title}
                  className="object-cover rounded-lg border w-64 h-64 mx-auto"
                  width={1000}
                  height={1000}
                />
              </p>
            </div>
            <div>{additionalContent}</div>
          </Dialog>
        </div>
      </div>
    </>
  );
}
