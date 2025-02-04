"use client"
import Table from "./Table"
import InputsBox from "./InputsBox"
import { useState } from "react"

const columns = ["Name", "Type", "Begins", "Ends", "Amount"]

const inputs = [
    { type: "text", name: "Name" },
    { type: "select", name: "Type", options: ["Monthly", "Yearly"] },
    { type: "text", name: "Begins" },
]

const AdminDashboard = () => {
    const [OpenInputsBox, setOpenInputsBox] = useState(false)
    const handleAdd = () => {
        console.log("add new company")
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log("submitted")
        setOpenInputsBox(false)
    }

    return (
        <div
            className="dashboard bg-secondary px-8 rounded-tl-3xl w-full relative"
            // onClick={() => setOpenInputsBox(false)}
        >
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
                    rows={[
                        {
                            hek: "value",
                            hek2: "value",
                            hek3: "value",
                            hek4: "value",
                            hek5: "value",
                        },
                        {
                            hek: "value",
                            hek2: "value",
                            hek3: "value",
                            hek4: "value",
                            hek5: "value",
                        },
                        {
                            hek: "value",
                            hek2: "value",
                            hek3: "value",
                            hek4: "value",
                            hek5: "value",
                        },
                    ]}
                    columns={columns}
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
