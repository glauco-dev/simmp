"use client";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import ODestaque from "./components/ODestaque";
import dynamic from "next/dynamic";
import { getAuth } from "firebase/auth";
import firebase_app from "./config";
import { ChakraProvider } from "@chakra-ui/react";

const Footer = dynamic(() => import("./components/Footer"), { ssr:false })


export default function Home() {
  console.log(getAuth(firebase_app).currentUser?.email)
  return (

    <>
    <main className="container flex min-h-screen flex-col items-center justify-between p-2 pt-10
      w-padrao-container
      mx-auto">
      <div id="landing">
          <h1 id="title">Destaque</h1>
          <ODestaque></ODestaque>
        <img src="FME-LOGO(1).png" className="fme"></img>
        <a href="/Galerias" className="galeria">
          <h2 className="h2">Galerias</h2>
          <img src="logo incompleta branca.png" alt="" />
        </a>
        <div className="banners"></div>
      </div>
    </main><Footer></Footer></>
  )
}
