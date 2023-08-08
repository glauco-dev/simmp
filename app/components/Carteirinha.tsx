"use client"
import { Afiliado } from '@/contexts/app'
import React, { useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas';

const blacklist = ["email", "senha"]
function fetchImageAndDownload (url:string) {
         // Anchor href 

    const img = document.createElement("img");   // Create in-memory image
    img.addEventListener("load", () => {
        const a = document.createElement("a");   // Create in-memory anchor
        a.href = img.src;                        // href toward your server-image
        a.click();                               // Trigger click (download)
    });
    img.src = 'fetchImage?url='+ url;       // Request image from your server
    return img
}


function loadXHR(url:string) {

    return new Promise(function(resolve, reject) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.onerror = function() {reject("Network error.")};
            xhr.onload = function() {
                if (xhr.status === 200) {resolve(xhr.response)}
                else {reject("Loading error:" + xhr.statusText)}
            };
            xhr.send();
        }
        catch(err:any) {reject(err.message)}
    });
}

export default function ({dados}:{dados:Afiliado}) {
    const [foto, setFoto] = useState(dados.frente.foto);
    

    useEffect(()=>{
        console.log(foto);
        fetch(foto)
        .then(function(response) {
            return response.blob()
        }).then(function(blob:any) {
            setFoto(URL.createObjectURL(blob));
        });

    },[])

    const imprimirCarteira = () => {
        let d = document.querySelector("#carteirinha-el");
        if(d){
            html2canvas(d as HTMLElement, {allowTaint:true}).then(canvas => {
                var link = document.createElement('a');
                link.download = 'carteirinha.png';
                console.log(canvas.toDataURL);
                link.href = canvas.toDataURL("image/jpeg");
                link.click();
            })
        } 
    }

    return(dados && <div id="carteirinha-el" onClick={imprimirCarteira}>
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
        </div>
    )
}