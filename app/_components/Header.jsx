"use client"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import { BsPersonCircle } from "react-icons/bs"
import { RiHomeFill } from "react-icons/ri"
import Cookies from "js-cookie"
import { usePostData, useGetData } from "../utils/useQueries"

const Header = () => {
    const [user, setUser] = useState("")
    const { data } = useGetData(
        (Cookies.get("user") === "customer" ? "/customer" : "/user") +
            "/" +
            Cookies.get("id"),
        {
            Authorization: `Bearer ${Cookies.get("access")}`,
        }
    )
    useEffect(() => {
        setUser(Cookies.get("user"))
    }, [])
    const pathname = usePathname()

    if (pathname.endsWith("login") || pathname.endsWith("register"))
        return <></>
    return (
        <div className="bg-transparent flex justify-between pb-5,">
            <a
                href="/"
                className="inknut-antiqua-regular text-white ml-3.5 text-4xl leading-[93px] "
            >
                ELITE company
            </a>
            <div className="flex items-center gap-6 mr-20">
                {user !== "owner" ? (
                    <BsPersonCircle className="size-[60px] text-white" />
                ) : (
                    <RiHomeFill className="size-6 text-white" />
                )}
                <p className="text-white inter font-semibold text-2xl">
                    {data?.data?.data?.name}
                </p>
            </div>
        </div>
    )
}

export default Header
