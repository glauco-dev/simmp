"use client"
import { Afiliado } from '@/contexts/app'
import React, { useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas';
import Link from 'next/link';

const blacklist = ["email", "senha"]


export default function ({dados}:{dados:Afiliado}) {
    const [foto, setFoto] = useState(dados.frente.foto);

    return(dados && <>
        <div className={"carteirinha frente  bg-accent-green text-white rounded-xl"}>
            <img src="logo completa branca layout alt.png" className="logo"/>
            {Object.keys(dados.frente).map( key => {
                if(blacklist.includes(key)) return
                if(key == "foto"){// @ts-ignore
                    return <img key={key} className={key} src={foto} />
                }// @ts-ignore
                return <div key={key} className={key}><small>{key}</small>{dados.frente[key]}</div>
            })}
        </div>
        <div className={"carteirinha atras bg-accent-green text-white rounded-xl"}>
            {Object.keys(dados.atras).map( key => {
                if(blacklist.includes(key)) return
                if(key == "assinatura_presidente")
                    return <img src={dados.atras[key]} />
                // @ts-ignore
                return <div key={key} className={key}><small>{key}</small>{dados.atras[key]}</div>
            })}
            <div className="assinatura-wrapper">

                <div>
                    <div className="w-full" style={{height: "2px"}}></div>
                    <small>Assinatura do(a) Presidente</small>
                </div>
            </div>
        </div>
        </>
    )
}