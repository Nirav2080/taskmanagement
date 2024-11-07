"use client"
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
    const [showProjects,setShowProjects]=useState(true);
    const [showPriority,setShowPriority]=useState(true);

    const dispatch = useAppDispatch();
 const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);


  const sidebarClassName =`fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white ${isSidebarCollapsed ? "w-0 hidden":"w-64"}`;
  return (
    <div className={sidebarClassName}>
        <div className="flex h-[100%] w-full flex-col justify-start">
            <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                    EDLIST
                </div>
                {isSidebarCollapsed ? null :(
                    <button className="py-3" onClick={()=>{dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}}>
                        <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
                    </button>
                )}
            </div>
            {/*Team*/}
            <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
                <Image src="/logo.png" alt="Logo" width={40} height={40}/>
                <div>
                    <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
                        EDROH TEAM
                    </h3>
                    <div className="mt-1 flex items-start gap-2">
                        <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400"/>
                        <p className="text-xs text-gray-500">Private</p>
                    </div>
                </div>
            </div>
            {/*Navbar Links*/}
            <nav className="z-10 w-full">
                <SidebarLink icon={Home} label="Home" href="/" isCollapsed="isSidebarCollapsed"/>
                <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" isCollapsed="isSidebarCollapsed"/>
                <SidebarLink icon={Search} label="Search" href="/search" isCollapsed="isSidebarCollapsed"/>
                <SidebarLink icon={Settings} label="Setting" href="/setting" isCollapsed="isSidebarCollapsed"/>
                <SidebarLink icon={User} label="Users" href="/users" isCollapsed="isSidebarCollapsed"/>
                <SidebarLink icon={Users} label="Teams" href="/teams" isCollapsed="isSidebarCollapsed"/>
            </nav>
            {/*Projects List*/}

            {/*Priorities Links*/}
            <button onClick={()=>setShowProjects((prev)=>!prev)} className="flex w-full items-center text-gray-500 px-8 py-3">
                <span className="">Projects</span>
                {showProjects ?(
                    <ChevronUp className="h-5 w-5"/>
                ):(
                    <ChevronDown className="h-5 w-5"/>
                )}
            </button>
            {/*Projects List*/}

             {/*Priorities Links*/}
            <button onClick={()=>setShowPriority((prev)=>!prev)} className="flex w-full items-center text-gray-500 px-8 py-3">
                <span className="">Priority</span>
                {showPriority ?(
                    <ChevronUp className="h-5 w-5"/>
                ):(
                    <ChevronDown className="h-5 w-5"/>
                )}
            </button>
            {showPriority && (
                <>
                <SidebarLink icon={AlertCircle} label="Urgent" href="/priority/urgent" isCollapsed="isSidebarCollapsed"/>
                <SidebarLink icon={ShieldAlert} label="High" href="/priority/high" isCollapsed="isSidebarCollapsed"/>
                <SidebarLink icon={AlertTriangle} label="Medium" href="/priority/medium" isCollapsed="isSidebarCollapsed"/>
                <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" isCollapsed="isSidebarCollapsed"/>
                <SidebarLink icon={Layers} label="Backlog" href="/priority/backlog" isCollapsed="isSidebarCollapsed"/>
                </>
            )}

        </div>
    </div>
  )
}

interface SidebarLinkProps{
    href: string,
    icon: LucideIcon;
    label:string,
    isCollapsed:string,
}

const SidebarLink = ({
    href,
    icon:Icon,
    label,
}:SidebarLinkProps) =>{
    const pathname = usePathname();
    const isActive = pathname === href || (pathname=== "/" && href === "/dashboard" );
    const screenWidth = window.innerWidth;

    const dispatch = useAppDispatch();
 const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
 return(
    <Link href={href} className="w-full">
    <div className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
        isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
    }justify-start px-8 py-3`}>
        {isActive && (
            <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200"/>
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100"/>
        <span className={`font-medium text-gray-800 dark:text-gray-100 `}>
            {label}
        </span>
    </div>
    </Link>
 )
}

export default Sidebar;