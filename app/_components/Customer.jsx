"use client"
import React, { useEffect, useState } from "react"
import JobCard from "./JobCard"
import CourseCard from "./CourseCard"
import logo from "/public/coin.svg"
import { usePostData } from "../utils/useQueries"
import { useInfiniteQuery } from "@tanstack/react-query"
import axiosClient from "../utils/axiosClient"
import Cookies from "js-cookie"
import InputsBox from "./InputsBox"

const inputs = [{ type: "file", name: "CV" }]
// const inputs = [{ type: "file", name: "CV" }]

const Customer = () => {
    const [activeTab, setActiveTab] = useState("Jobs")
    const [jobs, setJobs] = useState([])
    const [courses, setCourses] = useState([])
    const [OpenInputsBox, setOpenInputsBox] = useState(false)

    const { data, fetchNextPage, status, fetchStatus } = useInfiniteQuery({
        queryKey: ["jobs"],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await axiosClient.get(`/job?page=${pageParam}`)
            return response.data
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.data.current_page < lastPage.data.last_page) {
                return lastPage.data.current_page + 1
            }
            return undefined
        },
    })
    const {
        data: coursesData,
        status: coursesStatus,
        fetchStatus: coursesFetchStatus,
    } = useInfiniteQuery({
        queryKey: ["courses"],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await axiosClient.get(`/course?page=${pageParam}`)
            return response.data
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.data.current_page < lastPage.data.last_page) {
                return lastPage.data.current_page + 1
            }
            return undefined
        },
    })
    const { mutate: applyJob } = usePostData(
        "/customer/" + Cookies.get("id") + "/applyjob",
        {
            Authorization: `Bearer ${Cookies.get("access")}`,
        }
    )

    useEffect(() => {
        setJobs(
            ...(data?.pages?.map((page) =>
                page?.data?.data?.map((job) => ({
                    id: job.id,
                    title: job.title,
                    description: job.description,
                }))
            ) ?? [])
        )
    }, [status, fetchStatus])
    useEffect(() => {
        setCourses(
            ...(coursesData?.pages?.map((page) =>
                page?.data?.data?.map((job) => ({
                    id: job.id,
                    title: job.title,
                    subtitles: job.subtitles,
                    price: job.price,
                }))
            ) ?? [])
        )
    }, [coursesStatus, coursesFetchStatus])

    const onSubmit = (e) => {
        e.preventDefault()

        const file = e.target[0].files[0]
        if (file && file.type === "application/pdf") {
            const formData = new FormData()
            formData.append("file", file)
            applyJob(formData)
        } else {
            alert("Please select a valid PDF file.")
        }
        setOpenInputsBox(false)
    }

    return (
        <div className="dashboard flex items-center justify-center w-full relative">
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
                        {courses?.map((course) => (
                            <React.Fragment key={course.id}>
                                <CourseCard
                                    logo={logo.src}
                                    title={course.title}
                                    info={course.subtitles}
                                    price={course.price}
                                    id={course.id}
                                    taken={false}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                ) : (
                    <div className="h-[419px] overflow-auto w-full bg-transparent px-20 pt-11 flex flex-col gap-8 ">
                        {jobs?.map((job) => (
                            <React.Fragment key={job.id}>
                                <JobCard
                                    logo={logo.src}
                                    title={jobs.title}
                                    text={job.description}
                                    setOpenInputsBox={setOpenInputsBox}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
            {OpenInputsBox && (
                <InputsBox
                    title={"Apply Job"}
                    buttonName={"Send"}
                    inputs={inputs}
                    onSubmit={onSubmit}
                    setOpenInputsBox={setOpenInputsBox}
                />
            )}
        </div>
    )
}

export default Customer
