import React ,{ useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const storeUser = (data:any) => {
    localStorage.setItem(
        'user', 
        JSON.stringify({
            username: data.user.username,
            admin: data.user.admin,
            jwt: data.jwt,
        })
    )
}

export const userData = () => {
    const stringfiedUser = localStorage.getItem('user') || ""
    if (stringfiedUser) {
        return JSON.parse(stringfiedUser)
    }
    return false
}