"use client"
import { useEffect, useState } from "react"
import Customer from "./_components/Customer"
import Company from "./_components/Company"
import Admin from "./_components/Admin"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export default function Home() {
    const [user, setUser] = useState("")
    const router = useRouter()
    useEffect(() => {
        setUser(Cookies.get("user"))
        const user = Cookies.get("user")
        if (!user) {
            router.push("/login")
        }
    }, [])

    return (
        <div className="h-[calc(100vh-93px)] w-full flex gap-9">
            {user === "admin" ? (
                <Admin />
            ) : user === "company" ? (
                <Company />
            ) : user === "customer" ? (
                <Customer />
            ) : (
                <></>
            )}
        </div>
    )
}
