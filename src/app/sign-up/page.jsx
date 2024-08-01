"use client"
import Button from '@/components/button/Button'
import Field from '@/components/inputFIeld/Field'
import ResponseToast from '@/components/toast/Toast'
import AuthLayout from '@/layout/AuthLayout'
import { useBrandOwnerRegisterMutation, useInfluencerRegisterMutation } from '@/redux/auth/auth'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [checkSignup, setCheckSignup] = useState(true)

    const [signupField, setSignupField] = useState({
        name: "",
        email: "",
        address: "",
        zipCode: "",
        password: "",
        cpass: "",
        role: checkSignup ? "brandOwner" : "Influencer"
    })


    const { name, email, password, cpass, address, zipCode, role } = signupField

    useEffect(() => {
        setSignupField((prevSignupField) => ({
            ...prevSignupField,
            role: checkSignup ? "brandOwner" : "Influencer",
        }));
    }, [checkSignup]);

    const handleOnChange = (e) => {
        setSignupField((prevSignupField) => ({ ...prevSignupField, [e.target.name]: e.target.value }))
    }

    const [influencerRegister, { isLoading }] = useInfluencerRegisterMutation();

    const handleInfluencer = async (e) => {
        e.preventDefault();
        try {
            if (password !== cpass) {
                return ResponseToast({ message: "Passwords do not match" })
            }
            const res = await influencerRegister(signupField);
            ResponseToast({ res: res });
            if (!res.error) {
                setCookie('cheeky', res?.data)
                router.push('/dashboard');
            }
        } catch (error) {
            ResponseToast({ message: "Error while creating your account" });
        }
    }

    const [brandOwnerRegister, { isLoading: BrandOwnerLoading }] = useBrandOwnerRegisterMutation()

    const handleBrandOwner = async (e) => {
        e.preventDefault();
        try {
            if (password !== cpass) {
                return ResponseToast({ message: "Passwords do not match" })
            }

            const res = await brandOwnerRegister(signupField);

            ResponseToast({ res: res });

            if (!res.error) {
                setCookie('cheeky', res?.data)
                router.push('/dashboard');
            }
        } catch (error) {
            ResponseToast({ message: "Error while creating your account" });

        }
    }


    const router = useRouter()
    return (
        <AuthLayout>
            <div className='border-2 border-white sm:px-8 px-2 xl:py-12 py-8 flex flex-col items-center gap-8 rounded-xl text-white-color xl:w-[30rem] sm:w-[25rem] w-auto'>
                <h2 className='text-center'>Sign Up to your Account</h2>
                <form onSubmit={role === "brandOwner" ? handleBrandOwner : handleInfluencer} className='flex flex-col gap-8 w-full' >
                    <div className='flex gap-4 items-center justify-center'>
                        <span className='flex gap-2'>
                            <input
                                type='radio'
                                checked={checkSignup}
                                onChange={() => setCheckSignup(true)}
                            />
                            <p>BrandOwner</p>
                        </span>
                        <span className='flex gap-2'>
                            <input
                                type='radio'
                                checked={!checkSignup}
                                onChange={() => setCheckSignup(false)}
                            />
                            <p>Influencer</p>
                        </span>
                    </div>

                    <div className='flex flex-col gap-4 '>
                        <Field name="name" value={name} onChange={handleOnChange} type='text' placeHolder="Full Name" />
                        <Field name="email" value={email} onChange={handleOnChange} type='email' placeHolder="Email" />
                        {role === "brandOwner" &&
                            <>
                                <Field name="address" value={address} onChange={handleOnChange} type='text' placeHolder="Address" />
                                <Field name="zipCode" value={zipCode} onChange={handleOnChange} type='number' placeHolder="Zipcode" />
                            </>
                        }
                        <Field name="password" value={password} onChange={handleOnChange} type='password' placeHolder="Password" />
                        <Field name="cpass" value={cpass} onChange={handleOnChange} type='password' placeHolder="Re-Enter Password" />
                    </div>
                    <span className='flex items-center w-full justify-center'>
                        <Button name={"Sign Up"} style={{ width: "10rem", border: "2px solid" }} isLoading={isLoading || BrandOwnerLoading} />
                    </span>

                </form>
                <span className='flex gap-1'>
                    <p>Already have an account?</p>
                    <p className='font-semibold cursor-pointer' onClick={() => router.push("/login")}>Login</p>
                </span>
            </div>
        </AuthLayout>
    )
}

export default page
