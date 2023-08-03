"use client";
import { useContext,  useEffect,  useState } from "react";
import Cadastrar from '../components/login/Cadastrar';
import Logar from '../components/login/Logar';
import { getAuth } from "firebase/auth";
import firebase_app from "../config";
import Posts from "../components/Posts";
import Carteirinha from "../components/Carteirinha";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { UserContext } from "@/contexts/user";
import { InstitucionalContext } from "@/contexts/institucional";
import Breadnav from "../components/breadnav";
const Footer = dynamic(() => import("../components/Footer"), { ssr:false })

export type TsetLoginTab = () => void

export default function Afiliado() {
    const searchParams = useSearchParams()
    const _loginTab = searchParams.get('login')

    const {user} = useContext(UserContext);
    const [currentUser, setUser] = useState(user);
    const [loginTab, setLoginTab] = useState(_loginTab  || false);
    const {data} = useContext(InstitucionalContext);

    useEffect(()=>{
        setUser(user)
    }, [user])

    if(currentUser == null)
    return <></>

    console.log("da afiliados/page", currentUser)

    return (<>
        {currentUser.frente.nome.length > 0 ?
            <article id="afiliados-posts" className="posts my-12 flex flex-col gap-6">
                <Breadnav/>
                <h2>Posts exclusivos</h2>
                <Posts tag="afiliados"></Posts>
            </article>
            : <article id="login_layout">
                <div dangerouslySetInnerHTML={{__html: data.vantagensAfiliado}} />
            {
            loginTab ? <Logar cadastrar={() => { setLoginTab(false) }}></Logar>
                : <Cadastrar logar={() => { setLoginTab(true) }}></Cadastrar>
            }</article>
        }
        <Footer></Footer>
    </>)
}