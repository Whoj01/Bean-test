import { Method } from "axios";
import useSWR, { SWRConfiguration } from "swr";
import {api} from './axios'

const defaultOptions: SWRConfiguration = {
  revalidateOnFocus: false,
}

export function useFetch<Data = unknown, Error = unknown> (url: string, method: Method = 'get', body: any, swrOptions = defaultOptions) {
  const data = useSWR<Data, Error>(url, 
    async (url: string) => {
      const response = await api.request({
        url,
        method,
        data: body
      }
      )

      return response.data
    },
    swrOptions
  ) 

  return data
}