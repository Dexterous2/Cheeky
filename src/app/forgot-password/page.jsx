"use client"
import Button from '@/components/button/Button'
import Field from '@/components/inputFIeld/Field'
import ResponseToast from '@/components/toast/Toast'
import AuthLayout from '@/layout/AuthLayout'
import { useForgetPassMutation } from '@/redux/auth/auth'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const router = useRouter();

    const [email, setEmail] = useState();

    const [forgetPass, { isLoading }] = useForgetPassMutation();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await forgetPass({ email });
            ResponseToast({ res: res });
            if (!res.error) {
                history.pushState({ userEmail: email }, "", "/verify-otp")
                router.push('/verify-otp')
            }
        } catch (error) {
            ResponseToast({ message: "Try Again" });
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
                <form className='flex flex-col gap-12 w-full' onSubmit={handleClick} >
                    <div className='flex flex-col gap-8 '>

                        <Field type='email' onChange={(e) => setEmail(e.target.value)} placeHolder="Enter your Email" />

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
