"use client";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { Context, Dispatch, Provider, ReactElement, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import firebase_app from '../app/config';
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot, getFirestore, onSnapshot, onSnapshotsInSync } from "firebase/firestore";
import { QueryFac } from "./generics";
import { PostData } from "./posts";
import { AfiliadosProvider } from "./afiliados";
import { UserContextProvider } from "./user";
import { PostsContextProvider } from "./posts";

const auth = getAuth(firebase_app);

export type Afiliado = {
    frente: {
        nome: string,
        email: string,
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
        senha: string,
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

export const defaultUserData = {
    frente: {
        nome: "",
        email: "",
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
        senha: "",
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




export type TContextProps = { children: ReactNode }


export default function AllProviders({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <AfiliadosProvider>
            <UserContextProvider>
                <PostsContextProvider>
                    {children}
                </PostsContextProvider>
            </UserContextProvider>
        </AfiliadosProvider>
    )
}