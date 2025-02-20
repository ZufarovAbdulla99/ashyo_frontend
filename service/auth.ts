"use client"
import { instance } from "@/hooks/instance";
import { SignInType, SignUpType } from "@/types/AuthType";
import toast from "react-hot-toast";

export const auth = (status: "sign_in" | "sign_up", data: SignInType | SignUpType, setToken: (value: string | null) => void) => {

    if (status == "sign_in" && setToken) {
        return instance().post(`/auth/login`, data).then(res => {
            setToken(res?.data?.accessToken);
            // console.log(res);
            
            if (typeof window !== "undefined") {
                localStorage.setItem("userId", res.data.user.id);
            }
            toast.success(`Welcome ${res.data.user.fullname}` )
            return res
        }).catch(() => {
            toast.error("User not found!")
        })
    }
    else{
        return instance().post(`/auth/register`, data).then(res => {
            toast.success(`Welcome ${res.data.user.fullname}` )
            return res
        }).catch(() => {
            toast.error("Something is wrong!")
        })
    }
}