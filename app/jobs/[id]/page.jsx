"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"
import logo from "/public/loginUser.svg"
import edit from "/public/edit-1.svg"
import undo from "/public/undo-circle.svg"

const page = ({ props }) => {
    const router = useRouter()
    const handleEdit = () => {
        console.log("edited")
    }
    return (
        <div className="h-[calc(100vh-93px)] w-full flex ">
            <div className="bg-secondary w-1/3 h-screen relative -translate-y-[93px]">
                <button
                    className="transition hover:scale-110 absolute top-2 left-2 "
                    onClick={() => router.back()}
                >
                    <Image
                        src={undo.src}
                        alt="undo-icon"
                        width={50}
                        height={50}
                        className=""
                    />
                </button>
                <h2 className="text-3xl inknut-antiqua-bold text-primary text-center leading-[82px]">
                    Advanced skills
                </h2>
                <h3 className="text-3xl inknut-antiqua-regular text-primary text-center leading-[82px]">
                    Company
                </h3>
                <div className="size-[300px] bg-white rounded-[30px] mx-auto mt-24 flex justify-center items-center">
                    <Image
                        src={logo.src}
                        alt="logo"
                        width={182}
                        height={141}
                        className=""
                    />
                </div>
            </div>
            <div className="w-2/3 h-full">
                <h2 className="text-4xl leading-[92px] text-left inknut-antiqua-regular text-white px-16 my-4">
                    Jobs
                </h2>
                <div className="rounded-[30px] bg-secondary w-[672px] h-[417px] mx-auto relative ">
                    <ul className="w-full max-h-full overflow-auto ">
                        <li className="border-b-4 border-b-primary text-2xl font-semibold inter leading-6 p-2 flex items-center">
                            <p className="">
                                Providing comprehensive and advanced training
                                courses in programming
                            </p>
                            <button
                                className="transition hover:scale-110 "
                                onClick={handleEdit}
                            >
                                <Image
                                    src={edit.src}
                                    alt="edit-icon"
                                    width={30}
                                    height={30}
                                    className=""
                                />
                            </button>
                        </li>
                        <li className="border-b-4 border-b-primary text-2xl font-semibold inter leading-6 p-2 flex items-center">
                            <p className="">
                                Providing comprehensive and advanced training
                                courses in programming
                            </p>
                            <button
                                className="transition hover:scale-110 "
                                onClick={handleEdit}
                            >
                                <Image
                                    src={edit.src}
                                    alt="edit-icon"
                                    width={30}
                                    height={30}
                                    className=""
                                />
                            </button>
                        </li>
                        <li className="border-b-4 border-b-primary text-2xl font-semibold inter leading-6 p-2 flex items-center">
                            <p className="">
                                Providing comprehensive and advanced training
                                courses in programming
                            </p>
                            <button
                                className="transition hover:scale-110 "
                                onClick={handleEdit}
                            >
                                <Image
                                    src={edit.src}
                                    alt="edit-icon"
                                    width={30}
                                    height={30}
                                    className=""
                                />
                            </button>
                        </li>
                        <button className=" rounded-[30px] text-2xl font-semibold inter leading-6 p-3 text-black bg-primary transition hover:scale-110 hover:shadow-xl focus:outline-none absolute bottom-11 right-6 w-fit h-fit flex items-center gap-2 ">
                            <p>Add more</p>
                            <p className="size-7 rounded-full border-[3px] border-black">
                                +
                            </p>
                        </button>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default page
