"use client"

import { useUtilContext } from "@/hooks"
import { useState } from "react"
import { showToast } from "@/helper"
import api from "@/service"

const PasswordComponent = (props: any) => {
    return (
        <div className="w-[80%] flex flex-col sm:flex-row sm:justify-between justify-start sm:items-center">
            <p>{props.title}</p>
            <input
                className="bg-[black] text-[white] border rounded-md"
                type="password"
                value={props.value}
                onChange={props.onChange}
            />
        </div>)
}

const Modal = () => {
    const { setIsModal, isModal } = useUtilContext()
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const handleNewPassword = async () => {
        if (newPassword != confirmPassword) {
            showToast("warning", "New password and Confirm password is not same.")
            return
        }

        try {
            const isCurrentPasswordCorrect: any = await api.post("/setpassword",
                {
                    currentPassword: currentPassword,
                    newPassword: newPassword
                }
            )
            if (isCurrentPasswordCorrect.data == true)
                showToast("success", "Success new Password")
            else showToast("warning", "CurrentPassword is not correct!")
        } catch (err) {
            showToast("warning", "Network Error")
        }



    }

    return (
        <div className="w-[100%] pt-20 pl-2 pr-2 pb-10 flex flex-col items-center gap-5">
            <PasswordComponent
                title="Current Password"
                value={currentPassword}
                onChange={(e: any) => setCurrentPassword(String(e.target.value))}
            />
            <PasswordComponent
                title="New Password"
                value={newPassword}
                onChange={(e: any) => setNewPassword(String(e.target.value))}
            />
            <PasswordComponent
                title="Confirm Password"
                value={confirmPassword}
                onChange={(e: any) => setConfirmPassword(String(e.target.value))}
            />

            <div className="w-[80%] flex justify-between items-center mt-5 gap-5">
                <button
                    className="w-[150px] h-[40px] border rounded-md hover:bg-[#2b2b2b]"
                    onClick={() => handleNewPassword()}
                >
                    Confirm
                </button>
                <button
                    className="w-[150px] h-[40px] border rounded-md hover:bg-[#2b2b2b]"
                    onClick={() => setIsModal(!isModal)}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default Modal