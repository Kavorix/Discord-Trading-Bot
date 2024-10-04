"use client"
import {
    createContext,
    useEffect,
    useState,
    useMemo,
} from "react"
import {
    UtilContextType,
    DiscordAccountType,
    RhUserType,
    TelegramType,
    DiscordChannelUseType,
    TickerListType
} from "@/types"
import api from "@/service"

const UtilContext = createContext<UtilContextType | null>(null)

export const UtilContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [discordAccount, setdiscordAccount] = useState<DiscordAccountType>({ et: "", dt: "", mm: "", sre_qt: "", sre_pa: "" })
    const [sideBarNumber, setSideBarNumber] = useState<number>(0)
    const [rhuser, setRhUser] = useState<RhUserType[]>([
        { username: "", password: "", type: "", totp_secret: "", account_number: "" },
        { username: "", password: "", type: "", totp_secret: "", account_number: "" },
        { username: "", password: "", type: "", totp_secret: "", account_number: "" },
        { username: "", password: "", type: "", totp_secret: "", account_number: "" },
        { username: "", password: "", type: "", totp_secret: "", account_number: "" },
        { username: "", password: "", type: "", totp_secret: "", account_number: "" },
        { username: "", password: "", type: "", totp_secret: "", account_number: "" },
    ])
    const [telegramData, setTelegramData] = useState<TelegramType>({ telegramChatId: "", telegramToken: "" })
    const [discordChannelUse, setDiscordChannelUse] = useState<DiscordChannelUseType>([
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
    ])

    const [discordChannelCap, setDiscordChannelCap] = useState<DiscordChannelUseType>([
        [10000, 10000, 10000, 10000, 10000],
        [10000, 10000, 10000, 10000, 10000],
        [10000, 10000, 10000, 10000, 10000],
        [10000, 10000, 10000, 10000, 10000],
        [10000, 10000, 10000, 10000, 10000],
        [10000, 10000, 10000, 10000, 10000],
        [10000, 10000, 10000, 10000, 10000],
    ])

    const [tickerList, setTickerList] = useState<TickerListType>([
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ])

    const [threshold, setThreshold] = useState<number[]>([])
    const [delay, setDelay] = useState<number[]>([])

    const GetDiscordData = (result: any) => {
        console.log(result.discords)
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

    const init = async () => {
        try {
            const data = await api.get("/get_settings")
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
        }
    }

    const value = useMemo(() => ({
        discordAccount: discordAccount,
        setdiscordAccount: setdiscordAccount,
        sideBarNumber: sideBarNumber,
        setSideBarNumber: setSideBarNumber,
        rhuser: rhuser,
        setRhUser: setRhUser,
        telegramData: telegramData,
        setTelegramData: setTelegramData,
        discordChannelUse: discordChannelUse,
        setDiscordChannelUse: setDiscordChannelUse,
        discordChannelCap: discordChannelCap,
        setDiscordChannelCap: setDiscordChannelCap,
        tickerList: tickerList,
        setTickerList: setTickerList,
        threshold: threshold,
        setThreshold: setThreshold,
        delay: delay,
        setDelay: setDelay
    }), [
        discordAccount,
        setdiscordAccount,
        sideBarNumber,
        setSideBarNumber,
        rhuser,
        setRhUser,
        telegramData,
        setTelegramData,
        discordChannelUse,
        setDiscordChannelUse,
        discordChannelCap,
        setDiscordChannelCap,
        tickerList,
        setTickerList,
        threshold,
        setThreshold,
        delay,
        setDelay
    ])

    useEffect(() => {
        init();
    }, [])

    return (
        <UtilContext.Provider value={value}>
            {children}
        </UtilContext.Provider>
    )
}

export default UtilContext