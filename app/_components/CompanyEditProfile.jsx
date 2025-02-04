import Image from "next/image"
import logo from "/public/loginUser.svg"
import edit from "/public/edit-1.svg"

const CompanyEditProfile = () => {
    return (
        <div className="dashboard bg-secondary px-8 rounded-tl-3xl w-full relative">
            <h2 className="text-4xl leading-[92px] text-left inknut-antiqua-regular text-primary px-16 my-8">
                Company
            </h2>

            <ul className="font-semibold inter gap-14 flex flex-col">
                <li className="flex items-center gap-10">
                    <p className="text-3xl text-primary">Logo</p>
                    <Image
                        src={logo.src}
                        alt="logo"
                        width={120}
                        height={80}
                        className=""
                    />
                    <Image
                        src={edit.src}
                        alt="edit"
                        width={30}
                        height={30}
                        className=""
                    />
                </li>
                <li className="flex items-center gap-10">
                    <p className="text-3xl text-primary">Name</p>
                    <p className="text-xl">Advanced skills</p>
                    <Image
                        src={edit.src}
                        alt="edit"
                        width={30}
                        height={30}
                        className=""
                    />
                </li>
                <li className="flex items-center gap-10">
                    <p className="text-3xl text-primary">Address</p>
                    <p className="text-xl">
                        Knowledge Street, New Business District
                    </p>
                    <Image
                        src={edit.src}
                        alt="edit"
                        width={30}
                        height={30}
                        className=""
                    />
                </li>
                <li className="flex items-center gap-10">
                    <p className="text-3xl text-primary">Email</p>
                    <p className="text-xl underline">
                        <a href="mailto:contact@advancedskillsacademy.com">
                            contact@advancedskillsacademy.com
                        </a>
                    </p>
                    <Image
                        src={edit.src}
                        alt="edit"
                        width={30}
                        height={30}
                        className=""
                    />
                </li>
            </ul>
        </div>
    )
}

export default CompanyEditProfile
