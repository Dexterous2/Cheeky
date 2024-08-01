"use client"
import DashboardLayout from '@/layout/DashboardLayout'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {

    const dummyData = [
        {
            id: 1,
            name: "John Deo",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            id: 2,
            name: "John Deo",
            desc: "Vestibulum euismod bibendum nulla, ut vulputate arcu dignissim eget.",
        },
        {
            id: 3,
            name: "John Deo",
            desc: "Sed vestibulum suscipit eros, vel vehicula arcu lobortis vel.",
        },
        {
            id: 4,
            name: "John Deo",
            desc: "Cras in metus a odio aliquam volutpat. Ut a est nec odio euismod rhoncus nec eu massa.",
        },
        {
            id: 5,
            name: "John Deo",
            desc: "Aliquam erat volutpat. Nulla facilisi. In hac habitasse platea dictumst.",
        },
        {
            id: 6,
            name: "John Deo",
            desc: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
        },
        {
            id: 7,
            name: "John Deo",
            desc: "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
        },
        {
            id: 8,
            name: "John Deo",
            desc: "Donec id elit non mi porta gravida at eget metus.",
        },
        {
            id: 9,
            name: "John Deo",
            desc: "Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
        },
        {
            id: 10,
            name: "John Deo",
            desc: "Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
        },
        // Add more objects if needed
    ];

    const router = useRouter()

    const handleNavigate = (id) => {
        router.push(`/chat/${id}`)
    }

    return (
        <DashboardLayout>
            <div>
                <div className='pb-8'>
                    <h1 className='text-primary-color'>Chats</h1>
                </div>
                <div className='flex flex-col gap-2 overflow-y-auto xl:h-[73vh] h-[70vh] '>
                    {dummyData?.map((item, i) => (
                        <div className='flex justify-between p-4 bg-[#3f9fc847] rounded-xl text-white-color items-center gap-4 all_chat_div cursor-pointer active:scale-[0.99] transition-all' onClick={() => handleNavigate(item?.id)}>
                            <div className='flex items-center gap-4 '>
                                <Image src="/image/dummy/profileImg.png" alt="" width={50} height={50} className='rounded-full' />
                                <span>
                                    <h3 className='text-primary-color'>{item?.name}</h3>
                                    <p className='text-gray-500'>{item?.desc}</p>
                                </span>
                            </div>
                            <div>
                                <p className='text-gray-500 text-nowrap'>Seen 14:17</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default page
