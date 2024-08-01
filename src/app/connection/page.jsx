"use client"
import DashboardLayout from '@/layout/DashboardLayout'
import { useDeleteConnectionMutation, useGetConnectionQuery } from '@/redux/connections/connections';
import { getCookie } from 'cookies-next';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";
import { HiUserRemove } from "react-icons/hi";
import RequestSkeleton from '@/components/skeleton/request/RequestSkeleton';
import ResponseToast from '@/components/toast/Toast';
import { FaUserFriends } from "react-icons/fa";
import { useSearch } from '@/lib/SearchContext';

const page = () => {
    const router = useRouter()

    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')

    const { searchQuery } = useSearch();

    const brandID = userData?.user?._id

    const role = userData?.user?.role?.[0]

    const { data, isLoading } = useGetConnectionQuery(brandID, { skip: !brandID })

    const getChatsData = data

    // Removing friend API 
    const [removeFriend] = useDeleteConnectionMutation()

    // Handle removing friend 
    const handleRemoveConnection = async (userID) => {
        try {
            if (role !== "Influencer") {

                const res = await removeFriend({
                    brandID,
                    userID
                })

                ResponseToast({ res })
            } else {
                const res = await removeFriend({
                    brandID: userID,
                    userID: brandID
                })

                ResponseToast({ res })
            }

        } catch (error) {
            ResponseToast({ message: "Error removing Friend" })
        }
    }


    const handleNavigate = (id, connectionID) => {
        router.push(`/chat/${id}/${connectionID}`)
    }

    return (
        <DashboardLayout>
            <div>
                <div className='pb-8'>
                    <h1 className='text-primary-color'> Connection Request </h1>
                </div>
                <div className='flex flex-col gap-2 overflow-y-auto xl:h-[73vh] h-[70vh] '>
                    {getChatsData
                        ?.filter(item => {
                            const name = role === "Influencer" ? item?.brandOwnerID?.name : item?.userID?.name;
                            if (typeof name === 'string') {
                                return role === "Influencer" ? name.toLowerCase().includes(searchQuery?.toLowerCase()) : name.toLowerCase().includes(searchQuery?.toLowerCase());
                            }
                            return false;
                        })?.map((item, i) => {

                            let data;
                            if (role === "Influencer") {
                                data = item?.brandOwnerID
                            } else {
                                data = item?.userID
                            }
                            return <div className='flex justify-between p-4 bg-[#3f9fc847] rounded-xl text-white-color items-center gap-4 all_chat_div ' key={data?._id}>
                                <div className='flex items-center gap-4 '>
                                    <Image src={data?.profileImg !== "" ? data.profileImg : "/image/main/dummyProfile.webp"} alt="" width={50} height={50} className='rounded-full h-[50px] w-[50px]' />
                                    <span>
                                        <h3 className='text-primary-color'>{data?.name}</h3>
                                        {item?.lastMessage !== null ?
                                            <p className='text-gray-500'>{item?.lastMessage?.message}</p>
                                            :
                                            <p className='text-gray-500'>Start conversation with this user</p>
                                        }

                                    </span>
                                </div>
                                <div className='flex items-center gap-2'>

                                    <span className='bg-[#0797B7] text-white text-nowrap w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ' onClick={() => handleNavigate(data?._id, item?._id)}>
                                        <IoChatboxEllipses size={16} className='flex' />
                                    </span>

                                    <span className='bg-[#0797B7] text-white text-nowrap w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ' onClick={() => handleRemoveConnection(data?._id)}>
                                        <HiUserRemove size={16} className='flex' />

                                    </span>
                                </div>
                            </div>

                        })}

                    {isLoading && Array.from({ length: 8 }, (_, index) => index + 1).map((item, i) => ((
                        <div key={i}>
                            <RequestSkeleton />
                        </div>
                    )))}

                    {
                        getChatsData?.length === 0 ?
                            <div className="w-full h-[60vh] flex justify-center">
                                <span className="flex gap-3 items-center">
                                    <FaUserFriends className="text-[10rem] text-gray-500 opacity-[0.3]" />

                                    <h2 className="text-gray-500 text-nowrap opacity-[0.3]">No Connection Yet</h2>
                                </span>
                            </div> : null
                    }

                </div>
            </div>
        </DashboardLayout>
    )
}

export default page
