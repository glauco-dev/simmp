"use client"

import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import firebase_app from "../config";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("../components/Footer"), { ssr:false })

const defaultData = {
    historia: "",
    diretoria: "",
    estatuto: "",
    escolasECreches: [
    ],
    legislacao: [

    ],
}

export default function(){
    const [data, setData] = useState(defaultData);
    const db = getFirestore(firebase_app);

    useEffect(()=>{
        const q = query(collection(db, "institucional"));

        getDocs(q)
            .then(querySnap => {
                querySnap.forEach((doc) => {
                    // @ts-ignore
                    setData(doc.data());
                });
            })

    })
    return(
        <><div id="pagina-institucional">
            <article id="historia">
                <h2>
                    História do Sindicato
                </h2>
                <div dangerouslySetInnerHTML={{ __html: data.historia }}></div>
            </article>
            <article id="estatuto">
                <h2>Acesse o novo Estatuto do SIMMP, aprovado em novembro de 2014.</h2>
                <a href={data.estatuto}> Estatuto do Sindicato do Magistério Municipal Público de Vitória da Conquista (SIMMP/VC).</a>
            </article>
            <article id="diretoria">
                <h2>
                    Diretoria do sindicato
                </h2>
                <div dangerouslySetInnerHTML={{ __html: data.diretoria }}></div>
            </article>
            <article id="legislação">
                <h2>Legislação</h2>
                <ul>
                    {data.legislacao.map(leg => {
                        // @ts-ignore
                        return <li><a href={leg.arquivo || ""}>{leg.nome}</a></li>;
                    })}
                </ul>
            </article>

            <article id="escolas-e-creches">
                <h2>
                    Escolas e Creches
                </h2>
                <ul>
                    {data.escolasECreches.map(leg => {
                        // @ts-ignore
                        return <li><a href={leg.arquivo || ""}>{leg.nome}</a></li>;
                    })}
                </ul>
            </article>
        </div><Footer></Footer></>
    )
}