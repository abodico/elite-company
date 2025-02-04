"use client"
import React, { useState } from "react"
import JobCard from "./JobCard"
import CourseCard from "./CourseCard"
import logo from "/public/coin.svg"

const Customer = () => {
    const [activeTab, setActiveTab] = useState("Jobs")
    return (
        <div className="dashboard flex items-center justify-center w-full">
            <div className="bg-secondary w-[891px] h-[555px] rounded-t-[30px] px-6 py-5 overflow-hidden">
                <ul className="flex items-center justify-center gap-8 pt-4 bg-primary rounded-t-[30px] w-full ">
                    <li
                        onClick={() => setActiveTab("Jobs")}
                        className={`${
                            activeTab === "Jobs"
                                ? "text-primary bg-secondary rounded-t-[30px]"
                                : "text-secondary cursor-pointer"
                        } inter text-5xl leading-[58px] font-semibold px-16 pb-8`}
                    >
                        Jobs
                    </li>
                    <li
                        onClick={() => setActiveTab("Courses")}
                        className={`${
                            activeTab === "Courses"
                                ? "text-primary bg-secondary rounded-t-[30px]"
                                : "text-secondary cursor-pointer"
                        } inter text-5xl leading-[58px] font-semibold px-16 pb-8`}
                    >
                        Courses
                    </li>
                </ul>
                {activeTab === "Courses" ? (
                    <div className="h-[419px] overflow-auto w-full bg-transparent px-11 pt-11 flex flex-col gap-8 ">
                        <CourseCard
                            logo={logo.src}
                            title={"Advanced skills"}
                            info={
                                <ul className="font-semibold leading-6">
                                    <li>+Programming courses</li>
                                    <li>+design courses</li>
                                    <li>+project management courses</li>
                                </ul>
                            }
                            price={12.99}
                            taken={true}
                        />
                        <CourseCard
                            logo={logo.src}
                            title={"Advanced skills"}
                            info={
                                <ul className=" font-semibold leading-6">
                                    <li>+Programming courses</li>
                                    <li>+design courses</li>
                                    <li>+project management courses</li>
                                </ul>
                            }
                            price={12.99}
                            taken={false}
                        />
                        <CourseCard
                            logo={logo.src}
                            title={"Advanced skills"}
                            info={
                                <ul className="font-semibold leading-6">
                                    <li>+Programming courses</li>
                                    <li>+design courses</li>
                                    <li>+project management courses</li>
                                </ul>
                            }
                            price={12.99}
                            taken={false}
                        />
                        <CourseCard
                            logo={logo.src}
                            title={"Advanced skills"}
                            info={
                                <ul className="font-semibold leading-6">
                                    <li>+Programming courses</li>
                                    <li>+design courses</li>
                                    <li>+project management courses</li>
                                </ul>
                            }
                            price={12.99}
                            taken={false}
                        />
                    </div>
                ) : (
                    <div className="h-[419px] overflow-auto w-full bg-transparent px-20 pt-11 flex flex-col gap-8 ">
                        <JobCard
                            logo={logo.src}
                            title={"Advanced skills"}
                            text={
                                "Providing comprehensive and advanced training courses in programming, design"
                            }
                        />
                        <JobCard
                            logo={logo.src}
                            title={"Advanced skills"}
                            text={
                                "Providing comprehensive and advanced training courses in programming, design"
                            }
                        />
                        <JobCard
                            logo={logo.src}
                            title={"Advanced skills"}
                            text={
                                "Providing comprehensive and advanced training courses in programming, design"
                            }
                        />
                        <JobCard
                            logo={logo.src}
                            title={"Advanced skills"}
                            text={
                                "Providing comprehensive and advanced training courses in programming, design"
                            }
                        />
                        <JobCard
                            logo={logo.src}
                            title={"Advanced skills"}
                            text={
                                "Providing comprehensive and advanced training courses in programming, design"
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Customer
