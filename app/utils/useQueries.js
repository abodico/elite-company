import { useMutation, useQuery } from "@tanstack/react-query"
import axiosClient from "./axiosClient"

const getData = async (link) => {
    return await axiosClient(link)
}

export const useGetData = (link, enabled = true) => {
    const query = useQuery({
        queryFn: () => getData(link),
        queryKey: ["data", link],
        enabled: enabled,
        refetchOnWindowFocus: false,
    })
    return query
}

const updateData = (link, data) => {
    axiosClient.put(link, data)
}

export const useUpdateData = (link) => {
    const mutation = useMutation({
        mutationFn: (data) => updateData(link, data),
    })
    return mutation
}

const deleteData = (link) => {
    axiosClient.delete(link)
}

export const useDeleteData = () => {
    const mutation = useMutation({
        mutationFn: (link) => deleteData(link),
    })
    return mutation
}
const postData = (link, data) => {
    axiosClient.post(link, data)
}

export const usePostData = (link) => {
    const mutation = useMutation({
        mutationFn: (data) => postData(link, data),
    })
    return mutation
}
