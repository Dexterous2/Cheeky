"use client"
import Button from '@/components/button/Button'
import Field from '@/components/inputFIeld/Field'
import ResponseToast from '@/components/toast/Toast'
import AuthLayout from '@/layout/AuthLayout'
import { useLoginMutation } from '@/redux/auth/auth'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';

const page = () => {

    const router = useRouter()

    const [loginFields, setLoginFields] = useState({
        email: "",
        password: ""
    })

    const { email, password } = loginFields

    const handleLoginField = (e) => {
        setLoginFields({
            ...loginFields,
            [e.target.name]: e.target.value
        })
    }

    const [login, { isLoading }] = useLoginMutation()

    const handleLogin = async (e) => {
        try {
            e.preventDefault()

            const res = await login(loginFields)

            ResponseToast({ res: res })

            if (!res.error) {
                setCookie('cheeky', res?.data)
                if (res?.data?.user?.role?.[0] === "brandOwner") {
                    router.push('/market-place')
                } else if (res?.data?.user?.role?.[0] === "Influencer") {
                    router.push('/dashboard')
                } else {
                    router.push('/orders')

                }
            }

        } catch (error) {
            ResponseToast({ message: "Failed To Login" })
        }
    }

    return (
        <AuthLayout>
            <div className='border-2 border-white sm:px-8
            px-2 xl:py-16 py-8 flex flex-col items-center gap-16 rounded-xl text-white-color xl:w-[30rem] sm:w-[25rem] w-auto'>
                <h2 className='text-center'>Sign In to your Account</h2>
                <form className='flex flex-col gap-12 w-full' onSubmit={handleLogin}>
                    <div className='flex flex-col gap-8 '>
                        <Field type='email' name="email" value={email} onChange={handleLoginField} placeHolder="Enter your Email" />
                        <Field type='password' name="password" value={password} onChange={handleLoginField} placeHolder="Enter your Password" />
                        <div className='text-end '>
                            <p className='cursor-pointer' onClick={() => router.push("/forgot-password")}>Forgot Password?</p>
                        </div>
                    </div>
                    <div className='flex items-center w-full justify-center'>
                        <Button isLoading={isLoading} name={"Sign In"} style={{ width: "10rem", border: "2px solid" }} />
                    </div>
                </form>
                <div className='flex gap-1'>
                    <p>Don't have an account?</p>
                    <p className='font-semibold cursor-pointer' onClick={() => router.push("/sign-up")}>Sign Up</p>
                </div>
            </div>
        </AuthLayout>
    )
}

export default page;