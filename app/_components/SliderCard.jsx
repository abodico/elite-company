import React from "react"
import { RiDeleteBin6Line } from "react-icons/ri"

const SliderCard = ({ title, text, onDelete, onEdit }) => {
    return (
        <div className="flex items-center gap-3 w-full my-4">
            <div className="relative w-[732px]. w-full h-[150px] rounded-[30px] bg-secondary before:w-[600px] before:h-[500px] before:absolute before:inset-0 before:-left-[30%] before:-top-[310px] before:-translate-y-1/4 before:rounded-full overflow-hidden before:bg-primary before:opacity-20 flex justify-end items-center ">
                <p className="absolute inset-0 left-4 top-2 text-primary text-3xl font-semibold inter ">
                    {title}
                </p>
                {text}
            </div>
            <div className="flex flex-col items-center px-2 gap-3">
                <button
                    onClick={onEdit}
                    className="inline-block bg-secondary px-4 py-1 h-fit  text-xl text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none rounded-[30px]"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="inline-block transition hover:scale-110 hover:shadow-xl focus:outline-none"
                >
                    <RiDeleteBin6Line className="size-8 text-secondary " />
                </button>
            </div>
        </div>
    )
}

export default SliderCard
