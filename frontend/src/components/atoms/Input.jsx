import React from 'react';

const Input = ({type = 'text', placeholder = null, id, onChange}) => {
    return (
        <div className={'my-1'}>
            <input placeholder={placeholder} onChange={onChange} id={id} type={type} className={'border border-gray-300 rounded-md p-2 w-full'}/>
        </div>
    );
};

export default Input;