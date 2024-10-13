import React from 'react'

const TextLoading = ({ counts }) => {
    return (
        <div className='container'>
            <div className="w-full">
                {counts?.map((count, i) => (
                    <div key={i} className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                ))}
            </div>
            <span className="sr-only">Loading...</span>
        </div >
    )
}

export default TextLoading