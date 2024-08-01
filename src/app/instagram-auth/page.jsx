"use client"
import { useInstaAuthQuery } from '@/redux/auth/auth'
import { getCookie } from 'cookies-next'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
    const router = useRouter()

    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')

    const searchParams = useSearchParams()

    const userId = searchParams.get("userId")
    const accessToken = searchParams.get("accessToken")
    const influencerID = userData?.user?._id



    // const getInstaAuth = useInstaAuthQuery({
    //     userId: userId, accessToken: accessToken, influencerID: userData?.user?._id
    // }, { skip: !userId || !accessToken || !userData?.user?._id })

    const getInstaData = async () => {
        try {

            const res = await fetch(`https://localhost:5000/auth/insta-token?userId=${userId}&accessToken=${accessToken}&loginId=${influencerID}`)
            const data = res.json();
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     getInstaData()
    // }, [])

    // console.log(getInstaAuth.data)

    return (
        <div className='flex h-screen justify-center items-center gap-16'>
            <p onClick={() => router("/dashboard")}>Back To Dashboard</p>
            <p onClick={getInstaData}>✅</p>
        </div>
    )
}

export default page
