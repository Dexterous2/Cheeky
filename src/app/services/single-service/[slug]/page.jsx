'use client'

import styles from '@/app/market-place/marketplace.module.scss'
import AddServices from '@/components/AddServices/AddServices';
import Alerts from '@/components/Alerts/Alerts';
import Button from "@/components/button/Button";
import EditServiceSkeleton from '@/components/skeleton/editService/EditServiceSkeleton';
import MarketPlaceSkeleton from '@/components/skeleton/marketPlace/marketPlaceSkeleton';
import ResponseToast from '@/components/toast/Toast';
import DashboardLayout from "@/layout/DashboardLayout";
import { useInitiateOrderMutation } from '@/redux/order/order';
import { useDeleteProductMutation, useGetSingleProductsQuery } from '@/redux/products/product';
import { getCookie } from 'cookies-next';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdStars } from "react-icons/md";

const Page = () => {
    const [isShow, setIsShow] = useState(false)

    const params = useParams();
    const router = useRouter()

    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')

    const productID = params.slug;
    const userID = userData?.user?._id;
    const role = userData?.user?.role[0];

    const { data, isLoading } = useGetSingleProductsQuery({ userID, productID }, {
        skip: !userID || !productID
    })

    const numberOfStars = data?.products?.rating === undefined ? 1 : data?.products?.rating;
    const stars = Array.from({ length: numberOfStars }, (_, index) => (
        <MdStars key={index} className="text-[#0797b7] text-lg" />
    ));

    const [editModal, setEditModal] = useState(false);

    // Delete product
    const [deleteProducts] = useDeleteProductMutation()

    // Handle Delete API
    const handleDeleteAPI = async () => {
        try {
            const res = await deleteProducts({
                productID: productID,
                userID: userID,
            })

            if (!res.error) {
                setIsShow(false)
                router.push("/services")
                ResponseToast({ res })
            }
        } catch (error) {
            ResponseToast({ message: "Error deleting product" })
        }
    }

    // Handle Initiate service API
    const [initiateService, { isLoading: initiateOrderLoading }] = useInitiateOrderMutation()

    // Handle Initiate Service
    const handleInitiateService = async () => {
        try {
            const res = await initiateService({
                brandID: userID,
                userID: data?.products?.userID?._id,
                serviceID: params?.slug
            })

            ResponseToast({ res })

        } catch (error) {
            ResponseToast({ message: "Error Ordring Service " })
        }
    }

    return (
        <DashboardLayout>
            <div className="border--2 border-red-900 w-full">
                <div className="border--2 border-red-800 w-full flex max-sm:flex-col max-sm:gap-3 max-sm:justify-center justify-between items-center flex-wrap">
                    <h2 className="text-[#0797B7] min-w-fit max-[430px]:mt-3">
                        {isLoading ?
                            "Services" :
                            role === "Influencer" ? "My Services" : (data?.products?.userID?.name + " Service")
                        }

                    </h2>
                    {role === "Influencer" &&
                        <div className="flex justify-between max-sm:w-full max-sm:py-2">
                            <div className='border-[1px] bg-[#0797B7] cursor-pointer rounded-xl min-w-[3rem] max-sm:h-[2rem] h-[3rem] max-sm:ms-0 ms-4 flex justify-center items-center relative'>
                                <Button name={'Edit Product'} onClick={() => setEditModal(true)} icon={<FaPlus className="text-white" />} className={'max-sm:py-2 max-sm:px-2 sm:px-3'} />
                            </div>
                            <div className='border-[1px] bg-[#0797B7] cursor-pointer rounded-xl min-w-[3rem] max-sm:h-[2rem] h-[3rem] max-sm:ms-0 ms-4 flex justify-center items-center relative'>
                                <Button name={'Delete Product'} icon={<MdDelete className="text-white" />} className={'max-sm:py-2 max-sm:px-2 sm:px-3'} onClick={() => setIsShow(true)} />
                            </div>
                        </div>
                    }
                </div>

                <div className={`flex flex-col items-center border--2 border-blue-900 bg--[#0797b714] w-full my-4 mb-[5rem]  `}>

                    <div className='border--2 border-orange-900 xl:w--[72vw] lg:w--[68vw] w-full h--[20rem] mt-4 flex justify-center items-center gap-3'>


                        {isLoading ? <EditServiceSkeleton /> : <div className={`${styles.card} border-1 border-slate-500 bg-white max-md:w-full w-[60%] flex flex-col justify-center items-center p-4 rounded-lg cursor-pointer box_shadow_sec overflow-hidden`}>

                            <img src={data?.products?.thumbnail} alt="img.png" className='w-full h-[25rem] border border-[rgb(191 187 187)] rounded-lg object-fill' />

                            <div className='w-full flex justify-between items-center flex-wrap mt-6 mb-4'>
                                <h6 className='text-sm font-semibold text-[#0797b7] mb-2 bg-[#0797b75b] mt-1 min-w-fit p-1 px--2 rounded-md'> {data?.products?.serviceType} </h6>

                                <div className='w-fit flex justify-center items-center flex-wrap max-sm:min-w-full max-sm:justify-between max-sm:mt-3 '>

                                    <span className="flex justify-center items-center max-[320px]:min-w-fit">
                                        <FaMapMarkerAlt className="text-[#0797b7] text-base" />
                                        <span className="text-xs text-[#828282] font-medium ms-1">  {data?.products?.location} </span>
                                    </span>

                                    <span className="flex justify-center items-center ms-3">
                                        <span className="text-sm font-medium ms-1 me-1">
                                            {
                                                data?.products?.rating === undefined ? 0 : data?.products?.rating
                                            }
                                        </span>

                                        {stars}
                                    </span>

                                </div>
                            </div>

                            <div className="w-full flex flex-col p--3 gap--1 ">

                                <h4 className='text-xl font-semibold text-[#000] mb--1 bg--[#0797b75b] mt--1 w-fit p--1 px--2 rounded-md'> {data?.products?.title} </h4>
                                <h4 className="text-[#0797b7] text-lg font-bold my-1"> ${data?.products?.price} </h4>
                                <h4 className="text-base text-[#0797b7] font-semibold"> {data?.products?.sold === undefined ? 0 : data?.products?.sold} Sold </h4>
                                <h4 className="text-base text-[#828282] font-semibold mt-4"> Product Description: </h4>
                                <p className='font-medium text-[#828282] mb--1 bg--[#0797b75b] mt--1 w-fit p--1 px--2 rounded-md'>
                                    {data?.products?.desc}
                                </p>

                            </div>


                            <div className='w-full pt-4'>
                                {
                                    role === 'brandOwner' ?
                                        data?.orderStatus === "Pending" ?
                                            <Button name={"Cancel Service"} /> : <Button name={"Order Service"} isLoading={initiateOrderLoading} isLoadingName={"Creating Your Order"} onClick={handleInitiateService} /> : ""

                                }
                            </div>
                        </div>


                        }
                    </div>

                </div>

                {
                    editModal === true ?
                        <AddServices editModal={editModal} closeModal={() => setEditModal(false)} updateData={data} modalHeading={"Edit Service"} />
                        :
                        ""
                }
                <Alerts isShow={isShow} closeModal={() => setIsShow(false)} onClick={handleDeleteAPI} modaltext={'Are You Sure You Want To Delete This Post?'} />
            </div>
        </DashboardLayout>
    );
}

export default Page;