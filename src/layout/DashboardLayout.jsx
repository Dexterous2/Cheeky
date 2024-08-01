"use client"
import React, { useEffect, useState } from 'react'
import styles from './layout.module.scss'
import Button from '@/components/button/Button';
import { RiDashboardFill } from "react-icons/ri";
import { FaProjectDiagram } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdOutlineWallet } from "react-icons/md";
import { IoChatbubbleSharp } from "react-icons/io5";
import { BiSolidLogOut } from "react-icons/bi";
import Field from '@/components/inputFIeld/Field';
import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { HiMiniBars3 } from "react-icons/hi2";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';
import { FaCodePullRequest } from "react-icons/fa6";
import { TbPlugConnected } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";
import { useSearch } from '@/lib/SearchContext';

const DashboardLayout = ({ children }) => {
    const [height_, setHeight_] = useState(`h-[7rem]`);
    const [padding_, setPadding_] = useState('px-[1rem] lg:px-[2rem] xl:px-[3rem]')
    const [show, setShow] = useState(false);

    const { searchQuery, updateSearchQuery } = useSearch();

    const toggleShow = () => {
        setShow(!show);
    }

    const router = useRouter()

    const pathName = usePathname()

    let connection;
    if (pathName.startsWith("/chat")) {
        connection = true
    } else if (pathName === "/connection") {
        connection = true
    }

    let marketplace;
    if (pathName.startsWith("/market-place")) {
        marketplace = true
    }

    let services;
    if (pathName.startsWith("/services")) {
        services = true
    } else if (pathName.startsWith("/services/edit-service")) {
        services = true
    }


    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')

    const role = userData?.user?.role?.[0]

    const handleLogout = () => {
        const cookies = getCookie("cheeky")
        if (cookies) {
            deleteCookie('cheeky')
            router.push("/login")
        }
    }

    return (
        <div className='border--2 border-red-900 w-full h-screen flex relative'>
            {/* sidebar */}
            {
                role === 'brandOwner' ?
                    <div className={`${styles.bg_sidebar} shadow_pri ${show === false ? 'w-[0%]' : 'max-[321px]:w-[14rem] w-[16.5rem] absolute top-0 left-0'} lg:w--[20rem] lg:w-[25%] xl:w-[20%] min-[1450px]:w-[17%] h-full lg:relative overflow-hidden overflow-y-auto transition-all duration-300 z-50`}>
                        <div className={`border--2 border-white w-full max-[321px]:h-[5rem] ${height_} flex justify-center items-center ${show === false ? 'opacity-0' : 'opacity-100'} lg:opacity-100`}>
                            <img src="/image/main/logo.png" alt="logo.png" className='max-[490px]:w-[70%] w-[80%]' />
                        </div>
                        <div className={`border-t-[1px] border-b-[1px] w-full border-white max-[321px]:px-1 max-[321px]:py-2 px-3 py-8 ${show === false ? 'translate-x-[-100vw]' : 'w-full transition-all duration-500'} lg:translate-x-0 flex flex-col gap-2`}>
                            <Link href={"/market-place"}>
                                <Button name={'Marketplace'} icon={<IoBagHandleSharp className='text-2xl me-2' />} className={`${marketplace || services ? "bg-[#FFF] text-[#0797B7]" : "hover:bg-[#FFF] hover:text-[#0797B7]"}`}
                                    pClass={`${marketplace || services ? "text-[#0797B7]" : ""}`} bgcolor={'transparent'} />
                            </Link>

                            <Link href={"/connection"}>
                                <Button name={'Connection'} icon={<TbPlugConnected className='text-2xl me-2' />} className={`${connection ? "bg-[#FFF] text-[#0797B7]" : "hover:bg-[#FFF] hover:text-[#0797B7]"}`}
                                    pClass={`${connection ? "text-[#0797B7]" : ""}`} bgcolor={'transparent'} />
                            </Link>

                            <Link href={"/profile"}>
                                <Button name={'Profile'} icon={<FaUser className='text-2xl me-2' />} className={`${pathName === "/profile" ? "bg-[#FFF] text-[#0797B7]" : "hover:bg-[#FFF] hover:text-[#0797B7]"}`}
                                    pClass={`${pathName === "/profile" ? "text-[#0797B7]" : "hover:text-[#0797B7]"}`} bgcolor={'transparent'} />
                            </Link>

                            <Link href={'/wallet'}>
                                <Button name={'Wallet'} icon={<MdOutlineWallet className='text-2xl me-2' />} className={`${pathName === "/wallet" ? "bg-[#FFF] text-[#0797B7]" : "hover:bg-[#FFF] hover:text-[#0797B7]"}`}
                                    pClass={`${pathName === "/wallet" ? "text-[#0797B7]" : "hover:text-[#0797B7]"}`} bgcolor={'transparent'} />
                            </Link>

                            <Link href={"/orders"}>
                                <Button name={'Order'} icon={<FaCartShopping className='text-2xl me-2' />} className={`${pathName === "/orders" ? "bg-[#FFF] text-[#0797B7]" : "hover:bg-[#FFF] hover:text-[#0797B7]"}`}
                                    pClass={`${pathName === "/orders" ? "text-[#0797B7]" : ""}`} bgcolor={'transparent'} />
                            </Link>

                        </div>
                        <div className={`border--2 border-red-900 w-full px-3 py-3 absolute bottom-0 ${show === false ? 'translate-x-[-100vw]' : 'w-full transition-all duration-500'} lg:translate-x-0`}>
                            <Button name={'Logout'} icon={<BiSolidLogOut className='text-2xl me-2' />} className={`hover:bg-[#FFF] hover:text-[#0797B7]`} pClass={`text-base`} bgcolor={'transparent'} onClick={handleLogout} />
                        </div>
                    </div>
                    : role === 'Influencer' ?
                        <div className={`${styles.bg_sidebar} shadow_pri ${show === false ? 'w-[0%]' : 'max-[321px]:w-[14rem] w-[16.5rem] absolute top-0 left-0'} lg:w--[20rem] lg:w-[25%] xl:w-[20%] min-[1450px]:w-[17%] h-full lg:relative overflow-hidden overflow-y-auto transition-all duration-300 z-50`}>
                            <div className={`border--2 border-white w-full max-[321px]:h-[5rem] ${height_} flex justify-center items-center ${show === false ? 'opacity-0' : 'opacity-100'} lg:opacity-100`}>
                                <img src="/image/main/logo.png" alt="logo.png" className='max-[490px]:w-[70%] w-[80%]' />
                            </div>
                            <div className={`border-t-[1px] xl:border-b-[1px] w-full border-white max-[321px]:px-1 max-[321px]:py-2 px-3 xl:py-8 py-3 ${show === false ? 'translate-x-[-100vw]' : 'w-full transition-all duration-500'} lg:translate-x-0 flex flex-col gap-2 xl:h-auto xl:overflow-y-hidden md:h-[24rem] md:overflow-y-auto h-auto overflow-hidden`}>

                                <Link href="/dashboard">
                                    <Button name={'Dashboard'} icon={<RiDashboardFill className='text-2xl me-2' />}
                                        className={`${pathName === "/dashboard" ? "bg-[#FFF] text-[#0797B7]" : "hover:bg-[#FFF] hover:text-[#0797B7]"}`}
                                        pClass={`${pathName === "/dashboard" ? "text-[#0797B7]" : ""}`}
                                        bgcolor={'transparent'} />
                                </Link>

                                <Link href={'/services'}>
                                    <Button name={'My Services'} icon={<FaProjectDiagram className='text-2xl me-2' />}
                                        className={`${services ? "bg-[#FFF] text-[#0797B7]" : "hover:bg-[#FFF] hover:text-[#0797B7]"}`}
                                        pClass={`${services ? "text-[#0797B7]" : ""}`} bgcolor={'transparent'} />
                                </Link>

                                <Link href={"/request"}>
                                    <Button name={'Request'} icon={<FaCodePullRequest className='text-2xl me-2' />} className={`${pathName === "/request" ? "bg-[#FFF] text-[#0797B7]" : "hover:bg-[#FFF] hover:text-[#0797B7]"}`}
                                        pClass={`${pathName === "/request" ? "text-[#0797B7]" : ""}`} bgcolor={'transparent'} />
                                </Link>

                                <Link href={"/connection"}>
                                    <Button name={'Connection'} icon={<TbPlugConnected className='text-2xl me-2' />} className={`${connection ? "bg-[#FFF] text-[#0797B7]" : "hover:bg-[#FFF] hover:text-[#0797B7]"}`}
                                        pClass={`${connection ? "text-[#0797B7]" : ""}`} bgcolor={'transparent'} />
                                </Link>

                                <Link href={"/orders"}>
                                    <Button name={'Order'} icon={<FaCartShopping className='text-2xl me-2' />} className={`${pathName === "/orders" ? "bg-[#FFF] text-[#0797B7]" : "hover:bg-[#FFF] hover:text-[#0797B7]"}`}
                                        pClass={`${pathName === "/orders" ? "text-[#0797B7]" : ""}`} bgcolor={'transparent'} />
                                </Link>

                                <Link href={"/market-place"}>
                                    <Button name={'Marketplace'} icon={<IoBagHandleSharp className='text-2xl me-2' />} className={`${marketplace ? "bg-[#FFF] text-[#0797B7]" : "hover:bg-[#FFF] hover:text-[#0797B7]"}`}
                                        pClass={`${marketplace ? "text-[#0797B7]" : ""}`} bgcolor={'transparent'} />
                                </Link>

                                <Link href={"/profile"}>
                                    <Button name={'Profile'} icon={<FaUser className='text-2xl me-2' />} className={`${pathName === "/profile" ? "bg-[#FFF] text-[#0797B7]" : "hover:bg-[#FFF] hover:text-[#0797B7]"}`}
                                        pClass={`${pathName === "/profile" ? "text-[#0797B7]" : "hover:text-[#0797B7]"}`} bgcolor={'transparent'} />
                                </Link>

                                <Link href={'/wallet'}>
                                    <Button name={'Wallet'} icon={<MdOutlineWallet className='text-2xl me-2' />} className={`${pathName === "/wallet" ? "bg-[#FFF] text-[#0797B7]" : "hover:bg-[#FFF] hover:text-[#0797B7]"}`}
                                        pClass={`${pathName === "/wallet" ? "text-[#0797B7]" : "hover:text-[#0797B7]"}`} bgcolor={'transparent'} />
                                </Link>

                            </div>
                            <div className={`border--2 xl:border-0 border border-t-white border-red-900 w-full px-3 xl:py-3 pt-1 pb-3 absolute bottom-0 ${show === false ? 'translate-x-[-100vw]' : 'w-full transition-all duration-500'} lg:translate-x-0`}>
                                <Button name={'Logout'} icon={<BiSolidLogOut className='text-2xl me-2' />} className={`hover:bg-[#FFF] hover:text-[#0797B7]`} pClass={`text-base`} bgcolor={'transparent'} onClick={handleLogout} />
                            </div>
                        </div>
                        : <div className={`${styles.bg_sidebar} shadow_pri ${show === false ? 'w-[0%]' : 'max-[321px]:w-[14rem] w-[16.5rem] absolute top-0 left-0'} lg:w--[20rem] lg:w-[25%] xl:w-[20%] min-[1450px]:w-[17%] h-full lg:relative overflow-hidden overflow-y-auto transition-all duration-300 z-50`}>
                            <div className={`border--2 border-white w-full max-[321px]:h-[5rem] ${height_} flex justify-center items-center ${show === false ? 'opacity-0' : 'opacity-100'} lg:opacity-100`}>
                                <img src="/image/main/logo.png" alt="logo.png" className='max-[490px]:w-[70%] w-[80%]' />
                            </div>
                            <div className={`border-t-[1px] xl:border-b-[1px] w-full border-white max-[321px]:px-1 max-[321px]:py-2 px-3 xl:py-8 py-3 ${show === false ? 'translate-x-[-100vw]' : 'w-full transition-all duration-500'} lg:translate-x-0 flex flex-col gap-2`}>

                                <Link href={"/orders"}>
                                    <Button name={'Order'} icon={<FaCartShopping className='text-2xl me-2' />} className={`${pathName === "/orders" ? "bg-[#FFF] text-[#0797B7]" : "hover:bg-[#FFF] hover:text-[#0797B7]"}`}
                                        pClass={`${pathName === "/orders" ? "text-[#0797B7]" : ""}`} bgcolor={'transparent'} />
                                </Link>

                                <Link href={"/profile"}>
                                    <Button name={'Profile'} icon={<FaUser className='text-2xl me-2' />} className={`${pathName === "/profile" ? "bg-[#FFF] text-[#0797B7]" : "hover:bg-[#FFF] hover:text-[#0797B7]"}`}
                                        pClass={`${pathName === "/profile" ? "text-[#0797B7]" : "hover:text-[#0797B7]"}`} bgcolor={'transparent'} />
                                </Link>

                            </div>
                            <div className={`border--2 xl:border-0 border border-t-white border-red-900 w-full px-3 xl:py-3 pt-1 pb-3 absolute bottom-0 ${show === false ? 'translate-x-[-100vw]' : 'w-full transition-all duration-500'} lg:translate-x-0`}>
                                <Button name={'Logout'} icon={<BiSolidLogOut className='text-2xl me-2' />} className={`hover:bg-[#FFF] hover:text-[#0797B7]`} pClass={`text-base`} bgcolor={'transparent'} onClick={handleLogout} />
                            </div>
                        </div>
            }

            <div className='border--2 border-blue-900 w-full lg:w-[75%] xl:w-[80%] min-[1450px]:w-[83%] h-full'>

                {/* header */}
                <header className={`border--2 border-gray-800 w-full max-[321px]:h-[5rem] ${height_} flex justify-end items-center ${padding_} `}>
                    <div className='max-[1024px]:w-full flex max-[1024px]:justify-end  items-center'>
                        <div className='border-[1px] border-[#0797B7] rounded-xl px-3 flex justify-around items-center overflow-hidden'>
                            <IoSearchOutline className='text-[#0797B7] max-[310px]:hidden max-[340px]:text-4xl text-2xl me-1' />
                            <Field placeHolder={'Search Any Influencer Or Anything'} bgColor={'#fff'} className={'outline--2 outline--[#0797B7] text-sm placeholder:text-[#0797B7]'} onChange={(e) => updateSearchQuery(e.target.value)} value={searchQuery} />
                            <MdKeyboardVoice className='text-[#0797B7] max-[310px]:hidden max-[340px]:text-4xl text-2xl ms-2' />
                        </div>
                        <div className='flex'>
                            <div className='border-[1px] border-[#0797B7] cursor-pointer rounded-xl min-w-[3rem] h-[3rem] ms-4 flex justify-center items-center relative'>
                                <IoMdNotifications className='text-[#0797B7] text-2xl' />
                                <p className='bg-[red] text-[0.5rem] text-[#fff] rounded-full w-[1rem] h-[1rem] flex justify-center items-center absolute top-[0.35rem] right-[0.35rem] animate-pulse'>
                                    1
                                </p>
                            </div>
                            <div onClick={toggleShow} className='border-[1px] border-[#0797B7] cursor-pointer rounded-xl min-w-[3rem] h-[3rem] ms-4 flex justify-center items-center lg:hidden relative transition-all duration-500 z-[100]'>
                                {show === false ? <HiMiniBars3BottomLeft className='text-[#0797B7] text-2xl transition-all duration-500' /> : <HiMiniBars3 className='text-[#0797B7] text-2xl transition-all duration-500' />}
                            </div>
                        </div>
                    </div>
                </header>

                {/* main area */}
                <aside className={`${styles.aside_area_height} border--2 border-yellow-500 w-full pb-4  overflow-hidden overflow-y-auto ${padding_} header_box_shodow`} style={{ height: `calc(100vh - (7rem)) ` }}>
                    <div className='pt-8'>
                        {children}
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default DashboardLayout;