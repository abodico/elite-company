"use client"
import { useRouter } from "next/navigation"
import undo from "/public/undo-circle.svg"
import video from "/public/video.png"
import VideoCard from "../../_components/VideoCard"
import Image from "next/image"
const page = () => {
    const router = useRouter()

    return (
        <div className=" dashboard h-[calc(100vh-93px)] w-full flex flex-col justify-start items-center relative">
            {/* overlay */}
            <div className="absolute w-[337px] h-[92px] top-0 left-0 -translate-y-[93px] bg-primary "></div>
            <button
                className="transition hover:scale-110 -translate-y-[93px] absolute top-2 left-2 "
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
            <h2 className="text-[40px] inknut-antiqua-bold text-white text-center leading-[82px]">
                Advanced skills
            </h2>
            <div className="flex flex-col gap-4 max-h-[calc(100vh-175px)] overflow-auto">
                <VideoCard
                    img={video.src}
                    title={"Project Management Essentials"}
                    description={
                        "Learn the principles of project management including planning, organizing and implementing in a professional manner"
                    }
                />
                <VideoCard
                    img={video.src}
                    title={"Project Management Essentials"}
                    description={
                        "Learn the principles of project management including planning, organizing and implementing in a professional manner"
                    }
                />
                <VideoCard
                    img={video.src}
                    title={"Project Management Essentials"}
                    description={
                        "Learn the principles of project management including planning, organizing and implementing in a professional manner"
                    }
                />
                <VideoCard
                    img={video.src}
                    title={"Project Management Essentials"}
                    description={
                        "Learn the principles of project management including planning, organizing and implementing in a professional manner"
                    }
                />
                <VideoCard
                    img={video.src}
                    title={"Project Management Essentials"}
                    description={
                        "Learn the principles of project management including planning, organizing and implementing in a professional manner"
                    }
                />
            </div>
        </div>
    )
}

export default page
