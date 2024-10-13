// components/Radio.js
import React from 'react';

const Radio = ({ id, name, value, checked, onChange, label }) => {
    return (
        <div className="flex items-center">
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="hidden"
            />
            <label
                htmlFor={id}
                className="relative cursor-pointer flex items-center"
            >
                <div className="w-4 h-4 border border-orange-500 rounded-full flex-shrink-0 mr-2">
                    {checked && (
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    )}
                </div>
                <span className="uppercase">{label}</span>
            </label>
        </div>
    );
};

export default Radio;
