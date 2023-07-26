"use client";

import React, { useCallback } from "react";

import { User as FirebaseUser } from "firebase/auth";
import {
    Authenticator,
    buildCollection,
    buildProperty,
    EntityReference,
    FirebaseCMSApp
} from "firecms";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

const firebaseConfig = {

    apiKey: "AIzaSyBvBmPKTc1xR5PdwAemX9KFLqRX4goG_WM",

    authDomain: "simmpfirebase.firebaseapp.com",

    databaseURL: "https://simmpfirebase-default-rtdb.firebaseio.com",

    projectId: "simmpfirebase",

    storageBucket: "simmpfirebase.appspot.com",

    messagingSenderId: "41649693709",

    appId: "1:41649693709:web:21ffe4efc087d9967ce144"


};

const publicacaoCollection = buildCollection({
    path: "publicacao",
    name: "Publicações",
    singularName: "Publicação",
    permissions: {
        edit: true,
        create: true,
        delete: true
    },
    properties: {
        titulo: {
            name: "Título",
            validation: { required: true },
            dataType: "string"
        },

        data: {
            name: "Data de publicação",
            dataType: "date",
            validation: { required: true },
        },
        categories: {
            name: "Categoria",
            description: "Categoria de publicação",
            longDescription: "Categoria na qual a publicação será depositada no website",
            validation: { required: true },
            dataType: "array",
            of: {
                dataType: "string",
                enumValues: {
                    noticias: "Notícias",
                    afiliados: "Afiliados",
                    comunicados: "Comunicados",
                    agenda: "Agenda",
                }
            }
        },
        destaque: {
            name: "Destaque (?)",
            dataType: "boolean",
        },
        texto: {
            name: "Texto",
            description: "Corpo de texto da publicação",
            dataType: "string",
            markdown: true,
        },
        capa: {
            name: "Capa",
            description: "Imagem capa da publicação",
            dataType: "string",
            storage: {
                storagePath: "imagens",
                acceptedFiles: ["image/*"],
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: (context) => {
                    return context.file.name;
                }
            }
        },
        galeria: {
            name: "Galeria de imagens",
            dataType: "array",
            of: {
                dataType: "string",
                storage: {
                    storagePath: "imagens",
                    acceptedFiles: ["image/*"],
                    metadata: {
                        cacheControl: "max-age=1000000"
                    },
                }
            }
        },

    }
})


export default function CMS() {

    const myAuthenticator: Authenticator<FirebaseUser> = useCallback(async ({
        user,
        authController
    }) => {
        // This is an example of retrieving async data related to the user
        // and storing it in the controller's extra field.
        const sampleUserRoles = await Promise.resolve(["admin"]);
        authController.setExtra(sampleUserRoles);

        return true;
    }, []);

    return <FirebaseCMSApp
        name={"Simmp"}
        basePath={"/cms"}
        authentication={myAuthenticator}
        collections={[publicacaoCollection]}
        firebaseConfig={firebaseConfig}
    />;
}