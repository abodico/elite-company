import Image from "next/image"
import check from "/public/check-circle.svg"
import coin from "/public/coin.svg"

const CourseCard = ({
    logo,
    title,
    info,
    price,
    setOpenInputsBox,
    taken = false,
}) => {
    return (
        <div className="flex items-center gap-5 w-full">
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
                {info}
                <p className="inter font-semibold text-center leading-6 ">
                    ${price}
                </p>
            </div>
            {!taken ? (
                <button
                    onClick={() => setOpenInputsBox(false)}
                    className="inline-block transition hover:scale-110 focus:outline-none"
                >
                    <Image
                        src={coin.src}
                        alt="coin-logo"
                        width={38}
                        height={38}
                        className=""
                    />
                </button>
            ) : (
                <Image
                    src={check.src}
                    alt="check-logo"
                    width={38}
                    height={38}
                    className=""
                />
            )}
        </div>
    )
}

export default CourseCard
