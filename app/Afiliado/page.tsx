"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Cadastrar from '../components/login/Cadastrar';
import Logar from '../components/login/Logar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase_app from "../config";
import Posts from "../components/Posts";
import Carteirinha from "../components/login/Carteirinha";
import { DocumentData, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("../components/Footer"), { ssr:false })


export type TsetLoginTab = () => void
export type Afiliado = {
    frente: {
        nome: string,
        foto: string,
        cargo: string,
        insc: string,
        cpf: string,
        rg: string,
        nascimento: string,
        matricula: string,
        emissao: string,
    },
    atras: {
        filiacao: string,
        naturalidade: string,
        uf: string,
        endereco: string,
        bairro: string,
        cep: string,
        cidade: string,
        lote: string,
        assinatura_presidente: string
    }

}

const defaultUserData = {
    frente: {
        nome: "",
        foto: "",
        cargo: "",
        insc: "",
        cpf: "",
        rg: "",
        nascimento: "",
        matricula: "",
        emissao: "",
    },
    atras: {
        filiacao: "",
        naturalidade: "",
        uf: "",
        endereco: "",
        bairro: "",
        cep: "",
        cidade: "",
        lote: "",
        assinatura_presidente: "",
    }
}

function deserializeUser(user: DocumentData): Afiliado {
    const { nome, foto, cargo, insc, cpf, rg, nascimento, matricula, emissao, filiacao, naturalidade, uf, endereco, bairro, cep, cidade, lote, assinatura_presidente } = user;
    return { frente: { nome, foto, cargo, insc, cpf, rg, nascimento, matricula, emissao }, atras: { filiacao, naturalidade, uf, endereco, bairro, cep, cidade, lote, assinatura_presidente } }
}

export default function Afiliado() {
    const auth = getAuth(firebase_app)
    const [state, setState]: [Afiliado, Dispatch<SetStateAction<Afiliado>>] = useState(defaultUserData);
    const [loginTab, setLoginTab] = useState(false);
    const db = getFirestore(firebase_app);
    const afiliadosRef = collection(db, "afiliados");

    useEffect(() => {
        onAuthStateChanged(auth, async () => {
            if (auth.currentUser) {
                const q1 = query(afiliadosRef, where("email", "==", auth.currentUser.email));
                const userFind = deserializeUser((await getDocs(q1)).docs[0].data());
                setState(userFind);
            }
            else
                setState(defaultUserData);
        })
    });


    return <>
        {state.frente.nome.length > 0 ?
            <>
                <Posts tag="afiliados"></Posts>
                <article className="mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                    <Carteirinha dados={state}></Carteirinha>
                </article>
            </>
            :
            loginTab ? <Logar cadastrar={() => { setLoginTab(false) }}></Logar>
                : <Cadastrar logar={() => { setLoginTab(true) }}></Cadastrar>
        }
        <Footer></Footer>
    </>
}