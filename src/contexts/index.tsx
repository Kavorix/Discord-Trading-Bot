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
    const [password, setPassword] = useState<string>("")
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
    const [isModal, setIsModal] = useState<boolean>(false)

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
        setDelay: setDelay,
        password: password,
        setPassword: setPassword,
        isModal: isModal,
        setIsModal: setIsModal
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
        setDelay,
        password,
        setPassword,
        isModal,
        setIsModal
    ])

    return (
        <UtilContext.Provider value={value}>
            {children}
        </UtilContext.Provider>
    )
}

export default UtilContext