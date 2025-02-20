import React, { useState } from "react"
import InputsBox from "./InputsBox"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import SliderCard from "./SliderCard"
import Cookies from "js-cookie"
import {
    useDeleteData,
    useGetData,
    usePostData,
    useUpdateData,
} from "../utils/useQueries"
import { chunkArrayIntoThrees } from "../utils/functions"

const inputs = [
    { type: "text", name: "Title" },
    { type: "text", name: "Description" },
    // { type: "text", name: "Company Id" },
    { type: "text", name: "Subscription Id" },
]
const editInputs = [
    { type: "text", name: "Title" },
    { type: "text", name: "Description" },
]

const CompanyJobs = () => {
    const [openInputsBox, setOpenInputsBox] = useState(false)
    const [openEditBox, setOpenEditBox] = useState(false)

    const [jobId, setJobId] = useState(1)
    const { mutate: addJob } = usePostData("/job", {
        Authorization: `Bearer ${Cookies.get("access")}`,
    })
    const { mutate: updateJob } = useUpdateData("/job/" + jobId, {
        Authorization: `Bearer ${Cookies.get("access")}`,
    })

    const { data } = useGetData("/company/" + Cookies.get("id") + "/showjobs")

    const { mutate: deleteJob } = useDeleteData({
        Authorization: `Bearer ${Cookies.get("access")}`,
    })

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
    const handleEdit = (e) => {
        e.preventDefault()
        const data = {
            title: e.target[0].value,
            description: e.target[1].value,
        }
        updateJob(data)
        setOpenEditBox(false)
    }
    var settings = {
        dots: true,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    console.log(chunkArrayIntoThrees(data?.data?.data ?? []))
    return (
        <div className="max-w-[calc(75%-36px)] w-full relative">
            <div className="flex justify-between items-center px-16 my-4">
                <h2 className="text-4xl  inknut-antiqua-regular text-white">
                    Jobs
                </h2>
                <button
                    onClick={() => setOpenInputsBox(true)}
                    className="inline-block rounded bg-secondary px-8 py-2 h-fit  text-3xl font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none rounded-tr-full rounded-bl-full"
                >
                    Add
                </button>
            </div>
            <div className=" w-full h-[calc(100vh-260px)]">
                <Slider {...settings}>
                    {chunkArrayIntoThrees(data?.data?.data ?? []).map(
                        (three, index) => (
                            <div key={index} className="">
                                {three.map((item) => (
                                    <div key={item.id}>
                                        <SliderCard
                                            title={item.title}
                                            text={
                                                <p className="max-w-[75%] text-[22px] leading-6 font-semibold inter text-center">
                                                    {item.description}
                                                </p>
                                            }
                                            onDelete={() =>
                                                handleDelete(item.id)
                                            }
                                            onEdit={() => {
                                                setOpenEditBox(true)
                                                setJobId(item.id)
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </Slider>
            </div>
            {openInputsBox && (
                <InputsBox
                    buttonName={"Add"}
                    onSubmit={(e) => onSubmit(e)}
                    setOpenInputsBox={setOpenInputsBox}
                    inputs={inputs}
                />
            )}
            {openEditBox && (
                <InputsBox
                    buttonName={"Edit"}
                    onSubmit={(e) => handleEdit(e)}
                    setOpenInputsBox={setOpenEditBox}
                    inputs={editInputs}
                />
            )}
        </div>
    )
}

export default CompanyJobs
