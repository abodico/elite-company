"use  client"
import Image from "next/image"
import logo from "/public/loginUser.svg"
import InputsBox from "./InputsBox"
import Cookies from "js-cookie"
import { useGetData, usePostData, useUpdateData } from "../utils/useQueries"
import { useState } from "react"

const inputs = [
    { type: "file", accept: "image/png ", name: "Photo" },
    { type: "text", name: "Name" },
    { type: "text", name: "Address" },
    { type: "email", name: "Email" },
]

const CompanyEditProfile = () => {
    const [OpenInputsBox, setOpenInputsBox] = useState(false)

    const { mutate: updateData } = useUpdateData(
        `/company/${Cookies.get("id")}`,
        {
            Authorization: `Bearer ${Cookies.get("access")}`,
        }
    )
    const { mutate: addImage } = usePostData(
        "/company/" + Cookies.get("id") + "/addlogo",
        {
            Authorization: `Bearer ${Cookies.get("access")}`,
        }
    )
    const { data } = useGetData("/company/" + Cookies.get("id"))

    const onSubmit = (e) => {
        e.preventDefault()

        const handleImageUpload = (e) => {
            const image = e.target[0].files[0]
            console.log(e.target[0].files[0])
            if (image) {
                const formData = new FormData()
                formData.append("file", image)
                addImage(formData, {
                    onSuccess: (data) => {
                        console.log(data)
                    },
                })
            }
        }
        handleImageUpload(e)
        const data = {
            name: e.target[1].value,
            address: e.target[2].value,
            email: e.target[3].value,
        }
        updateData(data, {
            onSuccess: (data) => {
                console.log(data)
            },
        })
        setOpenInputsBox(false)
    }
    console.log(data?.data?.data)
    return (
        <div className="dashboard bg-secondary px-8 rounded-tl-3xl w-full relative">
            <div className="flex justify-between items-center px-16 my-8">
                <h2 className="text-4xl leading-[92px] inknut-antiqua-regular text-primary">
                    Company
                </h2>
                <button
                    onClick={() => setOpenInputsBox(true)}
                    className="inline-block rounded bg-primary px-8 py-2 h-fit  text-3xl font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none rounded-tr-full rounded-bl-full"
                >
                    Edit
                </button>
            </div>

            <ul className="font-semibold inter gap-14 flex flex-col">
                <li className="flex items-center gap-10">
                    <p className="text-3xl text-primary">Logo</p>
                    <Image
                        src={
                            data?.data?.data?.attachements?.file_path ??
                            logo.src
                        }
                        alt="logo"
                        width={120}
                        height={80}
                        className=""
                    />
                </li>
                <li className="flex items-center gap-10">
                    <p className="text-3xl text-primary">Name</p>
                    <p className="text-xl">{data?.data?.data?.name}</p>
                </li>
                <li className="flex items-center gap-10">
                    <p className="text-3xl text-primary">Address</p>
                    <p className="text-xl">{data?.data?.data?.address}</p>
                </li>
                <li className="flex items-center gap-10">
                    <p className="text-3xl text-primary">Email</p>
                    <p className="text-xl underline">
                        <a href={"mailto:" + data?.data?.data?.email}>
                            {data?.data?.data?.email}
                        </a>
                    </p>
                </li>
            </ul>
            {OpenInputsBox && (
                <InputsBox
                    title={"hello"}
                    buttonName={"Edit"}
                    inputs={inputs}
                    onSubmit={onSubmit}
                    setOpenInputsBox={setOpenInputsBox}
                />
            )}
        </div>
    )
}

export default CompanyEditProfile
