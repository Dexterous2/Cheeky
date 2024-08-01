'use client'

import Card, { BalanceCard, CardAreaChart, CardChart } from "@/components/card/card";
import DashboardLayout from "@/layout/DashboardLayout";
import { useState } from "react";

import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaRankingStar } from "react-icons/fa6";
import { FaHandshakeAngle } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { MdWallet } from "react-icons/md";
import { useGetUserWalletQuery } from "@/redux/wallet/Wallet";
import { getCookie } from "cookies-next";

const Page = () => {

    const [color, setColor] = useState({
        color_1: 'text-white',
        color_2: 'text-[#0797B7]'
    });

    const months = [
        'Six month', 'Three month', 'One month'
    ]

    const data_1 = [
        {
            name: 'Jan',
            pv: 10,
            amt: 24,
        },
        {
            name: 'Feb',
            pv: 13,
            amt: 22,
        },
        {
            name: 'Mar',
            pv: 98,
            amt: 100,
        },
        {
            name: 'Apr',
            pv: 39,
            amt: 200,
        },
        {
            name: 'May',
            pv: 48,
            amt: 300,
        },
        {
            name: 'Jun',
            pv: 38,
            amt: 500,
        },
        {
            name: 'Jul',
            pv: 43,
            amt: 1000,
        },
    ];

    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')
    const userID = userData?.user?._id

    const { data } = useGetUserWalletQuery(userID, {
        skip: !userID
    })
    return (
        <DashboardLayout>
            <div className="border--2 border-green-500 w-full h-fit">

                <div className="border--2 border-teal-950 w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-7">

                    <div className="border--2 border-red-900 h--[20rem] order-2 lg:order-1 col-span-1 lg:col-span-1 xl:col-span-2 p-2 flex flex-col gap-3 justify-between">

                        <Card
                            class={''}
                            icon_1={<FaMoneyCheckDollar className='text-7xl text-white' />}
                            h2_={data?.totalEarnings[0] === undefined || data?.totalEarnings[0] === null ? "$ 0" : `$ ${data?.totalEarnings[0]} `}
                            icon_2={<IoMdArrowDropup className='text-2xl text-green-400' />}
                            span={'12%'}
                            p={'Total Earning'}
                            color={color.color_1}
                        />

                        <Card
                            class={'bg-[#F0FFFF]'}
                            icon_1={<FaRankingStar className={`text-7xl ${color.color_2}`} />}
                            h2_={'102'}
                            icon_2={<IoMdArrowDropdown className='text-2xl text-red-400' />}
                            span={'12%'}
                            p={'Ranked at music category'}
                            color={color.color_2}
                        />

                    </div>

                    <div className="border--2 border-red-900 h-[20rem] md:h-[25rem] xl:h-full order-3 lg:order-2 md:col-span-2 lg:col-span-3 p-2">
                        <CardChart class={'bg-[#F0FFFF]'} title={'Earning'} months={months} data_1={data_1} />
                    </div>

                    <div className="border--2 border-red-900 h--[20rem] order-2 lg:order-1 col-span-1 xl:order-2 lg:col-span-1 xl:col-span-2 p-2 flex flex-col gap-3 justify-between">

                        <Card
                            class={'bg-[#F0FFFF]'}
                            icon_1={<FaHandshakeAngle className={`text-7xl ${color.color_2}`} />}
                            h2_={'500'}
                            icon_2={<IoMdArrowDropdown className='text-2xl text-red-400' />}
                            span={'12%'}
                            p={'Successful Collaborations'}
                            color={color.color_2}
                        />

                        <Card
                            class={''}
                            icon_1={<FaStar className='text-7xl text-white' />}
                            h2_={'4.7'}
                            icon_2={''}
                            span={''}
                            p={'Overall Rated'}
                            color={color.color_1}
                        />

                    </div>

                </div>

            </div>

            <div className="border--2 border-green-500 w-full h-fit">
                <div className="border--2 border-teal-950 w-full  grid grid-cols-1 lg:grid-cols-5  xl:grid-cols-7 h-[20rem] md:h-[30rem]">

                    <div className="border--2 border-red-900 h-[20rem] md:h-[30rem] xl:h-full sm:col-span-7 p-2">
                        <CardAreaChart class={''} title={'Performance Analysis'} months={months} data_1={data_1} />
                    </div>

                    <div className="border--2 border-b-red-600 w-full md:col-span-2 lg:grid-cols-2 xl:col-span-2 p-2">
                        {/* <BalanceCard
                            class={'bg-[#F0FFFF]'}
                            icon_1={<MdWallet className={`text-5xl ${color.color_2}`} />}
                            title='Balance'
                            h4_1='Availabel Balance'
                            h2_={" 4000"}
                            h4_2='Last Updated just now'
                        /> */}
                    </div>

                </div>
            </div>

        </DashboardLayout>
    );
}

export default Page;