import Image from "next/image"
import send from "/public/send-2.svg"

const JobCard = ({ logo, title, text, setOpenInputsBox }) => {
    return (
        <div className="bg-[#FAE4E2] w-full flex items-center justify-between gap-8 rounded-[30px] px-6 py-4">
            <div className="flex flex-col items-center justify-center">
                <Image
                    src={logo}
                    alt="logo"
                    width={40}
                    height={40}
                    className=""
                />
                <p className="inter font-semibold text-center leading-6 whitespace-nowrap">
                    {title}
                </p>
            </div>
            <p className="text-center font-semibold leading-6">{text}</p>
            <button
                onClick={() => setOpenInputsBox(true)}
                className="inline-block transition hover:scale-110 focus:outline-none"
            >
                <Image
                    src={send.src}
                    alt="send-logo"
                    width={44}
                    height={44}
                    className=""
                />
            </button>
        </div>
    )
}

export default JobCard
