"use client"
import Button from '@/components/button/Button'
import Field from '@/components/inputFIeld/Field'
import ResponseToast from '@/components/toast/Toast'
import AuthLayout from '@/layout/AuthLayout'
import { useResetPassMutation } from '@/redux/auth/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const router = useRouter();

    const [resetPass, setResetPass] = useState({
        password: "",
        confirmPassword: ""
    });
    const [email, setEmail] = useState();

    const { password, confirmPassword } = resetPass

    const handleOnChange = (e) => {
        setResetPass({ ...resetPass, [e.target.name]: e.target.value })
    }


    const { userEmail } = history?.state;
    useEffect(() => {
        if (userEmail === '' || userEmail === undefined || userEmail === null) {
            return router.push('/forgot-password')
        } else {
            setEmail(userEmail)
        }
    }, [])


    const [ResetPass, { isLoading }] = useResetPassMutation();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await ResetPass({ email: email, password: password, confirmPassword: confirmPassword });
            ResponseToast({ res });
            if (!res.error) {
                router.push('/login')
            }
        } catch (error) {
            ResponseToast({ message: "Error while resetting password" })
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

                        <Field type='password' name='password' value={password} onChange={handleOnChange} placeHolder="Enter your Password" />

                        <Field type='password' name='confirmPassword' value={confirmPassword} onChange={handleOnChange} placeHolder="Enter your Password" />

                    </div>
                    <span className='flex items-center w-full justify-center'>
                        <Button isLoading={isLoading} name={"Continue"} style={{ width: "10rem", border: "2px solid" }} />
                    </span>
                </form>
            </div>
        </AuthLayout>
    )
}

export default page
