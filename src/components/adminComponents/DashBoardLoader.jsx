import React from 'react'

const DashBoardLoader = ({ skeletonItems }) => {
    return (
        <div>
            <div className="grid sm:grid-cols-2 gap-5 lg:grid-cols-4">
                {skeletonItems?.map((_, index) => (
                    <div key={index} role="status" className="max-w-sm p-4 border-gray-200 rounded shadow animate-pulse md:p-6">
                        <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                ))}
            </div>
            <div className="grid gap-5 md:grid-cols-2">
            <div role="status" className="border-gray-200 rounded shadow animate-pulse md:p-6">
                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                </div>
                <span className="sr-only">Loading...</span>
            </div>
            <div role="status" className="border-gray-200 rounded shadow animate-pulse md:p-6">
                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                </div>
                <span className="sr-only">Loading...</span>
            </div>
            </div>
        </div>
    )
}

export default DashBoardLoader
