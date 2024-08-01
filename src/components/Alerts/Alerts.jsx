import React, { useState } from 'react'
import Button from '../button/Button'

const Alerts = ({ isShow, isIcons, modaltext, closeModal, onClick }) => {
    const [isAlertModal, setIsAlertModal] = useState(false)

    const handleCancle = () => {
        setIsAlertModal(false)
        isShow = false
    }

    return (
        <>

            {
                isShow &&
                <div id="deleteModal" aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal h-screen bg-[#00000057]">
                    <div className="relative p-4 w-full max-w-md h-full md:h-auto left-2/4 top-2/4 -translate-x-[50%] -translate-y-[50%]">
                        <div className="relative p-4 text-center bg-primary-color rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            <button type="button" className="bg-white text-primary-color absolute top-2.5 right-2.5  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="deleteModal" onClick={() => closeModal(false)}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className='flex justify-center items-center py-3'>
                                {isIcons ? isIcons : <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>}
                            </div>
                            <p className="mb-4 text-white dark:text-gray-300">{modaltext ? modaltext : "Are you sure you want to delete this item?"}</p>
                            <div className="flex justify-center items-center space-x-4">
                                {/* <button data-modal-toggle="deleteModal" type="button" onClick={closeModal} className="py-2 px-3 text-sm font-medium text-red-500 bg-white rounded-lg border border-gray-200 ">
                                    No, cancel
                                </button> */}
                                <Button onClick={closeModal} mainClass={"py-2 px-3 text-sm font-medium text-red-500 bg-white rounded-lg border border-gray-200 "} name={'No, cancel'} />
                                <button type="submit" className="py-2 px-3 text-sm font-medium text-center  bg-white-color rounded-lg  text-primary-color   " onClick={onClick}>
                                    Yes, I'm sure
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Alerts
