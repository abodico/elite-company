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
import { RiDeleteBin6Line } from "react-icons/ri"

const inputs = [{ type: "file", name: "Videos" }]
const page = ({ params }) => {
    const unwrappedParams = React.use(params)
    const [openInputsBox, setOpenInputsBox] = useState(false)
    const [deletedVideo, setDeletedVideo] = useState(0)
    const { id } = unwrappedParams
    const { data } = useGetData("/course/" + id)
    const { mutate: deleteVideo } = usePostData(
        `/course/${data?.data?.data[0]?.company_id}/video/${deletedVideo}/remove`,
        {
            Authorization: `Bearer ${Cookies.get("access")}`,
        }
    )
    const { mutate: addVideo } = usePostData("/course/" + id + "/addvideo", {
        Authorization: `Bearer ${Cookies.get("access")}`,
    })

    const router = useRouter()
    const onDelete = (id) => {
        setDeletedVideo(id)
        deleteVideo({})
    }

    const handleVideoUpload = (e) => {
        e.preventDefault()
        const video = e.target[0].files[0]
        if (video) {
            const formData = new FormData()
            formData.append("file", video)
            addVideo(formData)
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
                    {data?.data?.data?.company_name}
                </h2>
                <h3 className="text-3xl inknut-antiqua-regular text-primary text-center leading-[82px]">
                    Company
                </h3>
                <div className="size-[300px] bg-white rounded-[30px] mx-auto mt-24 flex justify-center items-center">
                    <Image
                        src={data?.data?.data?.logo[0].file_path ?? logo.src}
                        alt="logo"
                        width={182}
                        height={141}
                        className=""
                    />
                </div>
            </div>
            <div className="w-2/3 h-full relative">
                <table className="table-fixed w-[672px] mx-auto relative rounded-[30px] overflow-hidden">
                    <thead className="text-white text-4xl leading-[92px] inknut-antiqua-regular mb-2.5 ">
                        <tr>
                            <td className="pl-8">Video</td>
                            <td className=""></td>
                        </tr>
                    </thead>
                    <tbody className=" bg-secondary h-[417px] flex flex-column w-[672px]">
                        {data?.data?.data?.[0]?.attachements?.map((video) => (
                            <tr
                                key={video.id}
                                className="h-[89px] w-full flex items-center justify-between border-b-4  border-b-primary text-2xl font-semibold inter leading-6 p-2"
                            >
                                <td className="rounded-tl-[30px] pl-4 text-ellipsis overflow-hidden">
                                    {video.file_name}
                                </td>
                                <td className="rounded-tr-[30px]">
                                    <button
                                        onClick={() => onDelete(video.id)}
                                        className="inline-block transition hover:scale-110 focus:outline-none"
                                    >
                                        <RiDeleteBin6Line className="size-8 rounded-full " />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* add button */}
                <button
                    onClick={(e) => setOpenInputsBox(true)}
                    className=" rounded-[30px] text-2xl font-semibold inter border border-secondary leading-6 p-3 text-black bg-primary transition hover:scale-110 hover:shadow-xl focus:outline-none absolute bottom-11b right-6b bottom-40 right-36 w-fit h-fit flex items-center gap-2 "
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
