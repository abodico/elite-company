"use client"
import { useState } from "react"
import Sidebar from "./Sidebar"
import calendarCheck from "/public/calendar-check.svg"
import home from "/public/home-2.svg"
import Image from "next/image"
import AdminDashboard from "./AdminDashboard"
import AdminSubscription from "./AdminSubscription"

const tabss = {
    Company: {
        title: "Company",
        icon: (
            <Image
                src={home.src}
                alt="home"
                width={24}
                height={24}
                className="size-6 "
            />
        ),
        dashboard: <AdminDashboard />,
    },
    Subscription: {
        title: "Subscription",
        icon: (
            <Image
                src={calendarCheck.src}
                alt="calendar-check"
                width={24}
                height={24}
                className="size-6 "
            />
        ),
        dashboard: <AdminSubscription />,
    },
}
const Admin = () => {
    const [currentTab, setCurrentTab] = useState(Object.values(tabss)[0])
    return (
        <div className="h-[calc(100vh-93px)] w-full flex gap-9">
            <Sidebar
                tabs={tabss}
                setCurrentTab={setCurrentTab}
                currentTab={currentTab}
            />
            {currentTab.dashboard}
        </div>
    )
}

export default Admin
