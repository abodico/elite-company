import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import axiosClient from "./axiosClient"

const getData = async (link, headers = {}) => {
    return await axiosClient(link, { headers: headers })
}

export const useGetData = (link, headers) => {
    const query = useQuery({
        queryFn: () => getData(link, headers),
        queryKey: ["data", link],
    })
    return query
}

const updateData = async (link, data, headers) => {
    await axiosClient.put(link, data, { headers: headers })
}

export const useUpdateData = (link, headers = {}) => {
    const mutation = useMutation({
        mutationFn: (data) => updateData(link, data, headers),
    })
    return mutation
}

const deleteData = (link, headers) => {
    axiosClient.delete(link, { headers: headers })
}

export const useDeleteData = (headers = {}) => {
    const mutation = useMutation({
        mutationFn: (link) => deleteData(link, headers),
    })
    return mutation
}

export const usePostData = (url, headers = {}, options = {}) => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await axiosClient.post(url, data, {
                headers: headers,
            })
            return response.data
        },
        ...options,
    })
}
// const postData = (link, data) => {
//     axiosClient.post(link, data)
// }

// export const usePostData = (link) => {
//     const mutation = useMutation({
//         mutationFn: (data) => postData(link, data),
//     })
//     return mutation
// }

export const usePaginatedData = (url) => {
    return useInfiniteQuery({
        queryKey: ["customers"],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await axiosClient.get(`${url}?page=${pageParam}`)
            return response.data
        },
        getNextPageParam: (lastPage) => {
            return lastPage.data.next_page_url
                ? lastPage.data.current_page + 1
                : undefined
        },
    })
}
