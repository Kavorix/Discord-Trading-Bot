"use client"
import SideBar from "@/components/sidebar";
import BotSetting from "@/components/botsetting";
import DiscordSetting from "@/components/discordsetting";
import RHUserSetting from "@/components/rhusersetting";
import Telegramsetting from "@/components/telegramsetting";
import { useState } from "react";
import { useUtilContext } from "@/hooks";
export default function Home() {

  const { sideBarNumber, setSideBarNumber } = useUtilContext()

  return (
    <div className="flex min-h-screen bg-[black]">
      <SideBar setSideBarNumber={setSideBarNumber} />
      <div className="relative w-full min-h-screen p-10">
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
    </div>
  );
}





