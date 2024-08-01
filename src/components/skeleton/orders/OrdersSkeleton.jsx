import React from 'react'

const OrdersSkeleton = () => {
    return (
        <div className='flex flex-col items-start border--2 border-blue-900 bg-[#0797b714] w-full mt-4 py-4 px-6 rounded-xl'>

            <div className='flex justify-between w-full'>
                <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-10 border-gray-200 border-4 rounded-lg dark:bg-gray-700 w-96 mb-4"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded-sm dark:bg-gray-700 w-32 mb-4"></div>
            </div>

            <div role="status" className=" p-4 w-full rounded  animate-pulse md:p-6 ">
                <div className='flex items-center justify-between w-full'>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                </div>
                <div className='h-1 w-full bg-gray-200 mb-4'></div>
                {Array.from({ length: 10 }).map((_item, i) => (

                    <div className='flex items-center justify-between w-full' key={i}>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                    </div>
                ))}


                <div className='flex items-center justify-between'>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                    <div className='flex items-center gap-4'>
                        <div className="h-8 bg-gray-200 rounded-lg dark:bg-gray-700 w-16 mb-2"></div>
                        <div className="h-8 bg-gray-200 rounded-lg dark:bg-gray-700 w-16 mb-2"></div>

                    </div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default OrdersSkeleton
