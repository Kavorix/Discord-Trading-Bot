"use client"
import { RhUserType } from "@/types"
import { useEffect, useState } from "react"
import { useUtilContext } from "@/hooks"
interface RhType {
    accountNumber: number
}

const RhComponent = ({ accountNumber }: RhType) => {

    const className = "w-[100%] sm:w-[300px] h-[35px] text-[white] bg-transparent border border-[#88878d] rounded-md mt-1"
    const { rhuser, setRhUser } = useUtilContext()

    const [eachRhUser, setEachRhUser] = useState<RhUserType>(rhuser[accountNumber])

    useEffect(() => {
        let _newRhUser: any = []
        for (let i = 0; i < rhuser.length; i++) {
            if (i == accountNumber) {
                _newRhUser.push(eachRhUser)
            }
            else {
                _newRhUser.push(rhuser[i])
            }
        }
        setRhUser(_newRhUser)
    }, [eachRhUser])

    return (
        <div className="w-[1000px ]">
            <p className="text-[#88878d]">Account {accountNumber + 1}</p>
            <div className="w-[100%] rounded-md p-5  bg-[#2b2b2b]">
                <div className="flex flex-wrap gap-2 ">

                    <div className="mt-1 w-[100%] sm:w-[300px]">
                        <p className="text-[15px] text-[#88878d] text-[white]">
                            Username
                        </p>
                        <input
                            type="text"
                            className={className}
                            value={eachRhUser.username}
                            onChange={(e: any) => {
                                let _eachRhUser = {
                                    ...eachRhUser,
                                    username: e.target.value
                                }
                                setEachRhUser(_eachRhUser)
                            }}

                        />
                    </div>

                    <div className="mt-1 w-[100%] sm:w-[300px]">
                        <p className="text-[15px] text-[#88878d] text-[white]">
                            Password
                        </p>
                        <input
                            type="password"
                            className={className}
                            value={eachRhUser.password}
                            onChange={(e: any) => {
                                let _eachRhUser = {
                                    ...eachRhUser,
                                    password: e.target.value
                                }
                                setEachRhUser(_eachRhUser)
                            }}

                        />
                    </div>

                    <div className="mt-1 w-[100%] sm:w-[300px]">
                        <p className="text-[15px] text-[#88878d] text-[white]">
                            type
                        </p>
                        <input
                            type="text"
                            className={className}
                            value={eachRhUser.type}
                            onChange={(e: any) => {
                                let _eachRhUser = {
                                    ...eachRhUser,
                                    type: e.target.value
                                }
                                setEachRhUser(_eachRhUser)
                            }}

                        />
                    </div>

                    <div className="mt-1 w-[100%] sm:w-[300px]">
                        <p className="text-[15px] text-[#88878d] text-[white]">
                            totp_secret
                        </p>
                        <input
                            type="text"
                            className={className}
                            value={eachRhUser.totp_secret}
                            onChange={(e: any) => {
                                let _eachRhUser = {
                                    ...eachRhUser,
                                    totp_secret: e.target.value
                                }
                                setEachRhUser(_eachRhUser)
                            }}
                        />
                    </div>

                    <div className="mt-1 w-[100%] sm:w-[300px]">
                        <p className="text-[15px] text-[#88878d] text-[white]">
                            account_number
                        </p>
                        <input
                            type="text"
                            className={className}
                            value={eachRhUser.account_number}
                            onChange={(e: any) => {
                                let _eachRhUser = {
                                    ...eachRhUser,
                                    account_number: e.target.value
                                }
                                setEachRhUser(_eachRhUser)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const RHUserSetting = () => {
    return (
        <div className="w-[100%] h-[100%] flex flex-col items-center gap-10 p-5">
            <RhComponent accountNumber={0} />
            <RhComponent accountNumber={1} />
            <RhComponent accountNumber={2} />
            <RhComponent accountNumber={3} />
            <RhComponent accountNumber={4} />
            <RhComponent accountNumber={5} />
            <RhComponent accountNumber={6} />
        </div>
    )
}

export default RHUserSetting