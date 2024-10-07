export type BotSettingType = {
    setContextAccount1: (id: any) => void;
}

export type DiscordAccountType = {
    et: string,
    dt: string,
    mm: string,
    sre_pa: string,
    sre_qt: string,
}

export type RhUserType = {
    username: string,
    password: string,
    type: string,
    totp_secret: string,
    account_number: string
}

export type TelegramType = {
    telegramChatId: string,
    telegramToken: string
}

export type DiscordChannelUseType = number[][]
export type TickerListType = string[][]
export type CheckBoxType = {
    checkboxId: number,
    ischecked: boolean
}

export type UtilContextType = {
    discordAccount: DiscordAccountType;
    setdiscordAccount: (id: DiscordAccountType) => void;
    sideBarNumber: number;
    setSideBarNumber: (id: number) => void;
    rhuser: RhUserType[];
    setRhUser: (id: RhUserType[]) => void;
    telegramData: TelegramType;
    setTelegramData: (id: TelegramType) => void;
    discordChannelUse: DiscordChannelUseType;
    setDiscordChannelUse: (id: DiscordChannelUseType) => void;
    discordChannelCap: DiscordChannelUseType;
    setDiscordChannelCap: (id: DiscordChannelUseType) => void;
    tickerList: TickerListType;
    setTickerList: (id: TickerListType) => void;
    threshold: number[];
    setThreshold: (id: number[]) => void;
    delay: number[];
    setDelay: (id: number[]) => void;
    password: string;
    setPassword: (id: string) => void;
}