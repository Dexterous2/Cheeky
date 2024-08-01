'use client'

import { BalanceCard, CardBarChart, CardPieChart, PaymentCard, TableCard } from "@/components/card/card";
import styles from "@/app/wallet/wallet.module.scss"
import DashboardLayout from "@/layout/DashboardLayout";
import { useEffect, useState } from "react";
import { MdWallet } from "react-icons/md";
import { DataTablePri } from "@/components/dataTable/DataTable";
import Stripe from "@/components/stripe/Stripe";
import { useValidateCardQuery } from "@/redux/card/Card";
import { getCookie } from "cookies-next";
import { useTransactionHistoryQuery } from "@/redux/order/order";

const Page = () => {
    const [isAddCard, setIsAddCard] = useState(false)
    const [getTransactionHistory, setGetTransactionHistory] = useState([])
    const [color, setColor] = useState({
        color_1: 'text-white',
        color_2: 'text-[#0797B7]'
    });

    // Get User Detail From Cookies
    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')
    const userID = userData?.user?._id
    const role = userData?.user?.role[0]

    const data_1 = [
        {
            name: 'Jan',
            pv: 2400,
        },
        {
            name: 'Feb',
            pv: 1398,
        },
        {
            name: 'Mar',
            pv: 9800,
        },
        {
            name: 'Apr',
            pv: 3908,
        },
        {
            name: 'May',
            pv: 4800,
        },
        {
            name: 'Jun',
            pv: 3800,
        },
        {
            name: 'Jul',
            pv: 4300,
        },
    ];

    const table_data = [
        {
            id: "m5gr84i9",
            name: "Sunrise Agency",
            category: "Recived",
            amount: 316,
            transaction_date: '6 Feb 2023',
            status: "Done",
        },
        {
            id: "3u1reuv4",
            name: "You",
            category: "Withdrawn",
            amount: 242,
            transaction_date: '6 Feb 2023',
            status: "Done",
        },
        {
            id: "derv1ws0",
            name: "Sunrise Agency",
            category: "Recived",
            amount: 837,
            transaction_date: '6 Feb 2023',
            status: "Done",
        },
        {
            id: "5kma53ae",
            name: "Sunrise Agency",
            category: "Recived",
            amount: 874,
            transaction_date: '6 Feb 2023',
            status: "Done",
        },
        {
            id: "bhqecj4p",
            name: "Sunrise Agency",
            category: "Recived",
            amount: 721,
            transaction_date: '6 Feb 2023',
            status: "Done",
        },
    ]

    const getTransactions = useTransactionHistoryQuery(userID, { skip: !userID })
    const getTransactionsData = getTransactions?.data?.history

    const createObject = (data) => {
        const customData = data?.map((item) => {
            return {
                id: item?._id,
                name: role === "brandOwner" ? item?.influencerID?.name : item?.brandID?.name,
                category: item?.serviceID?.title,
                amount: item?.serviceID?.price,
                receive_amount: item?.amount,
                transaction_date: item?.created,
                status: item?.status[0],
            }
        })

        setGetTransactionHistory(customData)
    }

    useEffect(() => {
        createObject(getTransactionsData)
    }, [getTransactions])

    return (
        <DashboardLayout>

            <div className="border--2 border-red-800 w-full flex justify-between items-center mb-3">
                <h2 className="text-[#0797B7]"> Wallet </h2>
            </div>

            <div className="border--2 border-red-900 w-full max-md:h-fit h-[125vh] grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-7 relative">

                <div className="border--2 border-green-800 h--[55rem] md:col-span-2 lg:col-span-2 xl:col-span-2 p-2 flex flex-col gap-3">
                    <BalanceCard
                        class={'bg-[#F0FFFF]'}
                        icon_1={<MdWallet className={`text-5xl ${color.color_2}`} />}
                        title='Balance'
                        h4_1='Availabel Balance'
                        h2_={'$ 41,500'}
                        h4_2='Last Updated just now'
                    />
                    <CardPieChart class={''} sub_title='January, 21' title='Total Cashflow' />
                </div>

                <div className={`${styles.pay_card} border--2 border-blue-800 md:col-span-4 lg:col-span-3 xl:col-span-5 max-md:overflow-visible overflow-hidden overflow-y-auto p-1`}>
                    <PaymentCard class={'bg-[#F0FFFF]'} setIsAddCard={setIsAddCard} />
                    <div className="my-3">
                        <CardBarChart class={''} title='Overview' data_1={data_1} />
                    </div>
                    <TableCard class={'bg-[#F0FFFF]'} title='Transaction History' table_data={getTransactionHistory || []} />
                </div>
                {isAddCard && <Stripe setIsAddCard={setIsAddCard} />}
            </div>

        </DashboardLayout>
    );
}

export default Page;