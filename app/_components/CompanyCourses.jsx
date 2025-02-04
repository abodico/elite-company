import React, { useState } from "react"
import InputsBox from "./InputsBox"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import SliderCard from "./SliderCard"

const inputs = [
    { type: "text", name: "Title" },
    { type: "text", name: "Subtitle" },
    { type: "text", name: "Videos" },
    { type: "number", name: "Price" },
]

const CompanyCourses = () => {
    const [openInputsBox, setOpenInputsBox] = useState(false)
    const onSubmit = (e) => {
        e.preventDefault()
        console.log("submitted")
        setOpenInputsBox(false)
    }
    var settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
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
            <div className="max-w-[calc(100%-353px)], w-full h-[calc(100vh-260px)]">
                <Slider {...settings}>
                    <div className="">
                        <SliderCard
                            text={
                                <ul className="max-w-[75%] text-[22px] leading-6 font-semibold inter text- p-2">
                                    <li>+Programming courses</li>
                                    <li>+design courses</li>
                                    <li>+project management courses</li>
                                </ul>
                            }
                            title={"Advanced skills"}
                        />
                        <SliderCard
                            text={
                                <ul className="max-w-[75%] text-[22px] leading-6 font-semibold inter text- p-2">
                                    <li>+Programming courses</li>
                                    <li>+design courses</li>
                                    <li>+project management courses</li>
                                </ul>
                            }
                            title={"Advanced skills"}
                        />
                        <SliderCard
                            text={
                                <ul className="max-w-[75%] text-[22px] leading-6 font-semibold inter text- p-2">
                                    <li>+Programming courses</li>
                                    <li>+design courses</li>
                                    <li>+project management courses</li>
                                </ul>
                            }
                            title={"Advanced skills"}
                        />
                    </div>
                    <div className="">
                        <SliderCard
                            text={
                                <ul className="max-w-[75%] text-[22px] leading-6 font-semibold inter text- p-2">
                                    <li>+Programming courses</li>
                                    <li>+design courses</li>
                                    <li>+project management courses</li>
                                </ul>
                            }
                            title={"Advanced skills"}
                        />
                        <SliderCard
                            text={
                                <ul className="max-w-[75%] text-[22px] leading-6 font-semibold inter text- p-2">
                                    <li>+Programming courses</li>
                                    <li>+design courses</li>
                                    <li>+project management courses</li>
                                </ul>
                            }
                            title={"Advanced skills"}
                        />
                        <SliderCard
                            text={
                                <ul className="max-w-[75%] text-[22px] leading-6 font-semibold inter text- p-2">
                                    <li>+Programming courses</li>
                                    <li>+design courses</li>
                                    <li>+project management courses</li>
                                </ul>
                            }
                            title={"Advanced skills"}
                        />
                    </div>
                </Slider>
            </div>
            {openInputsBox && (
                <InputsBox
                    buttonName={"Add"}
                    onSubmit={(e) => handleSubmit(e)}
                    setOpenInputsBox={setOpenInputsBox}
                    inputs={inputs}
                />
            )}
        </div>
    )
}

export default CompanyCourses
