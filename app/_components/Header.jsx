"use client"
import { usePathname } from "next/navigation"
import React, { useState } from "react"
import { BsPersonCircle } from "react-icons/bs"
import { RiHomeFill } from "react-icons/ri"

const Header = () => {
    const [userType, setUserType] = useState("admin")
    const pathname = usePathname()
    if (pathname.endsWith("login") || pathname.endsWith("register"))
        return <></>
    return (
        <div className="bg-transparent flex justify-between pb-5,">
            <h1 className="inknut-antiqua-regular text-white ml-3.5 text-4xl leading-[93px] ">
                ELITE company
            </h1>
            <div className="flex items-center gap-6 mr-20">
                {userType !== "company" ? (
                    <BsPersonCircle className="size-[60px] text-white" />
                ) : (
                    <RiHomeFill className="size-6 text-white" />
                )}
                <p className="text-white inter font-semibold text-2xl">Admin</p>
            </div>
        </div>
    )
}

export default Header
