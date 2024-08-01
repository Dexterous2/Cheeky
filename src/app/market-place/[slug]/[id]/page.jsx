"use client"
import Button from '@/components/button/Button';
import ServiceCard from '@/components/serviceCard/ServiceCard';
import ProfileCardSkeleton from '@/components/skeleton/profileCard/ProfileCardSkeleton';
import DashboardLayout from '@/layout/DashboardLayout'
import { useGetSingleUserOfQuery } from '@/redux/marketPlaceSlice/MarketPlace';
import { useGetProductsQuery } from '@/redux/products/product';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { FaUsers } from "react-icons/fa";
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GrServices } from 'react-icons/gr';
import { MdStars } from 'react-icons/md';
import { useCancelRequestMutation, useSendRequestMutation } from '@/redux/connections/connections';
import ResponseToast from '@/components/toast/Toast';

const page = () => {

    const [instaData, setInstaData] = useState()

    const params = useParams()

    const category = params.slug.charAt(0).toUpperCase() + params.slug?.slice(1)

    const userID = params?.id

    const router = useRouter()

    // Get User Detail From Cookies
    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')
    const brandID = userData?.user?._id
    const role = userData?.user?.role?.[0]

    // Get Single User Detail From API
    const getSignleUser = useGetSingleUserOfQuery({ brandID, userID, category }, { skip: !userID || !category || !brandID });

    const singleUser = getSignleUser?.data
    const SingleUserloading = getSignleUser?.isLoading


    const { data: getProducts, isLoading } = useGetProductsQuery({ userID: params?.id });

    // handle send request
    const [sendRequest, { isLoading: sendRequestLoading }] = useSendRequestMutation()

    const handleSendRequest = async () => {
        try {

            const res = await sendRequest({
                brandID: brandID,
                userID: userID
            })

            if (!res.error) {
                getSignleUser.refetch()
            }

            ResponseToast({ res });
        } catch (error) {
            ResponseToast({ message: "Error While Sending Request" })
        }
    }

    // Cancel Request API
    const [cancelRequest, { isLoading: cancelLoading }] = useCancelRequestMutation()

    // Handle Accept Request API
    const handleCancelRequest = async () => {
        try {
            const res = await cancelRequest({
                brandID: brandID,
                userID: userID
            })

            if (!res.error) {
                getSignleUser.refetch()
            }

            ResponseToast({ res })

        } catch (error) {
            ResponseToast({ message: "Error While Deleting Request" })
        }
    }

    // Handle Get Instagram Data
    const fetchData = async () => {
        try {
            const res = await fetch(`http://localhost:5000/get-insta-profile/${userID}`);
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await res.json();
            setInstaData(data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // Get Instagram Data API
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <DashboardLayout>

            <div className='flex h-full flex-col'>
                <div className=' text-white-color pb-4'>

                    <h1 className='text-primary-color'>Profile</h1>
                </div>
                <div className='bg-primary-color rounded-xl flex items-center max-[1280px]:justify-end justify-between max-[1280px]:gap-4 p-8 max-[1280px]:flex-col '>
                    <div className='flex gap-8 items-center md:flex-row flex-col w-full'>
                        <img src={singleUser?.user?.profileImg} width={170} height={160} className='rounded-full  border-2 border-white w-[12rem] h-[12rem]' />
                        <div className='md:w-[40rem] flex flex-col gap-4 w-full'>
                            <h3 className='text-white'>{singleUser?.user?.name}</h3>
                            <span className='text-center text-primary-color cursor-pointer py-2 px-3 bg-white-color rounded-3xl text-nowrap flex items-center justify-center gap-2 w-fit'>
                                <FaUsers size={20} /> {instaData?.totalFollowers ? instaData?.totalFollowers : "46M"}</span>

                            <div className='flex flex-col gap-2 text-primary-color '>
                                <p className='font-semibold text-white'>Categories:</p>
                                < span className='profile_grid'>

                                    {
                                        singleUser?.user?.categories?.map((item, i) => (
                                            <span className='text-center cursor-pointer py-2 px-3 bg-white-color rounded-3xl text-nowrap min-w-[8rem]' key={i}>{item}</span>
                                        ))
                                    }
                                </span>


                            </div>
                            <span className='text-white flex flex-col gap-2 w-full'>
                                <p className='font-semibold'>Description:</p>
                                <p>{singleUser?.user?.description}</p>
                            </span>
                        </div>
                    </div>
                    <div className='max-[1280px]:w-full w-auto flex gap-3 flex-col md:justify-end justify-center'>

                        {SingleUserloading ? null :
                            role === "brandOwner" ?
                                <div className="flex flex-col gap-2">
                                    {
                                        !singleUser?.isConnection && !singleUser?.isRequested ?
                                            <Button name={'Send Request'}
                                                onClick={() => handleSendRequest(singleUser?.user?._id)} isLoading={sendRequestLoading} isLoadingName={"Sending"}
                                                bgcolor={"bg-white"}
                                                pClass={"text-primary-color text-nowrap"}
                                                loadingP={"text-primary-color text-nowrap"}

                                            />
                                            : !singleUser?.isConnection && singleUser?.isRequested ?
                                                <Button name={'Cancel Request'}
                                                    onClick={() => handleCancelRequest(singleUser?.user?._id)} isLoading={cancelLoading} isLoadingName={"Canceling Request"}
                                                    loadingP={"text-primary-color text-nowrap"}
                                                    bgcolor={"bg-white"}
                                                    pClass={"text-primary-color text-nowrap"}
                                                />
                                                :
                                                <Button name={'Chat'} onClick={() => router.push(`/chat/${singleUser?.user?._id}`)}
                                                    bgcolor={"bg-white"}
                                                    pClass={"text-primary-color text-nowrap"}
                                                />
                                    }

                                </div>
                                :
                                null
                        }

                    </div>
                </div>


                <h2 className='text-text-primary-color py-5'>
                    Services
                </h2>


                <div className={`flex flex-col items-center border--2 border-blue-900 bg--[#0797b714] w-full my-4`}>
                    <div className='border--2 border-orange-900 xl:w--[72vw] lg:w--[68vw] w-full h--[20rem] mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-4'>

                        {getProducts?.length > 0 &&
                            getProducts?.map((item) => {
                                return (
                                    <div key={item?._id}>
                                        <ServiceCard
                                            id={item?._id}
                                            img={item?.thumbnail}
                                            social_title={item?.title}
                                            serviceType={item?.serviceType}
                                            desc={item?.desc}
                                            dollar={item?.price}
                                            icon_1={<MdStars className="text-[#0797b7] text-lg" />}
                                            rate={item?.rate}
                                            icon_2={<FaMapMarkerAlt className="text-[#0797b7] text-base" />}
                                            location={item?.location}
                                            sale={item?.sale}
                                        />
                                    </div>
                                )
                            })
                        }
                        {isLoading &&
                            Array.from({ length: 3 }, (_, index) => index + 1).map((_item, i) => (
                                <div key={i}>
                                    <ProfileCardSkeleton />
                                </div>
                            ))
                        }
                    </div>
                </div>
                {getProducts?.length <= 0 &&
                    <div className="w-full h-[60vh] flex justify-center">

                        <span className="flex gap-3 items-center">
                            <GrServices className="text-[10rem] text-gray-500" />
                            <h2 className="text-gray-500 text-nowrap">No Service Available Of This User</h2>
                        </span>
                    </div>}
            </div>
        </DashboardLayout>
    )
}

export default page
