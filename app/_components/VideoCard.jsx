import Image from "next/image"

const VideoCard = ({ img, title, description }) => {
    return (
        <div className="bg-secondary rounded-[20px] w-[1048px] flex gap-6 h-36 px-6 py-4">
            <Image src={img} width={255} height={111} alt={title} />
            <div className="w-full max-w-[668px]">
                <p className="text-2xl font-semibold mb-4">{title}</p>
                <p className="text-xl">{description}</p>
            </div>
        </div>
    )
}

export default VideoCard
