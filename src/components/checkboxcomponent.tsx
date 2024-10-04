"use client"
import { useEffect, useState } from 'react';
import { CheckBoxType } from "@/types"
import { useUtilContext } from '@/hooks';
interface CheckBoxComponentType {
    checkboxId: number,
    setIsCheck: (id: any) => void,
}
const CheckBoxComponent = ({ checkboxId, setIsCheck }: CheckBoxComponentType) => {
    const { sideBarNumber, discordChannelUse, discordChannelCap, setDiscordChannelCap } = useUtilContext()

    const [isComponentChecked, setIsComponentChecked] = useState(false);
    const [inputValue, setInputValue] = useState<number>(0)
    const checkboxList = [
        "ET",
        "DT",
        "MM",
        "SRE_QT",
        "SRE_PA",
    ]

    const handleChange = (event: any) => {
        setIsComponentChecked(event.target.checked); // Update state based on checkbox status
        setIsCheck({ checkboxId: checkboxId, ischecked: event.target.checked == true ? 1 : 0 })
    };

    useEffect(() => {
        const isChceck = discordChannelUse[sideBarNumber - 3][checkboxId]
        isChceck == 1 ? setIsComponentChecked(true) : setIsComponentChecked(false)
    }, [discordChannelUse])

    useEffect(() => {
        setInputValue(discordChannelCap[sideBarNumber - 3][checkboxId])
    }, [discordChannelCap])

    return (
        <div className="w-[100%] ">
            <div className="flex">
                <input
                    type="checkbox"
                    checked={isComponentChecked}
                    onChange={handleChange}
                    className="w-[20px]"
                />
                <p  className="ml-2 text-[white]">{checkboxList[checkboxId]}</p>
            </div>

            <div className="flex flex-col pl-10 sm:flex-row sm:justify-between sm:items-center mt-3">
                <p className="w-[100px] text-[white] ">{"CAP :"}</p>
                <input
                    type="text"
                    className="w-full text-[white] bg-transparent border rounded-md"
                    value={inputValue}
                    onChange={(e: any) => {
                        setInputValue(e.target.value)
                        let newdiscordChannelCap = discordChannelCap
                        newdiscordChannelCap[sideBarNumber - 3][checkboxId] = Number(e.target.value)
                        setDiscordChannelCap(newdiscordChannelCap)
                    }}
                />
            </div>
        </div>
    )
}

export default CheckBoxComponent