import { JSX } from "react";

export default function InfoCard({
    imageSrc,
    title,
    description,
  }: {
    imageSrc: string;
    title: string;
    description: string;
  }): JSX.Element {
    return (
      <div
        className="
          relative 
          w-full h-full rounded-[10px] 
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
            "
          >
            <img
              src={imageSrc}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-60"
            />
            <h2 className="relative flex justify-center text-white text-2xl w-48 font-bold py-2 rounded-md shadow-lg">
              {title}
            </h2>
            <div className="absolute inset-0 bg-[#1F2B6C] text-white p-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center z-10">
              <p>{description}</p>
            </div>
          </div>
      </div>
    );
  }