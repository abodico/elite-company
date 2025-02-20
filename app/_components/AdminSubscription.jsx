"use client"
import Table from "./Table"
import InputsBox from "./InputsBox"
import { useEffect, useState } from "react"
import { usePaginatedData, usePostData } from "../utils/useQueries"
import Cookies from "js-cookie"
import { useInfiniteQuery } from "@tanstack/react-query"
import axiosClient from "../utils/axiosClient"
import { formatDate } from "../utils/functions"

const columns = ["Name", "Type", "Begins", "Ends", "Amount"]

const inputs = [
    { type: "text", name: "Name" },
    { type: "select", name: "Type", options: ["Monthly", "Yearly"] },
    { type: "text", name: "Amount" },
    { type: "number", name: "Jobs Count" },
    { type: "number", name: "Courses Count" },
]

const AdminDashboard = () => {
    const [OpenInputsBox, setOpenInputsBox] = useState(false)
    const [rows, setRows] = useState([])

    const { mutate: addSubscription } = usePostData("/subscriptions", {
        Authorization: `Bearer ${Cookies.get("access")}`,
    })

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        fetchStatus,
    } = useInfiniteQuery({
        queryKey: ["subscriptions"],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await axiosClient.get(
                `/subscriptions?page=${pageParam}`
            )
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
    useEffect(() => {
        setRows(
            ...(data?.pages?.map((page) =>
                page?.data?.data.map((company) => ({
                    name: company.name,
                    type: company.type,
                    begins: formatDate(company.begins),
                    ends: formatDate(company.ends),
                    amount: company.price,
                }))
            ) ?? [])
        )
    }, [status, fetchStatus])

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(e)

        const date = new Date()
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")

        const nextYear = date.getFullYear() + 1
        const nextMonth = String(
            (date.getMonth() === 11 ? 0 : date.getMonth() + 1) + 1
        ).padStart(2, "0")

        const data = {
            name: e.target[0].value,
            type: e.target[1].value,
            begins: `${year}-${month}-${day}`,
            ends:
                e.target[1].value === "Yearly"
                    ? `${nextYear}-${month}-${day}`
                    : `${
                          nextMonth === "01" ? nextYear : year
                      }-${nextMonth}-${day}`,
            price: e.target[2].value,
            jobs_count: e.target[3].value,
            courses_count: e.target[4].value,
        }
        addSubscription(
            { ...data },
            {
                onSuccess: (data) => {
                    console.log(data)
                },
            }
        )
        setOpenInputsBox(false)
    }

    return (
        <div className="dashboard bg-secondary px-8 rounded-tl-3xl w-full relative">
            <div className="flex justify-between items-center px-16 my-8">
                <h2 className="text-4xl leading-[92px] inknut-antiqua-regular text-primary">
                    Subscription
                </h2>
                <button
                    onClick={() => setOpenInputsBox(true)}
                    className="inline-block rounded bg-primary px-8 py-2 h-fit  text-3xl font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none rounded-tr-full rounded-bl-full"
                >
                    Add
                </button>
            </div>
            <div className="rounded-[32px] max-h-[500px] overflow-auto">
                <Table
                    rows={rows}
                    columns={columns}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                />
            </div>
            {OpenInputsBox && (
                <InputsBox
                    title={"hello"}
                    buttonName={"Add"}
                    inputs={inputs}
                    onSubmit={onSubmit}
                    setOpenInputsBox={setOpenInputsBox}
                />
            )}
        </div>
    )
}

export default AdminDashboard
