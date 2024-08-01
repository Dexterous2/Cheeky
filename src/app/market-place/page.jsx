'use client'

import styles from '@/app/market-place/marketplace.module.scss'
import Button from "@/components/button/Button";


import { FaFilter, FaUserFriends } from "react-icons/fa";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { breakpoints } from "@/lib/SwiperBreakPoints";

import DashboardLayout from "@/layout/DashboardLayout";
import ProfileCard from '@/components/profileCard/ProfileCard';
import { useRouter } from 'next/navigation';
import { useGetMarketPlaceQuery } from '@/redux/marketPlaceSlice/MarketPlace';
import ResponseToast from '@/components/toast/Toast';
import { useCancelRequestMutation, useSendRequestMutation } from '@/redux/connections/connections';
import { getCookie } from 'cookies-next';
import ProfileCardSkeleton from '@/components/skeleton/profileCard/ProfileCardSkeleton';
import MarketPlaceSkeleton from '@/components/skeleton/marketPlace/marketPlaceSkeleton';


const Page = () => {

    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')

    const BrandOwnerID = userData?.user?._id

    const role = userData?.user?.role[0]

    const getMarketPlace = useGetMarketPlaceQuery({ userID: BrandOwnerID }, { skip: !BrandOwnerID });
    const marketPlaceLoading = getMarketPlace?.isLoading

    const router = useRouter();

    return (
        <DashboardLayout>
            <div className="border--2 border-green-500 w-full h-fit">
                <div className="border--2 border-red-800 w-full flex justify-between items-center">
                    <h2 className="text-[#0797B7]"> MarketPlace </h2>
                    <div className='border-[1px] bg-[#0797B7] cursor-pointer rounded-xl min-w-[3rem] h-[3rem] ms-4 flex justify-center items-center relative'>
                        <FaFilter className='text-[white] text-2xl' />
                    </div>
                </div>
                {!marketPlaceLoading ?
                    getMarketPlace?.data && Object.keys(getMarketPlace?.data)?.map((category, i) => (
                        <div className={`${styles.card_wrap} flex flex-col items-center border--2 border-blue-900 bg-[#0797b714] w-full mt-4 py-4 px-6 rounded-xl`} key={i}>

                            <div className="flex flex-wrap justify-between items-center w-full mb-4">
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-[#0797B7] text-xl font-semibold"> {category} </h3>
                                    <p className="text-slate-400"> Engage in collaborative endeavors with renowned musicians. </p>
                                </div>
                                <div className='max-sm:w-full max-sm:mt-3'>
                                    <Button name={'View All'} className={'w-[8.8rem] bg-[#0797B7]'} onClick={() => router.push(`/market-place/all-user/${category.toLocaleLowerCase()}`)} />
                                </div>
                            </div>
                            <Swiper
                                breakpoints={breakpoints}
                                pagination={{
                                    clickable: true,
                                }}
                                className={`mySwiper border--2 border-teal-900 w-full h-[${role === "brandOwner" ? "30rem" : "27rem"}]`}
                            >
                                {getMarketPlace?.data[category]?.length > 0 ?
                                    getMarketPlace?.data[category]?.map((user, index) => (
                                        <div className='border--2 border-orange-900  w-full mt-4 ' key={index}>
                                            <SwiperSlide className={`${styles.slide} `} >
                                                <ProfileCard
                                                    onClick={() => router.push(`/market-place/${category?.toLocaleLowerCase().split(" ").join("-")}/${user._id}`)}
                                                    img={user.profileImg}
                                                    title={user.name}
                                                    desc={user.description}
                                                    rating={5}
                                                    slug={category}
                                                    id={user?._id}
                                                    isConnection={user.isConnection}
                                                    isRequested={user.isRequested}
                                                />
                                            </SwiperSlide>
                                        </div>
                                    ))
                                    :
                                    Array.from({ length: 10 }, (_, index) => index + 1).map((item, i) => (
                                        <div key={i}>
                                            <SwiperSlide className={`${styles.slide}`}>
                                                <ProfileCardSkeleton />
                                            </SwiperSlide>
                                        </div>
                                    ))
                                }
                            </Swiper>
                        </div>
                    )) :
                    <div className='flex flex-col gap-3'>
                        <MarketPlaceSkeleton />
                        <MarketPlaceSkeleton />
                        <MarketPlaceSkeleton />
                    </div>
                }
                {getMarketPlace?.data && Object.keys(getMarketPlace?.data)?.length <= 0 &&
                    <div className="w-full h-[60vh] flex justify-center">
                        <span className="flex gap-3 items-center">
                            <FaUserFriends className="text-[10rem] text-gray-500 opacity-[0.3]" />

                            <h2 className="text-gray-500 text-nowrap opacity-[0.3]">No Influencer Available Now</h2>
                        </span>
                    </div>
                }
            </div>
        </DashboardLayout>
    );
}

export default Page;