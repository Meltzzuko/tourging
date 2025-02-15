import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import CryptoJS from 'crypto-js';
import { toast } from "react-toastify";

const secretKey = (import.meta.env.VITE_SECRET_KEY)

export const storeUser = async (data:any) => {
    const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify({
            id: data.user.id,
            username: data.user.username,
            avatar : data.user.avatar,
            jwt: data.jwt,
        }),
        secretKey
    ).toString();
    localStorage.setItem('user', encryptedData);
}

export const userData = () => {
    const encryptedData = localStorage.getItem('user');
    if (encryptedData) {
        try {
            CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
        } catch {
            toast.error("Something went wrong, please Sign in again",{
                hideProgressBar: true,
            });
            localStorage.removeItem('user');
            return
        }
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } else {
        return false;
    }
}

type Props = {
    children: JSX.Element
  }
  
export const ProtectRoute = ({children}: Props) => {
    const navigate = useNavigate()
    const data = userData()

    useEffect(() => {
        if (!data.jwt) {
            navigate('/login')
        }
    }, [])

    return children
}

export const ScrollToTop = () => {
    const {pathname} = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    
    return null
}