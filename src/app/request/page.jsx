"use client"
import RequestSkeleton from '@/components/skeleton/request/RequestSkeleton';
import ResponseToast from '@/components/toast/Toast';
import DashboardLayout from '@/layout/DashboardLayout'
import { useAcceptRequestMutation, useCancelRequestMutation, useGetRequestQuery } from '@/redux/connections/connections';
import { getCookie } from 'cookies-next';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaUserFriends } from 'react-icons/fa';
import { GrServices } from 'react-icons/gr';
import { IoMdClose } from "react-icons/io";
import { TiTick } from "react-icons/ti";

const page = () => {
    const router = useRouter()

    const handleNavigate = (id) => {
        router.push(`/chat/${id}`)
    }

    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')

    const userID = userData?.user?._id

    // Get request API
    const { data: getRequest, isLoading } = useGetRequestQuery(userID, { skip: !userID })

    // Accept Request API
    const [acceptRequest] = useAcceptRequestMutation()

    // Handle Accept Request API
    const handleAcceptRequest = async (brandID) => {
        try {
            const res = await acceptRequest({
                brandID: brandID,
                userID: userID
            })

            ResponseToast({ res })

        } catch (error) {
            ResponseToast({ message: "Error While Accepting Request" })
        }
    }

    // Cancel Request API
    const [cancelRequest] = useCancelRequestMutation()

    // Handle Accept Request API
    const handleCancelRequest = async (brandID) => {
        try {
            const res = await cancelRequest({
                brandID: brandID,
                userID: userID
            })

            ResponseToast({ res })

        } catch (error) {
            ResponseToast({ message: "Error While Deleting Request" })
        }
    }



    return (
        <DashboardLayout>
            <div>
                <div className='pb-8'>
                    <h1 className='text-primary-color'> Request </h1>
                </div>
                <div className='flex flex-col gap-2 overflow-y-auto xl:h-[73vh] h-[70vh] '>
                    {getRequest?.map((item, i) => (
                        <div className='flex justify-between p-4 bg-[#3f9fc847] rounded-xl text-white-color items-center gap-4 all_chat_div cursor-pointer ' key={i}>
                            <div className='flex items-center gap-4 '>
                                <Image src={item?.brandOwnerID?.profileImg !== "" ? item?.brandOwnerID?.profileImg : "/image/main/dummyProfile.webp"} alt="Request Img" width={50} height={50} className='rounded-full' />
                                <span>
                                    <h3 className='text-primary-color'>{item?.brandOwnerID?.name}</h3>
                                    {item?.brandOwnerID?.description !== "" ?
                                        <p className='text-gray-500'>{item?.brandOwnerID?.description}</p>
                                        :
                                        <p className='text-gray-500'>No Description Available</p>
                                    }
                                </span>
                            </div>
                            <div className='flex items-center'>
                                <TiTick className='bg-[#0797B7] text-white text-2xl text-nowrap p-1 rounded-full ms-2 active:scale-[0.95] transition-all' onClick={() => handleAcceptRequest(item?.brandOwnerID?._id)} />
                                <IoMdClose className='bg-[#0797B7] text-white text-2xl font-bold text-nowrap p-1 rounded-full ms-2 active:scale-[0.95] transition-all' onClick={() => handleCancelRequest(item?.brandOwnerID?._id)} />
                            </div>
                        </div>
                    ))}

                    {isLoading ?
                        Array.from({ length: 8 }, (_, index) => index + 1).map((item, i) => ((
                            <div key={i}>
                                <RequestSkeleton />
                            </div>
                        ))) : null}

                    {getRequest?.length === 0 ?
                        <div className="w-full h-[60vh] flex justify-center">
                            <span className="flex gap-3 items-center">
                                <FaUserFriends className="text-[10rem] text-gray-500 opacity-[0.3]" />
                                <h2 className="text-gray-500 text-nowrap opacity-[0.5]">No Request Yet</h2>
                            </span>
                        </div> : null
                    }
                </div>
            </div>
        </DashboardLayout>
    )
}

export default page
