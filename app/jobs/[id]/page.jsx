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

const inputs = [
    { type: "text", name: "Title" },
    { type: "text", name: "Description" },
    { type: "text", name: "Subscription Id" },
]

const page = ({ params }) => {
    const unwrappedParams = React.use(params)
    const [openInputsBox, setOpenInputsBox] = useState(false)
    const [deletedVideo, setDeletedVideo] = useState(0)
    const { id } = unwrappedParams
    const { data } = useGetData("/company/" + id + "/showjobs")
    const { mutate: deleteJob } = useDeleteData({
        Authorization: `Bearer ${Cookies.get("access")}`,
    })
    const { mutate: addJob } = usePostData("/job", {
        Authorization: `Bearer ${Cookies.get("access")}`,
    })

    const router = useRouter()
    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            title: e.target[0].value,
            description: e.target[1].value,
            company_id: Cookies.get("id"),
            subscription_id: e.target[2].value,
        }

        addJob(data)
        setOpenInputsBox(false)
    }
    const handleDelete = (id) => {
        deleteJob("/job/" + id)
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
                    {data?.data?.data["company name"]}
                </h2>
                <h3 className="text-3xl inknut-antiqua-regular text-primary text-center leading-[82px]">
                    Company
                </h3>
                <div className="size-[300px] bg-white rounded-[30px] mx-auto mt-24 flex justify-center items-center">
                    <Image
                        src={data?.data?.data?.logo[0]?.file_path ?? logo.src}
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
                        {data?.data?.data?.jobs?.map((job) => (
                            <li
                                key={job.id}
                                className="border-b-4 border-b-primary text-2xl font-semibold inter leading-6 p-2 flex justify-between items-center"
                            >
                                <p className="">{job.title}</p>
                                <button
                                    onClick={() => handleDelete(job.id)}
                                    className="inline-block transition hover:scale-110 focus:outline-none"
                                >
                                    <RiDeleteBin6Line className="size-8 rounded-full " />
                                </button>
                            </li>
                        ))}
                        <button
                            onClick={() => setOpenInputsBox(true)}
                            className=" rounded-[30px] text-2xl font-semibold inter leading-6 p-3 text-black bg-primary transition hover:scale-110 hover:shadow-xl focus:outline-none absolute bottom-11 right-6 w-fit h-fit flex items-center gap-2 "
                        >
                            <p>Add more</p>
                            <p className="size-7 rounded-full border-[3px] border-black">
                                +
                            </p>
                        </button>
                    </ul>
                </div>
            </div>
            {openInputsBox && (
                <InputsBox
                    buttonName={"Add"}
                    onSubmit={(e) => onSubmit(e)}
                    setOpenInputsBox={setOpenInputsBox}
                    inputs={inputs}
                />
            )}
        </div>
    )
}

export default page
