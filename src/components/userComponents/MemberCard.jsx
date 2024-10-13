import { teamMembers } from '@/data';
import React from 'react'
import { Card } from '../ui/card';

const MemberCard = () => {
    return (
       <div className='grid gap-5 lg:grid-cols-2'>
        {teamMembers?.map((member, i) => (
        <Card key={i} className="items-center rounded-lg shadow lg:flex lg:h-[12rem] h-[25rem] transition-all hover:scale-105 cursor-pointer">
            <img
                className="w-full h-[60%] lg:h-full lg:w-2/4 lg:rounded-lg  object-contain lg:object-cover lg:rounded-l-none"
                src={member.imageUrl}
                alt={member.name}
            />
        <div className="p-5">
            <h3 className="text-xl font-bold tracking-tight">
                {member.name}
            </h3>
            <span className="">{member.occupation}</span>
            <p className="mt-3 mb-4 font-light ">
               {member.about}
            </p>
        </div>
    </Card>
       ))}
       </div>
    )
}

export default MemberCard;