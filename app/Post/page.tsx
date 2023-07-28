"use client"
import PostContent from "../components/PostContent";
import { useSearchParams } from 'next/navigation'
import { PostData } from "../components/Posts";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import firebase_app from "../config";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("../components/Footer"), { ssr:false })

export default function Post() {
    const searchParams = useSearchParams()

    const id = searchParams.get('id')
    const [data, setData] = useState({} as PostData);
    const db = getFirestore(firebase_app);

    useEffect(() => {
        const q = doc(db, "publicacao/" +id);
        getDoc(q).then(snap => {
            console.log(snap.data());
            setData({id: snap.id, data: snap.data()} as PostData);
        })
    })
    return data.data && 
        <><PostContent post={data}></PostContent><Footer></Footer></>
}