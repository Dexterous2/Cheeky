"use client"
import Button from '@/components/button/Button'
import Field from '@/components/inputFIeld/Field'
import style from './otp.module.css'
import AuthLayout from '@/layout/AuthLayout'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useOtpVerifyMutation } from '@/redux/auth/auth'
import ResponseToast from '@/components/toast/Toast'

const page = () => {


    const router = useRouter()

    const inputRefs = useRef([]);

    const [otp, setOtp] = useState("");

    const [email, setEmail] = useState();


    const { userEmail } = history?.state;

    const [otpVerify, { isLoading }] = useOtpVerifyMutation();


    useEffect(() => {
        if (userEmail === '' || userEmail === undefined || userEmail === null) {
            return router.push('/forgot-password')
        } else {
            setEmail(userEmail)
        }
    }, [])

    const handleOtpChange = (event, index) => {
        const { value } = event.target;

        if (isNaN(value) || value.length > 1) {
            return;
        }

        const otpArray = [...otp];
        otpArray[index] = value;
        const newOtp = otpArray.join("").slice(0, 6);
        setOtp(newOtp);

        if (value !== "") {
            const nextIndex = index + 1;
            if (inputRefs.current[nextIndex]) {
                inputRefs.current[nextIndex].focus();
            }
        }
    };

    const handleNavigate = async (e) => {
        e.preventDefault();
        try {
            const res = await otpVerify({ email: email, OtpCode: Number(otp) });
            ResponseToast({ res });
            if (!res.error) {
                history.pushState({ userEmail: email }, "", "/reset-password")
                router.push("/reset-password")
            }
        } catch (error) {
            ResponseToast({ message: "Error Verifing OTP" });

        }
    }

    return (
        <AuthLayout>
            <div className='border-2 border-white sm:px-8
    px-2 xl:py-16 py-8 flex flex-col items-center gap-16 rounded-xl text-white-color xl:w-[30rem] sm:w-[25rem] w-auto'>
                <div className='flex flex-col gap-3 items-center justify-center'>
                    <h2 className='text-center'>Trouble logging in?</h2>
                    <p className='text-center'>Enter your email or username and we'll send you a code to get back into your account.</p>
                </div>
                <form className='flex flex-col gap-12 w-full' onSubmit={handleNavigate} >
                    <div className={`flex justify-between xl:gap-0 gap-1 ${style.otp_Fields}`}>
                        {[...Array(6)].map((_, index) => (
                            <input
                                className="xl:w-16 xl:h-14 w-14 h-12 rounded-lg text-black text-center outline-none"
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                key={index + 1}
                                type="number"
                                value={otp[index] || ""}
                                onChange={(event) => handleOtpChange(event, index)}
                                maxLength={6}
                            />
                        ))}

                    </div>
                    <span className='flex items-center w-full justify-center'>
                        <Button isLoading={isLoading} name={"Continue"} style={{ width: "10rem", border: "2px solid" }} />
                    </span>
                </form>
                <span className='flex gap-1'>
                    <p>Remember your password?</p>
                    <p className='font-semibold cursor-pointer' onClick={() => router.back()}>Go Back</p>
                </span>
            </div>
        </AuthLayout>
    )
}

export default page
