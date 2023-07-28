"use client"

import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import firebase_app from "../config";
import dynamic from "next/dynamic";

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
        <div id="pagina-institucional">
            <article>
                <h2>
                    História do Sindicato
                </h2>
                <div dangerouslySetInnerHTML={{__html:data.historia}}></div>
            </article>
            <article className="estatuto">
                <h2>Acesse o novo Estatuto do SIMMP, aprovado em novembro de 2014.</h2>
                <a href={data.estatuto}> Estatuto do Sindicato do Magistério Municipal Público de Vitória da Conquista (SIMMP/VC).</a>
            </article>
            <article>
                <h2>
                    Diretoria do sindicato
                </h2>
                <div dangerouslySetInnerHTML={{__html:data.diretoria}}></div>
            </article>
            <article>
                <h2>Legislação</h2>
                <ul>
                    {data.legislacao.map( leg => {
                        // @ts-ignore
                        return <li><a href={leg.arquivo || ""}>{leg.nome}</a></li>
                    })}
                </ul>
            </article>
            
            <article>
                <h2>
                    Escolas e creches
                </h2>
                <ul>
                    {data.escolasECreches.map( leg => {
                        // @ts-ignore
                        return <li><a href={leg.arquivo || ""}>{leg.nome}</a></li>
                    })}
                </ul>
            </article>
        </div>
    )
}