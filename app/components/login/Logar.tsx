'use client'
import React from "react";
import {signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { Button, FormGroup, TextField } from "@mui/material";
import { TsetLoginTab } from "../../Afiliado/page";
import s from './styles.module.sass';
import { collection, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import firebase_app from "@/app/config";

function Page({cadastrar}:{cadastrar:TsetLoginTab}) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loginError, setLoginError] = React.useState("");
    const auth = getAuth();

    const handleForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        const db = getFirestore(firebase_app);
        const afiliadosRef = collection(db, "afiliados");
        const q1 = query(afiliadosRef, where("email", "==", email), where("senha", "==", password), where("ativo", "==", true));
        const userFind = await getDocs(q1);
        if(userFind.empty){
            setLoginError('Usuário não encontrado ou cadastro ainda não concluído pela administração, favor, entrar em contato se isso parecer um erro');
        }
        else{
            setLoginError('');
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            if(user){
                setLoginError('Usuário logado com sucesso.');
            }
        }
    }

    console.log("from signin => ", auth.currentUser);

    return (
        <div className={s['form-group']}>
            <h1 className="">Logar como afiliado</h1>
            <span>Ainda não se afiliou? <span className="login-form-alt" onClick={() => {cadastrar()}}>Preencha esse cadastro</span></span>
            <span> {loginError} </span>
            <FormGroup className={`${s['form']} ${s['form-login']}`}>
                <TextField
                    required
                    label="Email"
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                        setEmail(e.target.value); setLoginError('');}}
                    placeholder="exemplo@email.com" 
                    />
                <TextField
                    required
                    label="Senha"
                    type="password"
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                        setPassword(e.target.value); setLoginError('');}}
                    placeholder="exemplo@email.com" 
                    />
                <Button onClick={handleForm} type="submit" variant="outlined">Logar</Button>
            </FormGroup>
        </div>

    );
}

export default Page;
