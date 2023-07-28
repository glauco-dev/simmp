"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import firebase_app from "../config";
import { collection, doc, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import ReactMarkdown from 'react-markdown'

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
                <article className="mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                    <header className="mb-4 lg:mb-6 not-format">
                        <address className="flex items-center mb-6 not-italic">
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 ">
                                <img className="rounded-t-lg" src={post.data.capa} alt="" />
                                <div>
                                    <p className="text-base font-light text-gray-500 dark:text-gray-400"><time>{new Date(post.data.data.seconds * 1000).toLocaleDateString('pt-BR', { dateStyle: 'full' })}</time></p>
                                </div>
                            </div>
                        </address>
                        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl ">{post.data.titulo}</h1>
                    </header>
                    <p className="lead">
                        <div dangerouslySetInnerHTML={{ __html: post.data.texto }}></div>
                    </p>
                </article>
            ))}
        </>
    )
}