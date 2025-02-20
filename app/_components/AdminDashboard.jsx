"use client"
import Table from "./Table"
import InputsBox from "./InputsBox"
import { useCallback, useEffect, useRef, useState } from "react"
import { usePaginatedData, usePostData } from "../utils/useQueries"
import { useInfiniteQuery } from "@tanstack/react-query"
import axiosClient from "../utils/axiosClient"
import Cookies from "js-cookie"
import logo from "/public/loginUser.svg"
import Image from "next/image"
import { formatDate } from "../utils/functions"

const columns = ["Logo", "Name", "Address", "Email", "Generated Date"]

const inputs = [
    { type: "text", name: "Name" },
    { type: "email", name: "Email" },
]

const AdminDashboard = () => {
    const [OpenInputsBox, setOpenInputsBox] = useState(false)
    const [rows, setRows] = useState([])

    const { mutate: addCompany } = usePostData("/user", {
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
        queryKey: ["companies"],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await axiosClient.get(`/company?page=${pageParam}`)
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
                page?.data?.data.map((company, index) =>
                    index !== 0
                        ? {
                              logo: (
                                  <Image
                                      src={
                                          company?.attachements?.file_path ??
                                          logo.src
                                      }
                                      alt="logo"
                                      width={50}
                                      height={50}
                                      className="mx-auto"
                                  />
                              ),
                              name: company.name,
                              address: company.address ?? "",
                              email: company.email,
                              generatedDate: formatDate(company.created_at),
                          }
                        : {}
                )
            ) ?? [])
        )
    }, [status, fetchStatus])

    const onSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: e.target[0].value,
            email: e.target[1].value,
            password: "Adminnn@12345678",
            password_confirmation: "Adminnn@12345678",
        }
        addCompany(
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
                    rows={rows ?? []}
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
