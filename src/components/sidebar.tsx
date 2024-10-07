"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useUtilContext } from "@/hooks"
import api from "@/service"
import { showToast } from "@/helper";

const SideBar = (props: any) => {

    const {
        rhuser,
        discordAccount,
        discordChannelUse,
        discordChannelCap,
        tickerList,
        threshold,
        delay,
        telegramData,
        password,
        setPassword
    } = useUtilContext()

    const [isHidden, setIsHidden] = useState<boolean>(false)
    const buttonName = [
        "Discord",
        "RH User",
        "Telegram",
        "Account 1",
        "Account 2",
        "Account 3",
        "Account 4",
        "Account 5",
        "Account 6",
        "Account 7",
    ]

    const [isClicked, setIsClicked] = useState<boolean[]>([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ])


    const SaveData = async () => {
        try {

            if (password != process.env.NEXT_PUBLIC_PASSWORD) {
                showToast("error", "Password is not correct")
                console.log(process.env.NEXT_PUBLIC_PASSWORD)
                return
            }

            const token = process.env.NEXT_PUBLIC_DISCORDTOKEN
            const holidays = ["2024-01-01", "2024-01-15", "2024-02-19", "2024-03-29", "2024-05-27", "2024-06-19", "2024-07-04", "2024-09-02", "2024-11-28", "2024-12-25", "2025-01-01", "2025-01-20", "2025-02-17", "2025-04-18", "2025-05-26", "2025-06-19", "2025-07-04", "2025-09-01", "2025-11-27", "2025-12-25", "2026-01-01", "2026-01-19", "2026-02-16", "2026-04-03", "2026-05-25", "2026-06-19", "2026-07-03", "2026-09-07", "2026-11-26", "2026-12-25"]
            const discordData = [
                { channel: "et", channel_id: discordAccount.et, token: token },
                { channel: "dt", channel_id: discordAccount.dt, token: token },
                { channel: "mm", channel_id: discordAccount.mm, token: token },
                { channel: "sre_pa", channel_id: discordAccount.sre_pa, token: token },
                { channel: "sre_qt", channel_id: discordAccount.sre_qt, token: token },
            ]
            let newData = {
                accounts: rhuser,
                discords: discordData,
                discord_channel_use: discordChannelUse,
                cap_discord_channel: discordChannelCap,
                ticker_exclusion_list: tickerList,
                threshold: threshold,
                delay: delay,
                holidays: holidays,
                TELEGRAM_TOKEN: telegramData.telegramToken,
                TELEGRAM_CHAT_ID: telegramData.telegramChatId
            }

            await api.post("/save_settings", newData)
            showToast("success", "Successfully Saved!")
        } catch (err) {
            showToast("warning", "Network error")
        }
    }


    const StartBot = async () => {
        try {
            if (password != process.env.NEXT_PUBLIC_PASSWORD) {
                showToast("error", "Password is not correct")
                return
            }
            await api.get("/run")
            showToast("success", "Bot is starting!")
        } catch (err) {
            showToast("warning", "Network error")
        }
    }

    const PauseBot = async () => {
        try {
            if (password != process.env.NEXT_PUBLIC_PASSWORD) {
                showToast("error", "Password is not correct")
                return
            }
            await api.get("/pause", { params: { id: -1 } })
            showToast("success", "Bot is paused!")
        } catch (err) {
            showToast("warning", "Network error")
        }
    }

    const SellAll = async () => {
        try {
            if (password != process.env.NEXT_PUBLIC_PASSWORD) {
                showToast("error", "Password is not correct")
                return
            }

            await api.get("/sell", { params: { id: -1 } })

            showToast("success", "All sell!")
        } catch (err) {
            showToast("warning", "Network error")
        }
    }

    const Resume = async () => {
        try {
            if (password != process.env.NEXT_PUBLIC_PASSWORD) {
                showToast("error", "Password is not correct")
                return
            }
            await api.get("/resume", { params: { id: -1 } })
            showToast("success", "resume!")
        } catch (err) {
            showToast("warning", "Network error")
        }
    }


    return (
        <>
            <button
                className="absolute top-1 left-0  text-[white] block md:hidden z-[10]"
                onClick={() => {
                    setIsHidden(!isHidden)
                }}
            >
                {/* hiddenBtn */}
                <Image
                    src="/svg/hamburger-sidebar-svgrepo-com.svg"
                    alt="back"
                    width={30}
                    height={30}
                />
            </button>

            {
                isHidden &&
                <div className={`w-[300px] min-h-screen absolute top-0 left-0 bg-[#2b2b2b] z-[10] md:hidden rounded-md flex flex-col duration-200 p-3 gap-4`}>
                    <button
                        className="w-[50px] h-[40px] p-2"
                        onClick={() => {
                            setIsHidden(!isHidden)
                        }}
                    >
                        <Image
                            src={"/svg/back-svgrepo-com.svg"}
                            width={30}
                            height={30}
                            alt="back"
                        />
                    </button>
                    {
                        buttonName.map((itx: string, idx: number) => (
                            <p
                                className={`p-2 rounded-xl ${isClicked[idx] == true ? "bg-[#2566aa]" : ""} hover:bg-[#6e767c] text-[white]`}
                                key={idx}
                                onClick={() => {
                                    let _newclick: boolean[] = []
                                    props.setSideBarNumber(idx)
                                    for (let i = 0; i < isClicked.length; i++) {
                                        if (idx == i) _newclick.push(true)
                                        else _newclick.push(false)
                                    }
                                    setIsClicked(_newclick)
                                    setIsHidden(!isHidden)
                                }}
                            >
                                {itx}
                            </p>
                        ))

                    }

                    <div className="mt-5" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="text-[white] h-[40px] p-2 rounded-xl border border-[white] bg-[black]"
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                    <button
                        className="h-[40px] p-2 rounded-xl bg-[#161616] hover:bg-[#6e767c] text-[white]"
                        onClick={() => {
                            SaveData()
                        }}
                    >
                        Save All
                    </button>

                    <button
                        className="h-[40px] p-2 rounded-xl bg-[#161616] hover:bg-[#6e767c] text-[white]"
                        onClick={() => {
                            PauseBot()
                        }}
                    >
                        Pause All
                    </button>

                    <button
                        className="h-[40px] p-2 rounded-xl bg-[#161616] hover:bg-[#6e767c] text-[white]"
                        onClick={() => {
                            Resume()
                        }}
                    >
                        Resume All
                    </button>

                    <button
                        className="h-[40px] p-2 rounded-xl bg-[#161616] hover:bg-[#6e767c] text-[white]"
                        onClick={() => {
                            SellAll()
                        }}
                    >
                        Sell All
                    </button>
                </div>

            }



            <div className="min-h-screen pt-10 pb-10 pl-10 hidden md:block">
                <div className={`w-[250px] h-[100%]  border rounded-md flex flex-col p-3 gap-3`}>
                    {
                        buttonName.map((itx: string, idx: number) => (
                            <p
                                className={`p-2 rounded-xl ${isClicked[idx] == true ? "bg-[#2566aa]" : ""} hover:bg-[#6e767c] text-[white]`}
                                key={idx}
                                onClick={() => {
                                    let _newclick: boolean[] = []
                                    props.setSideBarNumber(idx)
                                    for (let i = 0; i < isClicked.length; i++) {
                                        if (idx == i) _newclick.push(true)
                                        else _newclick.push(false)
                                    }
                                    setIsClicked(_newclick)
                                }}
                            >
                                {itx}
                            </p>
                        ))

                    }

                    <div className=" mt-5" />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-[200px] text-[white] bg-[black] h-[40px] rounded-xl border border-[white]"
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                    <button
                        className="w-[200px] h-[40px] p-2 rounded-xl bg-[#161616] hover:bg-[#6e767c] text-[white]"
                        onClick={() => {
                            SaveData()
                        }}
                    >
                        Save All
                    </button>

                    <button
                        className="w-[200px] h-[40px] p-2 rounded-xl bg-[#161616] hover:bg-[#6e767c] text-[white]"
                        onClick={() => {
                            PauseBot()
                        }}
                    >
                        Pause All
                    </button>

                    <button
                        className="w-[200px] h-[40px] p-2 rounded-xl bg-[#161616] hover:bg-[#6e767c] text-[white]"
                        onClick={() => {
                            Resume()
                        }}
                    >
                        Resume All
                    </button>

                    <button
                        className="w-[200px] h-[40px] p-2 rounded-xl bg-[#161616] hover:bg-[#6e767c] text-[white]"
                        onClick={() => {
                            SellAll()
                        }}
                    >
                        Sell All
                    </button>
                </div>
            </div>
        </>
    )
}

export default SideBar