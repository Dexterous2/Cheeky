'use client'

import Button from "@/components/button/Button";
import { icons } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { IoMdStar } from "react-icons/io";
import { getCookie } from 'cookies-next';
import { useCancelRequestMutation, useSendRequestMutation } from "@/redux/connections/connections";
import ResponseToast from "../toast/Toast";
import { useGetMarketPlaceQuery, useGetMarketPlaceUserQuery } from "@/redux/marketPlaceSlice/MarketPlace";

const ProfileCard = (props) => {
    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')

    const role = userData?.user?.role[0];

    const BrandOwnerID = userData?.user?._id

    const router = useRouter()

    const pathName = usePathname()

    // Get All MarketPlaceUser 
    const getMarketPlace = useGetMarketPlaceQuery({ userID: BrandOwnerID }, { skip: !BrandOwnerID });

    // Get Specific MarketPlaceUser
    const specificMarketPlaceUsers = useGetMarketPlaceUserQuery({
        catName: props.pathName,
        userID: BrandOwnerID
    }, { skip: !props.pathName || !BrandOwnerID });


    // handle send request
    const [sendRequest, { isLoading: sendRequestLoading }] = useSendRequestMutation()

    const handleSendRequest = async (userID) => {
        try {

            const res = await sendRequest({
                brandID: BrandOwnerID,
                userID: userID
            })

            if (pathName === "/market-place") {
                await getMarketPlace.refetch()
            } else {
                await specificMarketPlaceUsers.refetch()
            }

            ResponseToast({ res });
        } catch (error) {
            ResponseToast({ message: "Error While Sending Request" })
        }
    }

    // Cancel Request API
    const [cancelRequest, { isLoading: cancelLoading }] = useCancelRequestMutation()

    // Handle Accept Request API
    const handleCancelRequest = async (userID) => {
        try {
            const res = await cancelRequest({
                brandID: BrandOwnerID,
                userID: userID
            })

            if (pathName === "/market-place") {
                await getMarketPlace.refetch()
            } else {
                await specificMarketPlaceUsers.refetch()
            }

            ResponseToast({ res })

        } catch (error) {
            ResponseToast({ message: "Error While Deleting Request" })
        }
    }

    return (
        <div className='bg-white flex flex-col justify-between items--center p-3 rounded-lg cursor-grab gap-2 h-full'>
            <div>
                <img src={props.img} alt="img.png" className='w-full h-[13rem]' />
                <div className="flex flex-col gap-2 pt-2">

                    <h3 className='text-[#0797B7] text-xl font-bold'> {props.title} </h3>
                    {props.desc !== "" ?
                        <p className='text-slate-500 mb-1'> {props.desc} </p> :
                        <p className='text-slate-500 mb-1'> No Description Available </p>
                    }
                    <div className='flex mb-3'>
                        {/* {props.icon.repeat(2)} */}
                        {Array.from({ length: props.rating }, (_, index) => index + 1).map((item, i) => (

                            <IoMdStar className="text-yellow-400 text-2xl" key={i} />

                        ))}

                    </div>
                </div>

            </div>

            {
                role === "brandOwner" ?
                    <div className="flex flex-col gap-2">
                        {

                            !props.isConnection && !props.isRequested ?
                                <Button name={'Send Request'} onClick={() => handleSendRequest(props?.id)} isLoading={sendRequestLoading} isLoadingName={"Sending"} />
                                : !props.isConnection && props.isRequested ?
                                    <Button name={'Cancel Request'} onClick={() => handleCancelRequest(props?.id)} isLoading={cancelLoading} isLoadingName={"Canceling Request"} />
                                    :
                                    <Button name={'Chat'} onClick={() => router.push(`/chat/${props?.id}`)} />
                        }
                        <Button name={'View Profile'} onClick={props.onClick} className={`bg-transparent border-2 border-[#0797B7]`} pClass={'text-[#0797B7]'} />
                    </div>
                    :
                    <div>
                        <Button name={'View Profile'} onClick={props.onClick} />
                    </div>
            }

        </div>
    );
}

export default ProfileCard;