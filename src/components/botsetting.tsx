"use client"
import { use, useEffect, useState } from "react"
import CheckBoxComponent from "./checkboxcomponent"
import { BotSettingType } from "@/types"
import { useUtilContext } from "@/hooks"
import api from "@/service"
import { toast } from "react-toastify"
import { showToast } from "@/helper"
const DiscordLIst = () => {
    const checkboxList = [
        "ET",
        "DT",
        "MM",
        "SRE_QT",
        "SRE_PA",
    ]
    const { discordChannelUse, setDiscordChannelUse, sideBarNumber } = useUtilContext()
    const setIsCheck = (result: any) => {
        const sideBarIndex = sideBarNumber - 3

        let _discordChannelUse = discordChannelUse[sideBarIndex]
        _discordChannelUse[result.checkboxId] = result.ischecked

        let newDiscordChannelUse = []
        for (let i = 0; i < discordChannelUse.length; i++) {
            if (i == sideBarIndex) newDiscordChannelUse.push(_discordChannelUse)
            else newDiscordChannelUse.push(discordChannelUse[i])
        }
        setDiscordChannelUse(newDiscordChannelUse)
    }

    return (
        <div className="w-[100%] md:w-[300px] xl:w-[400px] h-[500px] flex flex-col bg-[#2b2b2b] items-center p-10 rounded-xl">
            <p className=" text-[white]">Discord List</p>
            <div className="w-[100%] h-[100%] flex flex-col justify-center items-between gap-3">
                {
                    checkboxList.map((itx: string, idx: number) => (
                        <CheckBoxComponent
                            key={idx}
                            checkboxId={idx}
                            setIsCheck={setIsCheck}
                        />
                    ))
                }
            </div>
        </div>
    )
}

const TickerList = () => {
    const [inputValue, setInputValue] = useState<string>("")
    const [tickerComponentList, setTickerComponentList] = useState<string[]>([])
    const [isClicked, setIsClicked] = useState<boolean[]>([])
    const [clickedId, setClickedId] = useState<number>(-1)
    const [btnIsClicked, setBtnIsClicked] = useState<number>(0)
    const { tickerList, setTickerList, sideBarNumber } = useUtilContext()


    useEffect(() => {
        if (btnIsClicked == 0) return
        const sideBarIndex = sideBarNumber - 3
        let newTickerList = []
        for (let i = 0; i < tickerList.length; i++) {
            if (i == sideBarIndex) newTickerList.push(tickerComponentList)
            else newTickerList.push(tickerList[i])
        }
        setTickerList(newTickerList)
    }, [btnIsClicked])

    useEffect(() => {
        setTickerComponentList(tickerList[sideBarNumber - 3])
    }, [tickerList])

    return (
        <div className="w-[100%] md:w-[300px] xl:w-[400px]  h-[500px] flex flex-col bg-[#2b2b2b] items-center p-10 rounded-xl">
            <p className=" text-[white]">Ticker ex-List</p>
            <div className="flex flex-col md:flex-row w-[100%] gap-5 justify-between mt-3">
                <button
                    className="w-full h-[35px] bg-[#2a64a3] rounded-md  text-[white]"
                    onClick={async () => {
                        if (inputValue == "") return
                        let _ticker = tickerComponentList
                        let _isclick = isClicked
                        _ticker.push(inputValue)
                        _isclick.push(false)
                        await setTickerComponentList(_ticker)
                        await setIsClicked(_isclick)
                        await setInputValue("")
                        await setBtnIsClicked(prev => prev + 1)
                    }}
                >
                    Add Ticker
                </button>
                <input
                    type="text"
                    className="w-full h-[35px] text-[white] bg-transparent border rounded-md"
                    value={inputValue}
                    onChange={(e: any) => setInputValue(e.target.value)}
                />
            </div>

            <div className="w-[100%] h-[300px] p-3 border justify-between mt-5">
                {
                    tickerComponentList.map((itx: string, idx: number) => (
                        <p
                            className={`p-2 w-full h-[30px] flex items-center rounded-md ${isClicked[idx] == true ? "bg-[#2566aa]" : ""} hover:bg-[#6e767c] text-[white]`}
                            onClick={() => {
                                let _newclick: boolean[] = []
                                for (let i = 0; i < isClicked.length; i++) {
                                    if (idx == i) _newclick.push(true)
                                    else _newclick.push(false)
                                }
                                setIsClicked(_newclick)
                                setClickedId(idx)
                            }}
                            key={idx}>
                            {itx}
                        </p>
                    ))
                }
            </div>

            <div className="flex w-[100%] justify-between mt-10">
                <button
                    className="w-[100%] h-[40px] bg-[#2a64a3] rounded-md  text-[white]"
                    onClick={() => {
                        let _ticker: string[] = []
                        for (let i = 0; i < tickerComponentList.length; i++) {
                            if (i != clickedId)
                                _ticker.push(tickerComponentList[i])
                        }
                        setTickerComponentList(_ticker)
                        setBtnIsClicked(prev => prev + 1)
                    }}
                >
                    Remove Tickers
                </button>
            </div>
        </div>
    )
}


