"use client"
import { Afiliado } from '@/contexts/app'
import React, { useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas';

const blacklist = ["email", "senha"]
export default function CarteirinhaC({dados}:{dados:Afiliado}) {
    const [_dados, setDados] = useState(dados);
    useEffect(() => {
        const toDataURL = (url:string) => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))
        toDataURL(_dados.frente.foto)
        .then((da) => {
            console.log("ssssssss",da);
            setDados( {..._dados, frente:{..._dados.frente, foto: da as string}})
        })
    }, []);
    const imprimirCarteira = () => {
        console.log('!');
        let d = document.querySelector("#carteirinha-el");
        if(d){
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            html2canvas(d as HTMLElement).then(canvas => {
                var link = document.createElement('a');
                link.download = 'carteirinha.png';
                link.href = canvas.toDataURL("image/");
                canvas.getContext
                link.click();
            })
        } 
    }
    return(_dados && <div id="carteirinha-el" onClick={imprimirCarteira}>
        <div className={"carteirinha frente  bg-accent-green text-white rounded-xl"}>
            <img src="logo completa branca layout alt.png" className="logo"/>
            {Object.keys(_dados.frente).map( key => {
                if(blacklist.includes(key)) return
                if(key == "foto"){
                    return <img className="foto" src={_dados.frente[key]} />
                }// @ts-ignore
                return <div key={key} className={key}><small>{key}</small>{_dados.frente[key]}</div>
            })}
        </div>
        <div className={"carteirinha atras bg-accent-green text-white rounded-xl"}>
            {Object.keys(_dados.atras).map( key => {
                if(blacklist.includes(key)) return
                if(key == "assinatura_presidente")
                    return <img src={_dados.atras[key]} />
                // @ts-ignore
                return <div key={key} className={key}><small>{key}</small>{_dados.atras[key]}</div>
            })}
            <div className="assinatura-wrapper">

                <div>
                    <div className="w-full" style={{height: "2px"}}></div>
                    <small>Assinatura do(a) Presidente</small>
                </div>
            </div>
        </div>
        </div>
    )
}