"use client"
import { Afiliado } from '@/contexts/app'
import React, { useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas';
import Link from 'next/link';

const blacklist = ["email", "senha"]

const LabelsMap = {
        nome: "Nome",
        email: "Email",
        foto: "Goto",
        cargo: "Cargo",
        insc: "N° Insc.",
        cpf: "CPF",
        rg: "RG",
        nascimento: "Cascimento",
        matricula: "Matrícula",
        emissao: "D. Emissão",
        filiacao: "Filiação",
        naturalidade: "Naturalidade",
        uf: "UF",
        endereco: "Endereço",
        bairro: "Bairro",
        cep: "CEP",
        cidade: "Cidade",
        lote: "Lote",
}

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
                return <div key={key} className={key}><small>{LabelsMap[key]}</small>{dados.frente[key]}</div>
            })}
        </div>
        <div className={"carteirinha atras bg-accent-green text-white rounded-xl"}>
            {Object.keys(dados.atras).map( key => {
                if(blacklist.includes(key)) return
                if(key == "assinatura_presidente")
                    return (
                        <div key={key} className="assinatura-wrapper">

                        <div>
                            <img className="w-full" style={{height: "2px"}} src={dados.atras[key]} />
                            <small>Assinatura do(a) Presidente</small>
                        </div>
                    </div>
                    )
                // @ts-ignore
                return <div key={key} className={key}><small>{LabelsMap[key]}</small>{dados.atras[key]}</div>
            })}
            
        </div>
        </>
    )
}