import Config from "@/config";
import * as React from 'react';
import Image from "next/image";
import ScoreBar from "../ScoreBar/ScoreBar";

interface MovieCardInterface {
    title: string;
    score: number;
    photoPath: string;
    year: number;
    size?: "default" | "small" | "xsmall";
}

const MovieCard: React.FC<MovieCardInterface> = ({
    title,
    score,
    photoPath,
    year,
    size = "default"
}) => {

    const photo = Config.IMAGE_SOURCE + photoPath;

    if(size === "small") {
        return (
            <div className="items-center flex flex-col justify-center rounded-3xl h-110 shadow-sm group border-2 border-emerald-500 hover:-translate-y-1 bg-black text-gray-100 font-sans mb-5 mx-1 w-58">
                <Image 
                src={photo}
                width="240"
                height="170"
                
                alt={title}
                className="object-cover pt-6 px-6"
                />
                <p className="pt-3 pb-1.5 group-hover:font-bold text-md text-center w-[90%]">{title}</p>
                <p className="pb-4 text-sm">({year})</p>
                <div className="w-[80%]">
                    <ScoreBar value={score}/>
                </div>
                <div className="pb-6"/>
            </div>
        );
    }

    if(size === "xsmall") {
        return (
            <div className="items-center flex flex-col justify-center rounded-3xl h-90 shadow-sm group border-2 border-emerald-500 hover:-translate-y-1 bg-black text-gray-100 font-sans mb-5 mx-1 w-40">
                <Image 
                src={photo}
                width="190"
                height="160"
                
                alt={title}
                className="object-cover pt-6 px-6"
                />
                <p className="pt-3 pb-1.5 group-hover:font-bold text-sm text-center w-[90%]">{title}</p>
                <p className="pb-4 text-xs">({year})</p>
                <div className="w-[80%]">
                    <ScoreBar value={score}/>
                </div>
                <div className="pb-6"/>
            </div>
        );
    }  

    return (
        <div className="items-center flex flex-col justify-center rounded-3xl h-140 shadow-sm group border-2 border-emerald-500 hover:-translate-y-1 bg-black text-gray-100 font-sans mb-5 mx-2.5">
            <Image 
              src={photo}
              width="290"
              height="200"
            
              alt={title}
              className="object-cover pt-6 px-6"
            />
            <p className="pt-3 pb-1.5 group-hover:font-bold text-xl text-center w-[90%]">{title}</p>
            <p className="pb-4">({year})</p>
            <div className="w-[80%]">
                <ScoreBar value={score}/>
            </div>
            <div className="pb-6"/>
        </div>
    );
};

export default MovieCard;