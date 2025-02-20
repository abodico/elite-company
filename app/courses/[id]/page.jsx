"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import logo from "/public/loginUser.svg"
import edit from "/public/edit-1.svg"
import undo from "/public/undo-circle.svg"
import { useDeleteData, useGetData, usePostData } from "../../utils/useQueries"
import Cookies from "js-cookie"
import InputsBox from "../../_components/InputsBox"

const inputs = [{ type: "file", name: "Videos" }]
const page = ({ params }) => {
    const [openInputsBox, setOpenInputsBox] = useState(false)
    const unwrappedParams = React.use(params)
    const { id } = unwrappedParams
    const { data } = useGetData("/course/" + id)
    const { mutate: deleteVideo } = useDeleteData({
        Authorization: `Bearer ${Cookies.get("access")}`,
    })
    const { mutate: addVideo } = usePostData("/course/" + id + "/addvideo", {
        Authorization: `Bearer ${Cookies.get("access")}`,
    })

    const router = useRouter()
    const handleEdit = (id) => {
        deleteVideo("course/" + id)
    }

    const handleVideoUpload = (e) => {
        e.preventDefault()
        const video = e.target[0].files[0]
        console.log(e.target[0].files[0])
        if (video) {
            const formData = new FormData()
            formData.append("file", video)
            addVideo(formData, {
                onSuccess: (data) => {
                    console.log(data)
                },
            })
        }
        setOpenInputsBox(false)
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
                    {data?.data?.data?.title}
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
            <div className="w-2/3 h-full relative">
                <table className="w-[672px] mx-auto relative rounded-[30px] overflow-hidden">
                    <thead className="text-white text-4xl leading-[92px] inknut-antiqua-regular mb-2.5 ">
                        <tr>
                            <td className="pl-8">Video</td>
                            <td className=""></td>
                        </tr>
                    </thead>
                    <tbody className=" bg-secondary w-full h-[417px]">
                        {data?.data?.data?.attachements?.map((video) => (
                            <tr className="h-[89px] border-b-4  border-b-primary text-2xl font-semibold inter leading-6 p-2">
                                <td className="rounded-tl-[30px] pl-4 text-ellipsis overflow-hidden">
                                    {video.file_name}
                                </td>
                                <td className="">4$</td>
                                <td className="rounded-tr-[30px]">
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
                                </td>
                            </tr>
                        ))}
                        <tr></tr>
                    </tbody>
                </table>
                {/* add button */}
                <button
                    onClick={(e) => setOpenInputsBox(true)}
                    className=" rounded-[30px] text-2xl font-semibold inter leading-6 p-3 text-black bg-primary transition hover:scale-110 hover:shadow-xl focus:outline-none absolute bottom-11b right-6b bottom-40 right-36 w-fit h-fit flex items-center gap-2 "
                >
                    <p>Add more</p>
                    <p className="size-7 rounded-full border-[3px] border-black">
                        +
                    </p>
                </button>
            </div>
            {openInputsBox && (
                <InputsBox
                    buttonName={"Add"}
                    onSubmit={(e) => handleVideoUpload(e)}
                    setOpenInputsBox={setOpenInputsBox}
                    inputs={inputs}
                />
            )}
        </div>
    )
}

export default page
