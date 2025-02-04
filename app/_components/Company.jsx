import React, { useState } from "react"
import edit from "/public/edit-4.svg"
import list from "/public/list-center.svg"
import jobs from "/public/suitcase.svg"
import Customer from "/public/users-more.svg"
import Sidebar from "../_components/Sidebar"
import Image from "next/image"
import CompanyCustomer from "./CompanyCustomer"
import CompanyEditProfile from "./CompanyEditProfile"
import CompanyJobs from "./CompanyJobs"
import CompanyCourses from "./CompanyCourses"

const tabss = {
    Jobs: {
        title: "Jobs",
        icon: (
            <Image
                src={jobs.src}
                alt="home"
                width={24}
                height={24}
                className="size-6 "
            />
        ),
        dashboard: <CompanyJobs />,
    },
    Courses: {
        title: "Courses",
        icon: (
            <Image
                src={list.src}
                alt="courses-icon"
                width={24}
                height={24}
                className="size-6 "
            />
        ),
        dashboard: <CompanyCourses />,
    },
    "Edit Profile": {
        title: "Edit Profile",
        icon: (
            <Image
                src={edit.src}
                alt="edit-icon"
                width={24}
                height={24}
                className="size-6 "
            />
        ),
        dashboard: <CompanyEditProfile />,
    },
    Customer: {
        title: "Customer",
        icon: (
            <Image
                src={Customer.src}
                alt="customer-icon"
                width={24}
                height={24}
                className="size-6 "
            />
        ),
        dashboard: <CompanyCustomer />,
    },
}

const Company = () => {
    const [currentTab, setCurrentTab] = useState(Object.values(tabss)[0])

    return (
        <div className="w-full h-[calc(100vh-93px)] flex gap-9">
            <Sidebar
                tabs={tabss}
                setCurrentTab={setCurrentTab}
                currentTab={currentTab}
            />
            {currentTab.dashboard}
        </div>
    )
}

export default Company
