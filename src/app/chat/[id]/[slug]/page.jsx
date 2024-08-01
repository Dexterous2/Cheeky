"use client"
import Field from '@/components/inputFIeld/Field'
import DashboardLayout from '@/layout/DashboardLayout'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import styles from "./singleChat.module.scss"
import { useGetMessageQuery, useSendMessageMutation } from '@/redux/chat/Chat'
import ResponseToast from '@/components/toast/Toast'
import { getCookie } from 'cookies-next'
import ChatSkeleton from '@/components/skeleton/chatSkeleton/ChatSkeleton'
import { useGetSpecificUserQuery } from '@/redux/user/user'
import { API_BASE_URL } from '@/utils/Config'
import { io } from "socket.io-client";


let socket;

const Endpoint = API_BASE_URL

function page() {
    const [message, SetMessage] = useState("")
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const [messageData, setMessageData] = useState([]);
    const [scrollUpBtn, setScrollUpBtn] = useState(false)

    // Getting Params ID
    const { id: chatID, slug: connectionID } = useParams()

    // Get User Data From Cookie
    const userData = getCookie('cheeky') ? JSON?.parse(getCookie('cheeky')) : getCookie('cheeky')
    const userID = userData?.user?._id
    const userProfileImg = userData?.user?.profileImg

    // Get Message API
    const { data, isLoading: getChatLoading } = useGetMessageQuery({
        senderID: userID,
        recieverID: chatID
    }, { skip: !userID || !chatID })

    const getMessage = data

    useEffect(() => {
        setMessageData(getMessage)
    }, [getMessage])

    // Connect sockets
    useEffect(() => {
        socket = io(Endpoint);
        socket.emit("setup", userData?.user);
        socket.on("connected", () => setSocketConnected(true));
        socket.emit("join chat", connectionID)
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
        // eslint-disable-next-line
    }, []);

    // Revieve messages sockets
    useEffect(() => {

        socket.on("message recieved", (newMessageRecieved) => {
            setMessageData((prevMessageData) => {
                const updatedMessageData = [...prevMessageData, newMessageRecieved];
                return updatedMessageData;
            });
        });

        return () => {
            socket.off("message recieved");
        };
    }, []);


    // Send Chat API    
    const [SendChat, { isLoading }] = useSendMessageMutation()

    // Handle Send Chat
    const handleSendChat = async (e) => {
        e.preventDefault()
        try {
            if (isLoading || message == "") {
                return
            }

            const res = await SendChat({
                senderID: userID,
                recieverID: chatID,
                data: { message: message }
            })

            if (!res.error) {
                socket.emit("new message", res?.data?.message);
                SetMessage('')
                setMessageData((prev) => [...prev, res?.data?.message])
            }
        } catch (error) {
            ResponseToast({ message: "Error sending message" })
        }
    }

    // Get User Detail API
    const { data: getUserDetail, isLoading: getUserLoading } = useGetSpecificUserQuery(chatID, { skip: !chatID })

    // Handle Scroll To bottom
    const containerRef = useRef();

    const scrollToBottom = () => {
        const container = containerRef.current;
        if (container || istyping) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    // Handle Scroll To Top
    const handleScroll = () => {
        const container = containerRef.current;
        const a = container.scrollTop + 800

        if (a < containerRef.current.scrollHeight) {
            setScrollUpBtn(true)
        } else if (a > containerRef.current.scrollHeight) {
            setScrollUpBtn(false)
        }
    };

    // Attach event listener for scroll
    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messageData, istyping]);

    // Handle typing Handler
    const typingHandler = (e) => {
        SetMessage(e.target.value);
        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", chatID);
        }

        setTimeout(() => {
            if (!typing) {
                socket.emit("stop typing", chatID);
                setTyping(false);
            }
        }, 3000);
    };

    return (
        <DashboardLayout>
            <div className={`${styles.chatHeight} flex flex-col justify-between h-[83vh] `}>
                <div className='flex justify-center items-center gap-6 lg:w-fit w-full p-5 rounded-lg' style={{ background: "rgba(7, 151, 183, 0.1)" }}>

                    <div>
                        <img src={getUserDetail?.user?.profileImg !== "" ? getUserDetail?.user?.profileImg : "/image/main/dummyProfile.webp"} className='lg:w-[100px] w-[100px] lg:h-[100px] h-[100px]  rounded-lg border-4 border-primary-color' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-text-primary-color'>
                            {getUserDetail?.user?.name}
                        </h1>
                        <h2>
                            {getUserDetail?.user?.role?.[0]}
                        </h2>
                    </div>

                </div>


                <div className={`${styles.chat} my-3 xl:h-[50vh] lg:h-[45vh] md:h-[70vh] max-[375px]:h-[45vh] h-[55vh] overflow-y-auto overflow-x-hidden lg:px-5 px-0 lg:py-10 py-0 chat-height`} ref={containerRef}>
                    {getChatLoading ?
                        Array.from({ length: 5 }, (_, index) => index + 1).map((_item, i) => (
                            <div key={i}>

                                <ChatSkeleton />
                            </div>))
                        :
                        messageData?.map((item, i) => (
                            <div key={i + 1} >
                                {
                                    item?.senderID !== userID ?
                                        <div div className={`flex gap-3 items-center lg:my-4 my-3`}>
                                            <img src={getUserDetail?.user?.profileImg !== "" ? getUserDetail?.user?.profileImg : "/image/main/dummyProfile.webp"} className='lg:block hidden border-2 rounded-full border-primary-color w-12 h-12' />
                                            <p className={`bg-gray-200 p-4 rounded-tr-2xl rounded-br-2xl rounded-tl-2xl`}>
                                                {item?.message}
                                            </p>
                                        </div> :
                                        <div className={`flex gap-3 items-center justify-end mt-4`}>
                                            <p className={`bg-primary-color text-white p-4 rounded-tr-2xl rounded-bl-2xl rounded-tl-2xl`}>
                                                {item?.message}
                                            </p>
                                            {/* <img src={item?.senderData?.profileImg !== "" ? item?.senderData?.profileImg : "/image/main/dummyProfile.webp"} className='lg:block hidden border-2 rounded-full border-primary-color w-12 h-12' /> */}
                                            <img src={userProfileImg !== "" ? userProfileImg : "/image/main/dummyProfile.webp"} className='lg:block hidden border-2 rounded-full border-primary-color w-12 h-12' />
                                        </div >
                                }
                            </div >
                        ))
                    }

                    {
                        istyping ? <div div className={`flex gap-3 items-center lg:my-4 my-3`}>
                            <img src={getUserDetail?.user?.profileImg !== "" ? getUserDetail?.user?.profileImg : "/image/main/dummyProfile.webp"} className='lg:block hidden border-2 rounded-full border-primary-color w-12 h-12' />
                            <div className='flex gap-2 items-center bg-gray-200 p-4 rounded-xl '>

                                <span className={`w-3 h-3 rounded-full bg-gray-400 typing-animation`}>
                                </span>
                                <span className={`w-3 h-3 rounded-full bg-gray-400 typing-animation`}>
                                </span>
                                <span className={`w-3 h-3 rounded-full bg-gray-400 typing-animation`}>
                                </span>

                            </div>

                        </div> : ""
                    }

                </div >

                <div className='sm:static  flex mt-4 w-full items-center flex-col mb-4'>
                    {scrollUpBtn ?
                        <div className='bg-gray-300 w-full h-[2rem] rounded-tr-lg rounded-tl-lg justify-between flex items-center px-4'>
                            <p className='m-0 text-white'>You're Reviewing Older Messages</p>
                            <p className='m-0 text-white hover:font-semibold cursor-pointer transition-all' onClick={scrollToBottom}>Scroll To Bottom</p>

                        </div> : null
                    }
                    <form className='relative w-full ' onSubmit={handleSendChat}>
                        <Field className={'p-5'} placeHolder='Type Something...' value={message} onChange={typingHandler} />

                        <div className='absolute top-[50%] mr-2 -translate-y-[50%] right-0 p-2 bg-white-color rounded-full cursor-pointer active:scale-[0.95]' onClick={handleSendChat} >
                            <IoIosSend className='text-2xl text-primary-color' />
                        </div>

                    </form>
                </div>

            </div >

        </DashboardLayout >
    )
}

export default page