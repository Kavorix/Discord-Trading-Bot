"use client"

import { useEffect, useState } from "react"
import { useUtilContext } from "@/hooks"

const DiscordSetting = () => {
    const { setdiscordAccount, discordAccount } = useUtilContext()

    return (
        <div className="w-[90%] md:w-[400px] xl:w-[500px] h-[400px] rounded-md flex flex-col gap-10 justify-center items-center bg-[#2b2b2b]">
            <div className="w-[90%] sm:w-[70%] h-[35px] flex justify-between gap-4 ">
                <p className="w-[50px] h-[100%] flex justify-center items-center text-[white]">ET</p>
                <input
                    className="w-full  text-[white] bg-transparent border rounded-md"
                    type="text"
                    value={discordAccount.et}
                    onChange={(e: any) => {
                        setdiscordAccount({
                            ...discordAccount,
                            et: e.target.value,
                        })
                    }}
                />
            </div>
            <div className="w-[90%] sm:w-[70%] h-[35px] flex justify-between gap-4 ">
                <p className="w-[50px] h-[100%] flex justify-center items-center text-[white]">DT</p>
                <input
                    className="w-full  text-[white] bg-transparent border rounded-md"
                    type="text"
                    value={discordAccount.dt}
                    onChange={(e: any) => setdiscordAccount({
                        ...discordAccount,
                        dt: e.target.value,
                    })
                    }
                />
            </div>
            <div className="w-[90%] sm:w-[70%] h-[35px] flex justify-between gap-4 ">
                <p className="w-[50px] h-[100%] flex justify-center items-center text-[white]">MM</p>
                <input
                    className="w-full  text-[white] bg-transparent border rounded-md"
                    type="text"
                    value={discordAccount.mm}
                    onChange={(e: any) => setdiscordAccount({
                        ...discordAccount,
                        mm: e.target.value,
                    })
                    }
                />
            </div>
            <div className="w-[90%] sm:w-[70%] h-[35px] flex justify-between gap-4 ">
                <p className="w-[50px] h-[100%] flex justify-center items-center text-[white]">SRE_QT</p>
                <input
                    className="w-full  text-[white] bg-transparent border rounded-md"
                    type="text"
                    value={discordAccount.sre_qt}
                    onChange={(e: any) => setdiscordAccount({
                        ...discordAccount,
                        sre_qt: e.target.value,
                    })
                    }
                />
            </div>

            <div className="w-[90%] sm:w-[70%] h-[35px] flex justify-between gap-4 ">
                <p className="w-[50px] h-[100%] flex justify-center items-center text-[white]">SRE_PA</p>
                <input
                    className="w-full  text-[white] bg-transparent border rounded-md"
                    type="text"
                    value={discordAccount.sre_pa}
                    onChange={(e: any) => setdiscordAccount({
                        ...discordAccount,
                        sre_pa: e.target.value,
                    })
                    }
                />
            </div>

        </div>
    )
}

export default DiscordSetting