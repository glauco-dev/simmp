"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import firebase_app from "../config";
import { collection, doc, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import ReactMarkdown from 'react-markdown'
import PostContent from "./PostContent";

export type PostData = {
    id: string,
    data: {
        titulo: string,
        capa: string,
        categorias: Array<string>,
        data: {
            seconds: number,
            nanoseconds: number
        },
        destaque: boolean,
        galeria: string[],
        texto: string,
    }
}

export default function Posts({ tag }: { tag: string }) {
    const [data, setData]: [PostData[], Dispatch<SetStateAction<PostData[]>>] = useState([] as PostData[]);
    const db = getFirestore(firebase_app);

    useEffect(() => {

        const q = query(collection(db, "publicacao"), where("categories", "array-contains", tag));

        getDocs(q)
            .then(querySnap => {
                let _data: PostData[] = []
                querySnap.forEach((doc) => {
                    _data.push({ id: doc.id, data: doc.data() } as PostData)
                });
                setData(_data);
            })

    }, [])

    return (
        <>
            {data.map((post, index) => (
                <PostContent post={post}></PostContent>
            ))}
        </>
    )
}