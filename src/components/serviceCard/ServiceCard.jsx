'use client'

import styles from "@/components/components.module.scss"
import { useRouter } from "next/navigation";
import Button from "../button/Button";
import { getCookie } from "cookies-next";

const ServiceCard = (props) => {

    const router = useRouter()

    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')
    const userID = userData?.user?._id
    const role = userData?.user?.role?.[0]

    return (
        <div className={`${styles.card} border-1 border-slate-500 p-3  bg-white flex flex-col justify-center items--center p--3 rounded-lg cursor-pointer`} onClick={() => router.push(`/services/single-service/${props.id}`)}>
            <img src={props.img} alt="img.png" className='w-full h-[15rem] object-cover rounded-lg' />
            <div className="py-3 gap-1">
                <h6 className='text-sm font-semibold text-[#0797b7] mb-2 bg-[#0797b75b] mt-1 w-fit p-1 px-2 rounded-md'> {props.serviceType} </h6>
                <h4 className='font-semibold w-fit '> {props.social_title} </h4>
                <p className='text-smtext-[#000] mb-1 bg--[#0797b75b] mt-1 w-fit p--1 px--2 rounded-md'> {props?.desc?.slice(0, 30)}... </p>
                <div className='flex justify-between items-center mb-3'>
                    <h4 className="text-sm font-semibold"> {props.dollar} $ </h4>
                    <span className="flex justify-center items-center">
                        {props.icon_1}
                        <span className="text-sm font-medium ms-1"> {props?.rate === undefined ? 0 : props.rate} </span>
                    </span>
                </div>
                <div className='flex justify-between items-center mb-3'>
                    <span className="flex justify-center items-center">
                        {props.icon_2}
                        <span className="text-xs text-[#828282] font-medium ms-1"> {props.location} </span>
                    </span>
                    <h4 className="text-xs text-[#828282] font-semibold"> {props.sale} Sold </h4>
                </div>
                {
                    role === 'brandOwner' ?
                        <Button name={"Visit Service"} /> : ""

                }
            </div>
        </div>
    );
}

export default ServiceCard;