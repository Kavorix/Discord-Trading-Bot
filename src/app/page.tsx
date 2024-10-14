"use client"
import SideBar from "@/components/sidebar";
import BotSetting from "@/components/botsetting";
import DiscordSetting from "@/components/discordsetting";
import RHUserSetting from "@/components/rhusersetting";
import Telegramsetting from "@/components/telegramsetting";
import { useState } from "react";
import { useUtilContext } from "@/hooks";
import Modal from "@/components/modal";
export default function Home() {

  const { sideBarNumber, setSideBarNumber, isModal } = useUtilContext()

  return (
    <div>
      <div className="flex min-h-screen bg-[black]">
        <SideBar setSideBarNumber={setSideBarNumber} />
        <div className="w-full min-h-screen p-10">
          <div className="rounded-md border h-full flex justify-center items-center">
            {sideBarNumber == 0 && <DiscordSetting />}
            {sideBarNumber == 1 && <RHUserSetting />}
            {sideBarNumber == 2 && <Telegramsetting />}
            {sideBarNumber == 3 && <BotSetting />}
            {sideBarNumber == 4 && <BotSetting />}
            {sideBarNumber == 5 && <BotSetting />}
            {sideBarNumber == 6 && <BotSetting />}
            {sideBarNumber == 7 && <BotSetting />}
            {sideBarNumber == 8 && <BotSetting />}
            {sideBarNumber == 9 && <BotSetting />}
          </div>
        </div>
        {
          isModal &&
          <>
            <div className="fixed top-0 left-0 w-[100%] h-[100%] bg-[white] opacity-50 z-[10] blur-5xl" >
            </div>
            <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 sm:w-[500px] w-[90%] bg-[black] z-[14]">
              <Modal />
            </div>
          </>
        }
      </div>

    </div>
  );
}





