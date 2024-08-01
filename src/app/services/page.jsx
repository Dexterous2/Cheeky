'use client'
import Button from "@/components/button/Button";
import DashboardLayout from "@/layout/DashboardLayout";
import { FaPlus } from "react-icons/fa6";
import { useGetProductsQuery } from '@/redux/products/product';
import { getCookie } from 'cookies-next';
import { useState } from 'react';
import AddServices from '@/components/AddServices/AddServices';
import { GrServices } from "react-icons/gr";
import ServiceCard from "@/components/serviceCard/ServiceCard";
import { MdStars } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import ProfileCardSkeleton from "@/components/skeleton/profileCard/ProfileCardSkeleton";
const Page = () => {
    const [isAddServices, setIsServices] = useState(false)

    // Get User Detail From Cookies
    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')

    const { data: getProducts, isLoading } = useGetProductsQuery({ userID: userData?.user?._id }, { skip: !userData?.user?._id });

    return (
        <DashboardLayout>
            <div className="border--2 border-red-900 w-full">
                <div className="border--2 border-red-800 w-full flex max-[350px]:flex-col max-[350px]:gap-3 justify-between items-center flex-wrap">
                    <h2 className="text-[#0797B7] min-w-fit max-[350px]:mt-3"> My Services </h2>
                    <div className='border-[1px] bg-[#0797B7] cursor-pointer rounded-xl min-w-[3rem] max-sm:h-[2rem] h-[3rem] ms-4 flex justify-center items-center relative'>
                        <Button name={'Add Services'} icon={<FaPlus className="text-white" />} className={'max-sm:py-2 max-sm:px-2'} onClick={() => setIsServices(true)} />
                    </div>
                </div>

                <div className={`flex flex-col items-center border--2 border-blue-900 bg--[#0797b714] w-full my-4`}>

                    <div className='border--2 border-orange-900 xl:w--[72vw] lg:w--[68vw] w-full h--[20rem] mt-4 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-3'>

                        {getProducts?.length !== 0 ?
                            getProducts?.map((item) => {
                                return (
                                    <div key={item?._id}>
                                        <ServiceCard
                                            id={item?._id}
                                            img={item?.thumbnail}
                                            serviceType={item?.serviceType}
                                            social_title={item?.title}
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
                            : null}
                        {isLoading ?
                            Array.from({ length: 10 }, (_, index) => index + 1).map((_item, i) => (
                                <div key={i}>

                                    <ProfileCardSkeleton />
                                </div>
                            ))
                            : null}
                    </div>
                </div>
                {getProducts?.length === 0 ?
                    <div className="w-full h-[60vh] flex justify-center">

                        <span className="flex gap-3 items-center">
                            <GrServices className="text-[10rem] text-gray-500" />
                            <h2 className="text-gray-500 text-nowrap">No Service Available</h2>
                        </span>
                    </div> : null
                }
                {isAddServices && <AddServices closeModal={() => setIsServices(false)} editModal={isAddServices} modalHeading={"Add Service"} />}
            </div>
        </DashboardLayout>
    );
}

export default Page;