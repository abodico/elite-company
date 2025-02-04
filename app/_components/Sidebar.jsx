"use client"
import React from "react"

const Sidebar = ({ tabs, setCurrentTab, currentTab }) => {
    return (
        <div className="h-full w-1/4 min-w-[25%] bg-secondary rounded-tr-[20px]">
            <p className="text-2xl p-8 font-bold">Dashboard</p>
            <hr className="bg-white" />
            <ul className="pt-8 flex flex-col justify-center items-center">
                {Object.values(tabs).map((tab) => (
                    <li
                        key={tab.title}
                        className={`flex gap-4 font-medium items-center w-fit px-4 py-2 cursor-pointer ${
                            currentTab.title === tab.title &&
                            "border-b-primary border-b-2 "
                        }`}
                        onClick={() => setCurrentTab(tab)}
                    >
                        {tab.icon}
                        <span className="block text-xl">{tab.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
