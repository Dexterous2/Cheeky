"use client"
import { TableCard } from '@/components/card/card'
import OrdersSkeleton from '@/components/skeleton/orders/OrdersSkeleton'
import ResponseToast from '@/components/toast/Toast'
import DashboardLayout from '@/layout/DashboardLayout'
import { useSearch } from '@/lib/SearchContext'
import { useCompleteOrderMutation, useGetOrdersQuery, useReleasePaymentMutation, useSendPaymentOrderMutation } from '@/redux/order/order'
import { getCookie } from 'cookies-next'
import React, { useEffect, useState } from 'react'
import { FaCartShopping } from 'react-icons/fa6'

const page = () => {
    const [orderData, setOrderData] = useState([])

    const { searchQuery } = useSearch();

    // Btn Css
    let isActive = "hover:cursor-pointer  active:scale-[0.95]"
    let isDisable = "hover:cursor-not-allowed active:scale-1"

    // Table Head
    const ordersHeader = [
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("title")}</div>
            ),
        }
        , {
            accessorKey: "orderedBy",
            header: "Ordered By",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("orderedBy")}</div>
            ),
        }

        , {
            accessorKey: "amount",
            header: () => <div className="text-right">Amount</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("amount"))
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount)

                return <div className="text-right font-medium">{formatted}</div>
            },
        }
        , {
            accessorKey: "transaction_date",
            header: () => <div className="text-center">Transaction Date</div>,
            cell: ({ row }) => (
                <div className="capitalize text-center">{row.getValue("transaction_date")}</div>
            ),
        }
        , {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <button className="capitalize ">{row.getValue("status")}</button>
            ),
        },
        , {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => (
                <>
                    <button className={`${(row?.original?.status === "Pending" && role !== "SuperAdmin") ? isActive :
                        (row?.original?.status === "In Progress" && role === "Influencer") ? isDisable :
                            (row?.original?.status === "Pending" && role === "brandOwner") ? isActive :
                                (row?.original?.status === "Completed" && role === "Influencer") ? isDisable :
                                    (row?.original?.status === "Completed" && role === "brandOwner") ? isDisable :
                                        (role === "SuperAdmin" && row?.original?.status !== "Completed") ? isDisable :
                                            (role !== "xyz" && row?.original?.status === "Paid") ? isDisable : isActive}
                    capitalize border border-[#0dc2eb] py-2 px-4 rounded-xl hover:border-white transition-all`}
                        onClick={
                            (row?.original?.status === "Pending" && role === "Influencer")

                                ? () => handleCancel(row?.original)
                                : (row?.original?.status === "Pending" && role === "brandOwner") ? () => handlePaynow(row?.original)
                                    : (role === "brandOwner" && row?.original?.status === "In Progress")
                                        ? () => handleComplete(row?.original)
                                        : (role === "SuperAdmin" && row?.original?.status === "Completed") ? () => handleReleasePayment(row?.original) :
                                            (role === "SuperAdmin" && row?.original?.status === "Pending") ? null : null
                        }

                    >{row.getValue("action")}</button>
                </>
            ),
        },

    ]

    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')

    const userID = userData?.user?._id
    const role = userData?.user?.role?.[0]

    const getOrders = useGetOrdersQuery(userID, { skip: !userID })
    const getOrderData = getOrders?.data?.orders
    const OrderDataLoading = getOrders?.isLoading

    const convertData = (originalData) => {
        const data = originalData?.map(item => {
            return {
                id: role === "Influencer" || role === "SuperAdmin" ? item?.brandID?._id : item?.influencerID?._id,
                InfluencerID: role === "SuperAdmin" ? item?.influencerID?._id : "",
                title: item?.serviceID?.title,
                orderedBy: item?.brandID?.name,
                amount: item?.serviceID?.price,
                transaction_date: new Date(item?.createdAt)?.toLocaleDateString('en-US'),
                status: item?.status[0],
                action: (role === "Influencer" && item?.status[0] === "Pending") ? "Cancel" :
                    (role === "brandOwner" && item?.status[0] === "Pending") ? "Pay now" :
                        (role === "SuperAdmin" && (item?.status[0] === "Pending" || item?.status[0] === "In Progress")) ? "Release Payment" :
                            (role === "Influencer" && item?.status[0] === "In Progress") ? "Cancel" :
                                (role === "brandOwner" && item?.status[0] === "In Progress") ? "Complete Now" :
                                    (role === "Influencer" && item?.status[0] === "Completed") ? "Order Completed" :
                                        (role === "brandOwner" && item?.status[0] === "Completed") ? "Completed" :
                                            (role === "SuperAdmin" && item?.status[0] === "Completed") ? "Release Payment" :
                                                (role !== "xyz" && item?.status[0] === "Paid") ? "Paid" : ""
            };
        });
        setOrderData(data)
    };

    useEffect(() => {
        convertData(getOrderData)
    }, [getOrders])

    // Paynow API
    const [payNow] = useSendPaymentOrderMutation()

    // Handle order paynow from  brandOwner
    const handlePaynow = async (id) => {
        try {
            const res = await payNow({
                brandID: userID,
                influencerID: id?.id
            })
            ResponseToast({ res })
        } catch (error) {
            ResponseToast({ message: "Error processing payment" })
        }
    }

    // Handle cancel order from Influencer
    const handleCancel = (id) => {
        try {
            console.log(id)
        } catch (error) {
            ResponseToast({ message: "Error processing payment" })
        }
    }

    // Complete Order API
    const [completeOrder] = useCompleteOrderMutation()

    // Handle cancel order from Influencer
    const handleComplete = async (id) => {
        try {
            const res = await completeOrder({
                brandID: userID,
                influencerID: id?.id
            })

            ResponseToast({ res })
        } catch (error) {
            ResponseToast({ message: "Error processing payment" })
        }
    }

    // Release Payment API
    const [releasePayment] = useReleasePaymentMutation()


    // Handle cancel order from Influencer
    const handleReleasePayment = async (id) => {
        try {
            const res = await releasePayment({
                brandID: id?.id,
                influencerID: id?.InfluencerID
            })

            ResponseToast({ res })
        } catch (error) {
            ResponseToast({ message: "Error processing payment" })
        }
    }

    return (
        <DashboardLayout>
            {OrderDataLoading ? <OrdersSkeleton /> :
                orderData === undefined || orderData?.length <= 0 ?
                    <div className="w-full h-[60vh] flex justify-center">
                        <span className="flex gap-3 items-center">
                            <FaCartShopping className="text-[10rem] text-gray-500 opacity-[0.3]" />
                            <h2 className="text-gray-500 text-nowrap opacity-[0.3]">No Oders Yet</h2>
                        </span>
                    </div>
                    :
                    <TableCard class={'bg-[#F0FFFF]'} title='Your current orders' table_data={orderData} tableHead={ordersHeader} />
            }
        </DashboardLayout>
    )
}

export default page
