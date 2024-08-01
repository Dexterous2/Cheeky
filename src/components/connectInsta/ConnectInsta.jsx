import React, { useState } from 'react'
import { GiCancel } from "react-icons/gi";
import Field from '../inputFIeld/Field';
import Button from '../button/Button';
import { getCookie } from 'cookies-next';
import ResponseToast from '../toast/Toast';
import { useAddInstaMutation } from '@/redux/instaAuth/instaAuth';

const ConnectInsta = ({ closeModal, fetchInsta }) => {
    // Get User Detail From Cookies
    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')

    const userID = userData?.user?._id

    // State For Update User
    const [userDetail, setUserDetail] = useState({
        name: "",
        password: "",
    })

    const { name, password } = userDetail

    const handleUserDetail = (e) => {
        setUserDetail({ ...userDetail, [e.target.name]: e.target.value })
    }

    // Update profile
    const [addInsta, { isLoading }] = useAddInstaMutation();

    const handleAddInsta = async () => {
        try {
            const res = await addInsta({
                data: {
                    influencerID: userID,
                    username: userDetail.name,
                    password: userDetail.password,
                }
            })
            ResponseToast({ res });

            if (!res.error) {
                fetchInsta();
                closeModal();
            }
        } catch (error) {
            ResponseToast({ message: "Internal Server Error" })

        }
    }
    return (
        <div className='fixed top-0 left-0 z-[300] h-screen w-full bg-[#ffffff96] flex justify-center items-center'>
            <div className='relative w-[400px] bg-primary-color text-white rounded-xl p-4 flex flex-col gap-4 xl:h-auto h-[95vh] overflow-auto'>
                <div className='flex justify-end w-full'>
                    <GiCancel size={32} className='cursor-pointer active:scale-[.98]' onClick={closeModal} />
                </div>
                <div className='flex justify-center items-center'>
                    <h2>Connect Your Instagram</h2>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <img src="./image/main/instagram.svg" alt="" />
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-3 justify-center'>
                        <span className='flex flex-col gap-2 w-full'>
                            <label>Username</label>
                            <Field type='text' placeHolder="Enter Your Instagram Username" name="name" value={name} onChange={handleUserDetail} />
                        </span>
                        <span className='flex flex-col gap-2 w-full'>
                            <label>Password</label>
                            <Field type='password' placeHolder="Enter Your Password" name="password" value={password} onChange={handleUserDetail} />
                        </span>
                    </div>

                    <Button name={"connect"} bgcolor={"bg-white"} pClass={"text-primary-color"} onClick={handleAddInsta} isLoading={isLoading} />
                </div>
            </div>
        </div>
    )
}

export default ConnectInsta
