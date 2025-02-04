"use client"
import React, { useState } from "react"
import user from "/public/loginUser.svg"
import { GoPerson } from "react-icons/go"
import Image from "next/image"
import { FiLock } from "react-icons/fi"
import { usePostData } from "/app/utils/useQueries"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

const LoginPage = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const router = useRouter()
    const { mutate } = usePostData()

    const handleSubmit = (e) => {
        e.preventDefault()
        setForm({
            email: e.target[0].value,
            password: e.target[1].value,
        })
        mutate(
            {
                link: "http://127.0.0.1:8000/api/user/login",
                data: { email: form.email, password: form.password },
            },
            {
                onSuccess: (data) => {
                    Cookies.set(
                        "refresh",
                        `${data?.data.authorization.token}`,
                        {
                            expires: 1,
                        }
                    )
                    Cookies.set("access", `${data?.data.authorization.token}`, {
                        expires: 0.5,
                    })
                    router.back()
                },
            }
        )
    }
    return (
        <div className="h-screen">
            <h1 className="inknut-antiqua-regular leading-[124px] text-5xl ml-4 text-white">
                ELITE company
            </h1>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="w-[370px] flex flex-col justify-center items-center mx-auto montserrat"
            >
                <Image
                    src={user.src}
                    alt="user"
                    width={92}
                    height={94}
                    className="mb-4"
                />
                <div className="flex items-center gap-2.5 border border-white rounded mb-6 w-full">
                    <GoPerson className="text-white ml-3.5" />
                    <input
                        placeholder="EMAIL"
                        type="text"
                        spellCheck="false"
                        className="bg-transparent p-3.5 focus:outline-none w-full text-white"
                    />
                </div>
                <div className="flex items-center gap-2.5 border border-white rounded w-full">
                    <FiLock className="text-white ml-3.5" />
                    <input
                        placeholder="PASSWORD"
                        type="password"
                        className="bg-transparent p-3.5 outline-none w-full text-white"
                    />
                </div>
                <div className="w-full">
                    <button
                        type="submit"
                        className="inline-block rounded border border-current px-8 py-3 text-sm text-primary bg-white shadow-[0px_4px_4px_0px_#0000004D] font-semibold w-full mt-12 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring ,active:text-indigo-500"
                    >
                        LOGIN
                    </button>
                    <a
                        href="#"
                        className="text-white text-right block font-medium mt-3 leading-5 px-2"
                    >
                        Forgot password?
                    </a>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
