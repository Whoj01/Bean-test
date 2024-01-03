import { api } from '@/lib/axios'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

export const useCookies = () => {
  const getCookie = (name: string) => {
    const cookie = parseCookies()[name]

    return cookie
  }

  const setCookieToName = (name: string, value: string) => {
    setCookie(null, name, value, {
      path: "/"
    })

    api.defaults.headers['Authorization'] = `Bearer ${value}`
  }

  const destroyCookieFromName = (name: string) => {
    destroyCookie(null, name)

    api.defaults.headers['Authorization'] = null
  }

  return {
    getCookie,
    setCookieToName,
    destroyCookieFromName
  }
}