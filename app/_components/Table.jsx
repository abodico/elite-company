import React from "react"

const Table = ({ columns = [], rows = [] }) => {
    return (
        <table className=" w-full text-center">
            <thead className="bg-primary py-8 border-b-secondary text-white border-b-[10px] sticky top-0 text-2xl font-semibold">
                <tr className="py-3">
                    {columns.map((column, index) => (
                        <th
                            key={column}
                            className="px-6 py-3 border-r border-r-secondary max-w-[140px]"
                        >
                            {column}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white  text-sm ">
                {rows.map((row, index) => (
                    <tr key={index}>
                        {Object.values(row).map((value, index) => (
                            <td key={value + `${index}`} className="px-6 py-4 ">
                                {value}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
