"use client"
import { useUtilContext } from "@/hooks";
const Telegramsetting = () => {
    const { telegramData, setTelegramData } = useUtilContext()
    return (
        <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
            <div className="w-[90%] md:w-[400px] xl:w-[500px] h-[400px] rounded-md flex flex-col gap-10 justify-center items-center bg-[#2b2b2b]">
                <div className="w-[90%]">
                    <p className=" text-[white]">Telegram Chat ID</p>
                    <input
                        type="text"
                        className="w-[100%] text-[white] bg-transparent border rounded-md"
                        value={telegramData.telegramChatId}
                        onChange={(e: any) => {
                            setTelegramData({
                                ...telegramData,
                                telegramChatId: e.target.value
                            })
                        }}
                    />
                </div>

                <div className="mt-10 w-[90%]">
                    <p className=" text-[white]">Token</p>
                    <input
                        type="text"
                        className="w-[100%] text-[white] bg-transparent border rounded-md"
                        value={telegramData.telegramToken}
                        onChange={(e: any) => {
                            setTelegramData({
                                ...telegramData,
                                telegramToken: e.target.value
                            })
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Telegramsetting;