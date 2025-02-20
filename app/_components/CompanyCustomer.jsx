"use client"
import { useEffect, useState } from "react"
import Table from "./Table"
import { useInfiniteQuery } from "@tanstack/react-query"
import axiosClient from "../utils/axiosClient"
import Image from "next/image"
import logo from "/public/loginUser.svg"
import InputsBox from "./InputsBox"
import { usePostData } from "../utils/useQueries"
import Cookies from "js-cookie"

const columns = ["Photo", "Name", "Address", "Email", "Education Level"]

const inputs = [
    { type: "text", name: "Name" },
    { type: "email", name: "Email" },
    { type: "text", name: "Address" },
    { type: "text", name: "Education" },
]

const CompanyCustomer = () => {
    const [OpenInputsBox, setOpenInputsBox] = useState(false)

    const [rows, setRows] = useState([])

    const { mutate: addCustomer } = usePostData("/customer", {
        Authorization: `Bearer ${Cookies.get("access")}`,
    })

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        fetchStatus,
        isFetching,
    } = useInfiniteQuery({
        queryKey: ["customers"],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await axiosClient.get(
                `/customer?page=${pageParam}`
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

    // formatting table rows
    useEffect(() => {
        setRows(
            ...(data?.pages?.map((page) =>
                page?.data?.data.map((customer, index) =>
                    index !== 0
                        ? {
                              logo: (
                                  <Image
                                      src={
                                          customer?.attachements?.file_path ??
                                          logo.src
                                      }
                                      alt="logo"
                                      width={50}
                                      height={50}
                                      className="mx-auto"
                                  />
                              ),
                              name: customer.name,
                              address: customer.address ?? "",
                              email: customer.email,
                              education_level: customer.education,
                          }
                        : {}
                )
            ) ?? [])
        )
    }, [status, fetchStatus])

    // onAddCustomer
    const onSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: e.target[0].value,
            email: e.target[1].value,
            address: e.target[2].value,
            education: e.target[3].value,
        }
        addCustomer(data)
        setOpenInputsBox(false)
    }

    return (
        <div className="dashboard bg-secondary px-8 rounded-tl-3xl w-full relative">
            <div className="flex justify-between items-center px-16 my-8">
                <h2 className="text-4xl leading-[92px] inknut-antiqua-regular text-primary">
                    Company
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
                    isFetchingNextPage={isFetchingNextPage}
                    hasNextPage={hasNextPage}
                    isFetching={isFetching}
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

export default CompanyCustomer
