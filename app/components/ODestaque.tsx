"use client"
import { Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import firebase_app from "../config";
import { DocumentData, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { PostData } from "./Posts";

export default function ODestaque() {
    const db = getFirestore(firebase_app);
    const [data, setData] = useState({} as PostData)

    useEffect(() => {

        const q = query(collection(db, "publicacao"), where("destaque", "==", true));

        getDocs(q)
            .then(querySnap => {
                setData({id: querySnap.docs[0].id, data: querySnap.docs[0].data()} as PostData);
            })

    }, [])

    console.log(data)
    if(!data.id){
        return <></>
    }
    const subTexto = data.data.texto? data.data.texto.substring(0, 200) : ""
    const dataPub = data.data? new Date(data.data.data.seconds * 1000).toLocaleDateString('pt-BR', { dateStyle: 'full' }): ""
    return (
        data && <Card className="destaque">
            <CardHeader
                title={data.data.titulo}
                subheader={dataPub}
            />
            <CardMedia
                sx={{ height: 200 }}
                image={data.data.capa}
                title={data.data.titulo}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Destaque
                </Typography>
                <Typography  variant="body2" color="text.secondary">
                    <div className="destaque-body" dangerouslySetInnerHTML={{__html: subTexto}}></div>
                    <a href={`/Post?id=${data.id}`} style={{float: 'right'}}>ler na integra...</a>
                </Typography>
            </CardContent>
        </Card>
    )
}