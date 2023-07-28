"use client"

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import firebase_app from "../config";

export default () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    const auth = getAuth(firebase_app);
    const [currentUser, setCurrentUser] = useState('');
    onAuthStateChanged(auth, () => {
        if(auth.currentUser?.email)
        setCurrentUser(auth.currentUser?.email);
    })

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const signOutCurrentUser = () => {
        signOut(auth).then(() => {
            setCurrentUser('');
        })
    }
    const toggleMenu = () => {
        document.querySelector('#navbar-default')?.classList.toggle('hidden')
    }
    return (
        <>
            <div className="w-full bg-accent-green py-6">
                <img src="logo completa branca.png" alt="" className={`mx-auto my-8`} style={{ maxHeight: '100px' }} /></div>
            <nav style={{border: "#4CAF50 solid 1px"}} className="drop-shadow-4xl bg-accent-green border-gray-200 dark:bg-gray-900  sticky top-0 z-50">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto">

                    <a href="/" className="flex items-center pl-3 absolute left-4" style={{ transition: "all 0.25s ease", opacity: scrollPosition > 120 ? 1 : 0 }}>
                        <img src="/logo incompleta branca.png" className="h-8 mr-3" alt="Simmp Logo" />
                    </a>
                    <button data-collapse-toggle="navbar-default" onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Abrir menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 14">
                            <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-full flex flex-col  max-w-4xl " id="navbar-default">
                        <ul className="nav-list font-medium flex justify-between flex-col p-4 md:p-0  mt-4 border border-light-accent-green rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <div className="flex">
                            {
                                [
                                    ["/Afiliado", "Afiliado"],
                                    ["#", "Agenda"],
                                    ["/Institucional", "Institucional"],
                                ].map((link, index) => {
                                    return (<li key={`navlink_${index}`} className="p-4 mx-0 hover:bg-darker-accent-green">
                                        <a href={`${link[0]}`} className="block py-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 ">{link[1]}</a>
                                    </li>)
                                })
                            }
                            </div>
                            {currentUser.length > 1 ?
                                <li className="p-4 ml-6 text-darker-accent-green w-max flex flex-row gap-4">
                                    <span>{currentUser}</span> <span className="text-silver cursor-pointer" onClick={signOutCurrentUser}>  sair?</span>
                                </li>
                                :
                                <li className="p-4 ml-6 text-darker-accent-green w-max flex flex-row gap-4">
                                </li>
                            }
                        </ul>
                    </div>
                </div>


            </nav>
        </>
    )
}