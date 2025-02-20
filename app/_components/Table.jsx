import CircularProgress from "./CircularProgress"

const Table = ({
    columns = [],
    rows = [],
    isFetchingNextPage,
    hasNextPage,
    isFetching,
}) => {
    return (
        <table className="w-full text-center">
            <thead className="bg-primary py-8 border-b-secondary text-white border-b-[10px] sticky top-0 text-2xl font-semibold">
                <tr className="py-3">
                    {columns.map((column, index) => (
                        <th
                            key={column}
                            className="px-6 py-3 border-r border-r-secondary max-w-[140px] whitespace-break-spaces"
                        >
                            {column}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white text-sm">
                {rows.map((row, index) => (
                    <tr
                        className="font-semibold inter text-sm leading-6"
                        key={index}
                    >
                        {Object.values(row).map((value, ndx) => (
                            <td key={ndx}>
                                <p className="line-clamp-2 break-words ">
                                    {value}
                                </p>
                            </td>
                        ))}
                    </tr>
                ))}
                <tr className="w-full">
                    <td className="pt-4 left-1/2 -translate-x-1/2 absolute">
                        {isFetching && <CircularProgress />}
                        <button
                            className="inline-block bg-primary enabled:cursor-pointer disabled:bg-opacity-70 px-8 h-fit text-3xl text-white transition enabled:hover:scale-110 hover:shadow-xl focus:outline-none"
                            onClick={() => fetchNextPage()}
                            disabled={!hasNextPage || isFetchingNextPage}
                        >
                            {isFetchingNextPage
                                ? "Loading more..."
                                : hasNextPage
                                ? "Load More"
                                : "Nothing more to load"}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table
