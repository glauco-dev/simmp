"use client";
import { useContext } from "react";
import Carteirinha from "../components/Carteirinha";
import { UserContext } from "@/contexts/user";

export default function () {
    const { user } = useContext(UserContext);
    return (

        <div className="flex flex-col"><h2 id="printing-message" className="cursor-pointer" onClick={() => { window.print(); }}>
            Imprima
        </h2><div id="carteirinha-wrapper flex-col w-full" style={{display:'flex'}}>
                <Carteirinha dados={user}></Carteirinha>
            </div></div>
    )
}