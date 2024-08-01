import React from 'react'

const ChatSkeleton = () => {
    return (
        <div role="status" className=" py-4 rounded animate-pulse">
            <div>
                <div className='flex flex-col'>
                    <div className="flex items-center">
                        <svg className="w-12 h-12 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                        <div>
                            <div className="w-96 h-12 bg-gray-200 rounded-tr-2xl rounded-br-2xl rounded-tl-2xl dark:bg-gray-700"></div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-end mt-6'>
                    <div className="flex flex-row-reverse items-center gap-3">
                        <svg className="w-12 h-12 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                        <div>
                            <div className="w-96 h-12 bg-gray-200 rounded-tr-2xl rounded-bl-2xl rounded-tl-2xl dark:bg-gray-700"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChatSkeleton
