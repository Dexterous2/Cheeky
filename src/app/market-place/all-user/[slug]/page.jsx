'use client'

import styles from '@/app/market-place/marketplace.module.scss'
import { FaStar } from "react-icons/fa";

import { FaFilter } from "react-icons/fa";
import DashboardLayout from "@/layout/DashboardLayout";
import ProfileCard from '@/components/profileCard/ProfileCard';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useGetMarketPlaceUserQuery } from '@/redux/marketPlaceSlice/MarketPlace';
import { getCookie } from 'cookies-next';
import ProfileCardSkeleton from '@/components/skeleton/profileCard/ProfileCardSkeleton';

const Page = () => {

    const { slug } = useParams();

    const slugArray = slug.split('');

    slugArray[0] = slugArray[0].toUpperCase();

    const completePathName = slugArray.join('');

    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')

    const userID = userData?.user?._id

    const { data: marketPlaceUsers } = useGetMarketPlaceUserQuery({
        catName: completePathName,
        userID: userID
    }, { skip: !completePathName || !userID });


    const router = useRouter()

    return (
        <DashboardLayout>
            <div className="border--2 border-green-500 w-full h-fit">
                <div className="border--2 border-red-800 w-full flex justify-between items-center">
                    <h2 className="text-[#0797B7]"> MarketPlace </h2>
                    <div className='border-[1px] bg-[#0797B7] cursor-pointer rounded-xl min-w-[3rem] h-[3rem] ms-4 flex justify-center items-center relative'>
                        <FaFilter className='text-[white] text-2xl' />
                    </div>
                </div>

                <div className={`${styles.card_wrap} flex flex-col items-center border--2 border-blue-900 bg-[#0797b714] w-full my-4  py-4 px-6 rounded-xl`}>

                    <div className="flex flex-wrap justify-between items-center w-full">
                        <div className="flex flex-col justify-center">
                            <h3 className="text-[#0797B7] text-xl font-semibold"> {completePathName} </h3>
                            <p className="text-slate-400"> Engage in collaborative endeavors with renowned musicians. </p>
                        </div>
                    </div>

                    <div className='border--2 border-orange-900 xl:w--[72vw] lg:w--[68vw] w-full h--[20rem] mt-4 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-3'>

                        {marketPlaceUsers?.length > 0 ?
                            marketPlaceUsers?.map((p_c_d) => {
                                return (
                                    <div className={`${styles.slide}`} key={p_c_d._id}>
                                        <ProfileCard img={p_c_d.profileImg}
                                            title={p_c_d.name}
                                            desc={p_c_d.description}
                                            icon={p_c_d.icon}
                                            rating={4}
                                            slug={completePathName}
                                            id={p_c_d?._id}
                                            onClick={() => router.push(`/market-place/${completePathName?.toLocaleLowerCase().split(" ").join("-")}/${p_c_d._id}`)} isRequested={p_c_d.isRequested}
                                            pathName={completePathName} />
                                    </div>
                                )
                            })
                            :
                            Array.from({ length: 10 }, (_, index) => index + 1).map((item, i) => (
                                <div key={i}>
                                    <ProfileCardSkeleton />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Page;