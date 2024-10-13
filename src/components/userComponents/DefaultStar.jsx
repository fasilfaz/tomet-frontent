import React from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import { AiOutlineStar } from "react-icons/ai"

const DefaultStar = ({ star, review, starSize}) => {
    const ratingStar = Array.from({ length: 5 }, (_, i) => {
        let num = i + 0.5;
        return (
            <span key={i}>
                {star >= i + 1 
                ? 
                <FaStar className={`text-orange-400 ${starSize ? "text-lg" : ""}`}/> 
                : star >= num 
                ? 
                <FaStarHalfAlt className={`text-orange-400 ${starSize ? "text-lg" : ""}`}/>
                : <AiOutlineStar className={`text-orange-400 ${starSize ? "text-xl" : ""}`}/>}
            </span>
        )

    })
    return (
        <div className='flex items-center'>
            {ratingStar}
            <span className={`ps-3  dark:text-zinc-300 text-zinc-600 ${starSize ? "text-lg" : "text-sm"}`}>({review} reviews)</span>
        </div>
    )
}

export default DefaultStar