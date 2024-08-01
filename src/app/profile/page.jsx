'use client'
import Button from '@/components/button/Button'
import { DataTablePri } from '@/components/dataTable/DataTable'
import DashboardLayout from '@/layout/DashboardLayout'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { columns_profile } from '@/components/dataTable/columns';
import { getCookie } from 'cookies-next';
import { MdEditSquare } from "react-icons/md";
import Edit_profile_modal from '@/components/Edit-profile-modal/Edit_profile_modal'
import Alerts from '@/components/Alerts/Alerts'
import ResponseToast from '@/components/toast/Toast'
import { useGetSpecificUserQuery, useUpdateUserMutation } from '@/redux/user/user'
import { FaInstagramSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import ConnectInsta from '@/components/connectInsta/ConnectInsta'
import { useDeleteInstaMutation, useGetInstaQuery } from '@/redux/instaAuth/instaAuth'
import { useGetCollaborationsQuery } from '@/redux/order/order'

const page = () => {
    const [instaData, setInstaData] = useState()
    const [profileImg, setProfileImg] = useState('');
    const [collabObject, setCollabObject] = useState([])
    const [isEditModal, setIsEditModal] = useState(false)
    const [connectInsta, setConnectInsta] = useState(false)

    const router = useRouter()

    // Get User Detail From Cookies
    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')

    const userID = userData?.user?._id
    const role = userData?.user?.role[0]

    // Get User Data API
    const userDataAPI = useGetSpecificUserQuery(userID, { skip: !userID })

    const userName = userDataAPI?.data?.user?.name
    const Description = userDataAPI?.data?.user?.description
    const userProfileImg = userDataAPI?.data?.user?.profileImg
    const categories = userDataAPI?.data?.user?.categories

    // Handle Profile Images Picker
    const profileImgHandler = (e) => {
        setProfileImg(e.target.files[0]);
        if (profileImg !== null) {
            return setIsShow(true)
        }
    };

    const [isShow, setIsShow] = useState(false)

    // Handle Modal
    const closeModal = () => {
        setIsShow(false);
        setProfileImg('');
    }

    // Update profile
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const updateProfileImg = async () => {
        try {
            const formdata = new FormData();
            formdata.append('imageURL', profileImg);
            const res = await updateUser({ userID: userData?.user?._id, data: formdata })
            ResponseToast({ res });

            setIsShow(false);
        } catch (error) {
            ResponseToast({ message: "Internal Server Error" })
        }
    }

    // Delete Instagram Data API
    const [removeInsta] = useDeleteInstaMutation()

    // Handle Remove Instagram
    const handleRemoveInsta = async () => {
        try {
            const res = await removeInsta(userID)
            ResponseToast({ res });

            if (!res.error) {
                setInstaData()
                return fetchData();
            }
        } catch (error) {
            ResponseToast({ message: "Internal Server Error" })
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

    // Get Past Collabrations
    const getCollaborationsAPI = useGetCollaborationsQuery(userID, { skip: !userID })
    const getCollaborationsData = getCollaborationsAPI?.data?.orders

    const createObject = (data) => {
        const customData = data?.map((item) => {
            return {
                id: item?._id,
                name: item?.brandID?.name,
                rated: 316,
                Service_Name: item?.serviceID?.title,
                reach: '6000+',
                collaboration_date: item?.createdAt?.split("T")[0]?.replaceAll("-", "/"),
                status: item?.status[0],
            }
        })

        setCollabObject(customData)
    }

    useEffect(() => {
        createObject(getCollaborationsData)
    }, [getCollaborationsAPI])


    return (
        <DashboardLayout>
            <div className='flex h-full flex-col gap-8'>
                <div className=' text-white-color '>
                    <h1 className='text-primary-color'>Profile</h1>
                </div>
                <div className='bg-primary-color rounded-xl flex items-center max-[1280px]:justify-end justify-between max-[1280px]:gap-4 p-8 max-[1280px]:flex-col '>
                    <div className='flex gap-8 xl:items-center items-start  xl:flex-row flex-col w-full'>
                        <div className='relative'>
                            {/*  */}
                            <Image src={userProfileImg || "/image/main/dummyProfile.webp"} width={170} height={160} className='rounded-full  border-2 border-white w-[12rem] h-[12rem]' alt='no img found' />

                            <input type='file' className='hidden' id='profileImg' onChange={profileImgHandler} />

                            <label htmlFor='profileImg'>
                                <div role='button' className='absolute top-0 right-3 bg-white-color p-3 rounded-full'>
                                    <MdEditSquare className='text-primary-color' />
                                </div>
                            </label>

                        </div>
                        <div className='md:w-[40rem] flex flex-col gap-4 w-full'>
                            <h3 className='text-white'>{userName}</h3>
                            <div className=' gap-4 text-primary-color profile_grid'>
                                <span className='cursor-pointer py-2 px-3 bg-white-color rounded-3xl text-nowrap'>
                                    {instaData?.totalFollowers ? instaData?.totalFollowers : "0"} Followers</span>
                            </div>
                            {role === "Influencer" &&
                                <div className='text-white flex flex-col gap-2'>
                                    <p className='font-semibold'>Categories:</p>
                                    <span className='flex gap-4'>

                                        {categories?.map((item, i) => (
                                            <span className='flex items-center gap-2 cursor-pointer py-2 px-3 bg-white-color rounded-3xl text-nowrap text-primary-color w-[9rem] text-center justify-center' key={i}>
                                                {item}
                                            </span>
                                        ))}
                                    </span>

                                </div>
                            }
                            <span className='text-white flex flex-col gap-2'>
                                <p className='font-semibold'>Description:</p>
                                <p>{Description}</p>
                            </span>
                        </div>
                    </div>
                    <div className='max-[1280px]:w-full w-auto flex gap-4 flex-col md:justify-end justify-center items-end'>
                        <Button name={"Edit Profile"} bgcolor={"bg-white-color"} pClass={"text-primary-color"} style={{ width: "11rem" }}
                            onClick={() => setIsEditModal(true)}
                        />
                        {instaData ?
                            <Button name={"Remove"} icon={<FaInstagram size={20} />} pClass={"text-primary-color"} bgcolor={"bg-white-color"} style={{
                                width: "11rem",
                            }}
                                onClick={handleRemoveInsta}
                            />
                            :
                            <Button name={"Connect"} icon={<FaInstagram size={20} />} pClass={"text-primary-color"} bgcolor={"bg-white-color"} style={{
                                width: "11rem",
                            }}
                                onClick={() => setConnectInsta(true)}
                            />
                        }
                    </div>
                </div>
                <div className='w-full rounded-xl bg-[#d3fdfd] flex flex-col gap-0'>

                    <div className='rounded-xl overflow-x-auto p-4'>
                        {/* <ProfileTable /> */}
                        <DataTablePri
                            className={`text-[#0797B7] hover:bg-[#0797B7] hover:text-[#fff] border-none`}
                            header_row_className={`border-none`}
                            table_head_className={`text-[#0797B7] border-none`}
                            table_title={'Past Collaborations'}
                            columns={columns_profile}
                            data={collabObject || []}
                        />
                    </div>

                </div>
                {isEditModal &&
                    <Edit_profile_modal closeModal={() => setIsEditModal(false)} userDataAPI={userDataAPI} />
                }
                {connectInsta &&
                    <ConnectInsta closeModal={() => setConnectInsta(false)} fetchInsta={fetchData} />
                }
                <Alerts
                    isShow={isShow}
                    closeModal={closeModal}
                    isIcons={profileImg !== '' && <Image src={URL.createObjectURL(profileImg)} width={170} height={160} className='rounded-full border-2 border-white w-[12rem] h-[12rem] text-center' />}
                    onClick={updateProfileImg}
                    modaltext={'Are You Sure You Want To Update This Profile Picture?'}
                />


            </div>
        </DashboardLayout>
    )
}

export default page
