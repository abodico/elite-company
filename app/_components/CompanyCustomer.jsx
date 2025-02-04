import Table from "./Table"
const columns = ["Photo", "Name", "Address", "Email", "Education Level"]

const CompanyCustomer = () => {
    return (
        <div className="dashboard bg-secondary px-8 rounded-tl-3xl w-full relative">
            <h2 className="text-4xl leading-[92px] text-left inknut-antiqua-regular text-primary px-16 my-8">
                Company
            </h2>
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
        </div>
    )
}

export default CompanyCustomer
