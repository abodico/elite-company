"use client"
import React, { useState } from "react"
import user from "/public/loginUser.svg"
import { GoPerson } from "react-icons/go"
import Image from "next/image"
import { FiLock } from "react-icons/fi"
import { FaAt } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { usePostData } from "../../utils/useQueries"

const RegisterPage = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        company: false,
    })

    const router = useRouter()
    const { mutate } = usePostData()

    const handleSubmit = (e) => {
        e.preventDefault()
        setForm({
            name: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value,
            passwordConfirm: e.target[3].value,
        })
        const userData = {
            name: form.firstName,
            email: form.email,
            password: form.password,
            password_confirmation: form.passwordConfirm,
        }
        if (form.password === form.passwordConfirm) {
            mutate(
                {
                    data: userData,
                    link: "http://127.0.0.1:8000/api/user",
                },
                {
                    onSuccess: () => {
                        mutate(
                            {
                                link: "http://127.0.0.1:8000/api/user/login",
                                data: {
                                    name: userData.name,
                                    password: userData.password,
                                },
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
                                    Cookies.set(
                                        "access",
                                        `${data?.data.authorization.token}`,
                                        {
                                            expires: 0.5,
                                        }
                                    )
                                    router.back()
                                },
                            }
                        )
                    },
                    onError: (err) => {
                        console.log(err)
                    },
                }
            )
        }
    }

    return (
        <div className="h-screen ">
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
                        placeholder="NAME"
                        type="text"
                        spellCheck="false"
                        className="bg-transparent p-3.5 w-full focus:outline-none text-white"
                    />
                </div>
                <div className="flex items-center gap-2.5 border border-white rounded mb-6 w-full">
                    <FaAt className="text-white ml-3.5" />
                    <input
                        placeholder="EMAIL"
                        type="email"
                        className="bg-transparent p-3.5 w-full focus:outline-none text-white"
                    />
                </div>
                {!form.company && (
                    <>
                        <div className="flex items-center gap-2.5 border border-white rounded mb-6 w-full">
                            <GoPerson className="text-white ml-3.5" />
                            <input
                                placeholder="ADDRESS"
                                type="text"
                                spellCheck="false"
                                className="bg-transparent p-3.5 w-full focus:outline-none text-white"
                            />
                        </div>
                        <div className="flex items-center gap-2.5 border border-white rounded mb-6 w-full">
                            <GoPerson className="text-white ml-3.5" />
                            <input
                                placeholder="EDUCATION"
                                type="text"
                                spellCheck="false"
                                className="bg-transparent p-3.5 w-full focus:outline-none text-white"
                            />
                        </div>
                    </>
                )}
                <div className="flex items-center gap-2.5 border border-white rounded mb-6 w-full ">
                    <FiLock className="text-white ml-3.5" />
                    <input
                        placeholder="PASSWORD"
                        type="password"
                        className="bg-transparent p-3.5 focus:outline-none w-full text-white"
                    />
                </div>
                <div className="flex items-center gap-2.5 border border-white rounded w-full">
                    <FiLock className="text-white ml-3.5" />
                    <input
                        placeholder="PASSWORD CONFIRM"
                        type="password"
                        className="bg-transparent p-3.5 focus:outline-none w-full text-white"
                    />
                </div>
                <div className="flex gap-4 mt-6 w-full">
                    <input
                        type="checkbox"
                        name="company"
                        id="company-check"
                        className="size-5"
                        checked={form.company}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                company: e.target.checked,
                            }))
                        }
                    />
                    <label htmlFor="company-check">New Company</label>
                </div>
                <div className="w-full">
                    <button
                        type="submit"
                        className="inline-block rounded border border-current px-8 py-3 text-sm text-primary bg-white shadow-[0px_4px_4px_0px_#0000004D] font-semibold w-full mt-4 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring ,active:text-indigo-500"
                    >
                        REGISTER
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

export default RegisterPage
