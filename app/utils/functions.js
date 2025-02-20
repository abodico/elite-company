export const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date)
}

export const chunkArrayIntoThrees = (arr) => {
    const result = []
    for (let i = 0; i < arr?.length; i += 3) {
        result.push(arr.slice(i, i + 3))
    }
    return result
}