const BuySettings = () => {

    const { sideBarNumber, threshold, setThreshold, delay, setDelay } = useUtilContext()
    const [eachThres, setEachThres] = useState<number>()
    const [eachDelay, setEachDelay] = useState<number>()

    useEffect(() => {
        setEachDelay(delay[sideBarNumber - 3])
        setEachThres(threshold[sideBarNumber - 3])
    }, [delay, threshold])
    return (
        <div className="w-[100%] md:w-[300px] xl:w-[400px]  h-[500px] flex flex-col bg-[#2b2b2b] items-center p-10 rounded-xl">
            <p className=" text-[white]">Buy Setting</p>
            <div className="flex flex-wrap w-[100%] justify-between mt-24">
                <p className=" text-[white]">ThresHold(%)</p>
                <input
                    type="number"
                    className="w-[100%] text-[white] bg-transparent border rounded-md"
                    value={eachThres}
                    onChange={(e: any) => {
                        let _threshold = threshold
                        _threshold[sideBarNumber - 3] = Number(e.target.value)
                        setThreshold(_threshold)
                        setEachThres(Number(e.target.value))
                    }}
                />
            </div>

            <div className="flex flex-wrap w-[100%] justify-between mt-24">
                <p className=" text-[white]">Deplay(s)</p>
                <input
                    type="number"
                    className="w-[100%] text-[white] bg-transparent border rounded-md"
                    value={eachDelay}
                    onChange={(e: any) => {
                        let _delay = delay
                        _delay[sideBarNumber - 3] = Number(e.target.value)
                        setDelay(_delay)
                        setEachDelay(Number(e.target.value))
                    }}
                />
            </div>
        </div>
    )
}



const BotSetting = () => {
    const btnName = [
        "Pause",
        "Resume",
        "Sell"
    ]

    const endpoint = [
        "pause",
        "resume",
        "sell"
    ]

    const { sideBarNumber, password } = useUtilContext()

    const handleClick = async (idx: number) => {
        try {


            const id = sideBarNumber - 3
            const result = await api.post(`/${endpoint[idx]}`, { id: id, password: password })
            if (result.data == false) {
                showToast("warning", "Password is not correct")
                return
            }
            showToast("success", `Bot is successfully ${endpoint[idx]}d`)
        } catch (err) {
            showToast("warning", "Network error")
        }
    }

    return (
        <div className="p-10 w-[100%] h-[100%] flex flex-col items-center">
            <div className="w-[100%] h-[100px] flex justify-end gap-3">
                {
                    btnName.map((itx: any, idx: any) => (
                        <button
                            className="w-[150px] h-[40px] bg-[#2a64a3] rounded-md text-[white]"
                            onClick={() => { handleClick(idx) }}
                        >
                            {itx}
                        </button>
                    ))
                }
            </div>
            <div className="flex flex-wrap gap-10 justify-center">
                <BuySettings />
                <TickerList />
                <DiscordLIst />
            </div>
        </div>
    )
}

export default BotSetting;