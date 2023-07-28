"use client"
import { Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import firebase_app from "../config";
import { DocumentData, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function ODestaque() {
    const db = getFirestore(firebase_app);
    const [data, setData] = useState({} as DocumentData)

    useEffect(() => {

        const q = query(collection(db, "publicacao"), where("destaque", "==", true));

        getDocs(q)
            .then(querySnap => {
                setData(querySnap.docs[0].data());
            })

    }, [])

    console.log(data)
    const subTexto = data.texto? data.texto.substring(0, 200) : ""
    const dataPub = data.data? new Date(data.data.seconds * 1000).toLocaleDateString('pt-BR', { dateStyle: 'full' }): ""
    return (
        data && <Card className="destaque">
            <CardHeader
                title={data.titulo}
                subheader={dataPub}
            />
            <CardMedia
                sx={{ height: 200 }}
                image={data.capa}
                title={data.titulo}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Destaque
                </Typography>
                <Typography  variant="body2" color="text.secondary">
                    <div className="destaque-body" dangerouslySetInnerHTML={{__html: subTexto}}></div>
                    <a href="" style={{float: 'right'}}>ler na integra...</a>
                </Typography>
            </CardContent>
        </Card>
    )
}