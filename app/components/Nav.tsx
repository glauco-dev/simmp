"use client"

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import firebase_app from "../config";
import Carteirinha from "./Carteirinha";
import { Box, Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { UserContext, __AUTH_CONTENT__, defaultUserData } from "../../contexts/user";

export default () => {
    const [scrollY, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    const auth = getAuth(firebase_app);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const logout = () => {
        signOut(auth).then(() => {
            console.log("bye")
            setUser(defaultUserData);
        })
    }
    const toggleMenu = () => {
        document.querySelector('#navbar-default')?.classList.toggle('hidden')
    }

    console.log(usePathname());
    return (
        <>
            <div className="w-full bg-accent-green py-6">
                <Link href="/"><img src="/logo completa branca.png" alt="" className={`mx-auto my-8`} style={{ maxHeight: '100px' }} /></Link></div>
            {usePathname() !== "/cms" &&
                <nav id="website-nav" style={{ border: "#4CAF50 solid 1px" }}
                    className="drop-shadow-4xl bg-accent-green border-gray-200 dark:bg-gray-900  sticky top-0 z-50">
                    <div className="md:w-padrao-container flex flex-wrap items-center justify-center mx-auto">

                        <button data-collapse-toggle="navbar-default" onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                            <span className="sr-only">Abrir menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 14">
                                <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                        <div className="hidden w-full md:block md:w-full flex flex-col   z-50" id="navbar-default">
                            <ul className="nav-list font-medium flex justify-between flex-col p-4 md:p-0  mt-4 border border-light-accent-green rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <div className="flex">
                                    {
                                        [
                                            ["/", "Início"],
                                            ["/Afiliado", "Afiliação"],
                                            ["#", "Agenda"],
                                        ].map((link, index) => {
                                            return (<li key={`navlink_${index}`} className="p-4 pt-6 pb-6 mx-0 hover:bg-darker-accent-green transition-all">
                                                <Link href={`${link[0]}`} className="block py-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 ">{link[1]}</Link>
                                            </li>)
                                        })
                                    }



                                    <Link href="/Institucional" id="dropdownHoverButton" data-dropdown-toggle="instDropMenu" data-dropdown-placement="bottom-start"
                                        data-dropdown-offset-distance={"1px"} data-dropdown-trigger="hover" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Sobre<svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                        </svg></Link>

                                    <div id="instDropMenu" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-b-lg shadow w-44 dark:bg-gray-700">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                                            {[["#historia", "História"], ["#estatuto", "Estatuto"], ["#diretoria", "Diretoria"], ["#legislação", "Legislação"], ["#escolas-e-creches", "Escolas e Creches"]]
                                                .map((arrLink, index) => {
                                                    return (
                                                        <li key={`inst_link_${index}`}>
                                                            <Link href={`${usePathname() === "Institucional/" ? "" : "Institucional/"}${arrLink[0]}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-light-accent-green">{arrLink[1]}</Link>
                                                        </li>
                                                    )
                                                })}


                                        </ul>
                                    </div>
                                </div>
                                {user.frente.insc.length > 3 ?
                                    <li className="items-center p-4 ml-6 text-darker-accent-green w-max flex flex-row gap-4">
                                        <Popover trigger="hover" placement='bottom-end'>
                                            <PopoverTrigger>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer hover:scale-105 transition-all hover:bg-accent-green rounded-sm" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M19.728 10.686c-2.38 2.256-6.153 3.381-9.875 3.381-3.722 0-7.4-1.126-9.571-3.371L0 10.437V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7.6l-.272.286Z"></path>
                                                    <path d="m.135 7.847 1.542 1.417c3.6 3.712 12.747 3.7 16.635.01L19.605 7.9A.98.98 0 0 1 20 7.652V6a2 2 0 0 0-2-2h-3V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H2a2 2 0 0 0-2 2v1.765c.047.024.092.051.135.082ZM10 10.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM7 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H7V3Z"></path>
                                                </svg>
                                            </PopoverTrigger>
                                            <PopoverContent borderRadius={"12"} width={"fit-content"} padding={"2"} paddingBottom={"4"}>
                                                <Carteirinha dados={user} />
                                            </PopoverContent>
                                            <Box onClick={logout} className="cursor-pointer block py-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 ">Logout</Box>

                                        </Popover>
                                    </li>
                                    :
                                    <li className=" items-center  p-4 ml-6 text-darker-accent-green w-max flex flex-row gap-4">
                                        <Link href={`/Afiliado?login=true#login`} className="block py-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 ">Login</Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>


                </nav>}
        </>
    )
}