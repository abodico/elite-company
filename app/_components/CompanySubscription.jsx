"use client"
import Table from "./Table"
import { useEffect, useState } from "react"
import { usePostData } from "../utils/useQueries"
import Cookies from "js-cookie"
import { useInfiniteQuery } from "@tanstack/react-query"
import axiosClient from "../utils/axiosClient"
import { formatDate } from "../utils/functions"

const columns = [
    "ID",
    "Name",
    "Type",
    "Jobs Count",
    "Courses Count",
    "Amount",
    "",
]

const CompanySubscription = () => {
    const [rows, setRows] = useState([])
    const [subscribeId, setSubscribeId] = useState(1)

    const { mutate: mutateSubscribe } = usePostData(
        "/companies/" + Cookies.get("id") + "/subscriptions/" + subscribeId,
        {
            Authorization: `Bearer ${Cookies.get("access")}`,
        }
    )

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        fetchStatus,
    } = useInfiniteQuery({
        queryKey: ["company-subscriptions"],
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
                    id: company.id,
                    name: company.name,
                    type: company.type,
                    jobs_count: company.jobs_count,
                    courses_count: company.courses_count,
                    amount: company.price,
                    button: (
                        <button
                            onClick={() => subscribe(company.id)}
                            className="inline-block rounded-full bg-primary px-3 py-2 h-fit  text-xl font-medium text-white transition scale-90 hover:scale-100 hover:shadow-xl focus:outline-none "
                        >
                            Subscripe
                        </button>
                    ),
                }))
            ) ?? [])
        )
    }, [status, fetchStatus])

    const subscribe = (id) => {
        setSubscribeId(id)
        mutateSubscribe()
    }

    return (
        <div className="dashboard bg-secondary px-8 rounded-tl-3xl w-full relative">
            <div className="flex justify-between items-center px-16 my-8">
                <h2 className="text-4xl leading-[92px] inknut-antiqua-regular text-primary">
                    Subscription
                </h2>
            </div>
            <div className="rounded-[32px] max-h-[500px] overflow-auto">
                <Table
                    rows={rows}
                    columns={columns}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                />
            </div>
        </div>
    )
}

export default CompanySubscription
