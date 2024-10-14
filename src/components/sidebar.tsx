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
        setPassword,
        setdiscordAccount,
        setRhUser,
        setTelegramData,
        setThreshold,
        setDelay,
        setTickerList,
        setDiscordChannelCap,
        setDiscordChannelUse

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


    const GetDiscordData = (result: any) => {
        setdiscordAccount({
            et: result.discords[0].channel_id,
            dt: result.discords[1].channel_id,
            mm: result.discords[2].channel_id,
            sre_pa: result.discords[3].channel_id,
            sre_qt: result.discords[4].channel_id,
        })
    }

    const GetRhUserData = (result: any) => {
        setRhUser(result.accounts)
    }

    const GetTelegramData = (result: any) => {
        setTelegramData({
            telegramChatId: result.TELEGRAM_CHAT_ID,
            telegramToken: result.TELEGRAM_TOKEN
        })
    }

    const GetThresHold = (result: any) => {
        setThreshold(result.threshold)
    }

    const GetDelay = (result: any) => {
        setDelay(result.delay)
    }

    const GetTicket = (result: any) => {
        setTickerList(result.ticker_exclusion_list)
    }

    const GetDiscordCap = (result: any) => {
        setDiscordChannelCap(result.cap_discord_channel)
    }

    const GetDiscordUse = (result: any) => {
        setDiscordChannelUse(result.discord_channel_use)
    }

    const SaveData = async () => {
        try {
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

            const result: any = await api.post("/save_settings", { data: newData, password: password })
            if (result.data == false) {
                showToast("warning", "Password is not correct!")
                return
            }
            showToast("success", "Successfully Saved!")
        } catch (err) {
            showToast("warning", "Network error")
        }
    }


    const StartBot = async () => {
        try {
            await api.post("/run", { password: password })
            showToast("success", "Bot is starting!")
        } catch (err) {
            showToast("warning", "Network error")
        }
    }

    const PauseBot = async () => {
        try {
            const result: any = await api.post("/pause", { id: -1, password: password })
            if (result.data == false) {
                showToast("warning", "Password is not correct!")
                return
            }
            showToast("success", "Bot is paused!")
        } catch (err) {
            showToast("warning", "Network error")
        }
    }

    const SellAll = async () => {
        try {
            const result: any = await api.post("/sell", { id: -1, password: password })
            if (result.data == false) {
                showToast("warning", "Password is not correct!")
                return
            }
            showToast("success", "All sell!")
        } catch (err) {
            showToast("warning", "Network error")
        }
    }

    const Resume = async () => {
        try {
            const result: any = await api.post("/resume", { id: -1, password: password })
            if (result.data == false) {
                showToast("warning", "Password is not correct!")
                return
            }
            showToast("success", "resume!")
        } catch (err) {
            showToast("warning", "Network error")
        }
    }

    const LoadData = async () => {
        try {
            console.log("Password =>", password)
            const data = await api.post("/get_settings", { password: password })
            if (data.data == false) {
                showToast("warning", "Password is not correct!")
                return
            }
            const result = data.data
            if (result == undefined) return
            GetDiscordData(result)
            GetRhUserData(result)
            GetTelegramData(result)
            GetThresHold(result)
            GetDelay(result)
            GetTicket(result)
            GetDiscordCap(result)
            GetDiscordUse(result)
        } catch (err) {
            showToast("warning", "Password is not correct")
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
                            LoadData()
                        }}
                    >
                        Load Data
                    </button>

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
                            LoadData()
                        }}
                    >
                        Load Data
                    </button>
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