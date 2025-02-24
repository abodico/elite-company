"use client"
import React, { useEffect, useState } from "react"
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
    const [error, setError] = useState("")
    const [customer, setCustomer] = useState(false)

    const router = useRouter()
    useEffect(() => {
        const timer = setTimeout(() => setError(""), 5000)
        return () => clearTimeout(timer)
    }, [error])

    const { mutate } = usePostData(
        (customer ? "/customer" : "/user") + "/login"
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        mutate(
            { ...form },
            {
                onSuccess: (data) => {
                    Cookies.set("access", `${data?.data.authorization.token}`, {
                        expires: 0.25,
                    })
                    Cookies.set("user", `${data?.data.type}`, {
                        expires: 0.25,
                    })
                    Cookies.set(
                        "id",
                        `${
                            data?.data.type === "company"
                                ? data.data.company_id
                                : data?.data.user.id
                        }`,
                        {
                            expires: 0.25,
                        }
                    )
                    router.replace("/")
                },
                onError: (err) => {
                    setError(err)
                },
            }
        )
    }

    return (
        <div className="h-screen relative">
            <a
                href="/"
                className="inknut-antiqua-regular leading-[124px] text-5xl ml-4 text-white"
            >
                ELITE company
            </a>
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
                        value={form.email}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="flex items-center gap-2.5 border border-white rounded w-full mb-4">
                    <FiLock className="text-white ml-3.5" />
                    <input
                        placeholder="PASSWORD"
                        type="password"
                        className="bg-transparent p-3.5 outline-none w-full text-white"
                        value={form.password}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="flex items-center gap-4 text-white w-full">
                    <input
                        type="checkbox"
                        value={customer}
                        onChange={(e) => setCustomer(e.target.checked)}
                    />
                    <p>Customer?</p>
                </div>
                <div className="w-full">
                    <button
                        type="submit"
                        className="inline-block rounded border border-current px-8 py-3 text-sm text-primary bg-white shadow-[0px_4px_4px_0px_#0000004D] font-semibold w-full mt-12 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring ,active:text-indigo-500"
                    >
                        LOGIN
                    </button>
                    <a
                        href="/register"
                        className="text-white text-right block font-medium mt-3 leading-5 px-2"
                    >
                        Don't have an account ?
                    </a>
                </div>
            </form>
            {error?.response?.data?.errors?.length && (
                <div
                    role="alert"
                    className="rounded-sm border-s-4 border-red-500 bg-red-50 p-4 absolute bottom-4 left-4 max-w-sm max-h-fit"
                >
                    <div className="flex items-center gap-2 text-red-800">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clipRule="evenodd"
                            />
                        </svg>

                        <strong className="block font-medium">
                            Something went wrong
                        </strong>
                    </div>

                    <ul className="mt-2 text-sm text-red-700">
                        {error?.response?.data?.errors?.map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default LoginPage
