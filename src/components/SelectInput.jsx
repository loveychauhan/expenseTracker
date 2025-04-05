import React from 'react'

export default function SelectInput({ label, id, name, value, onChange, error, optionLabel, options }) {
    return (
        <div className="input-container">
            <label htmlFor="category">{label}</label>
            <select id={id}
                name={name}
                value={value}
                onChange={onChange}>
                {optionLabel && <option value="" hidden="">{optionLabel}</option>}
                {options.map((option) => {
                    return <option value={option} key={crypto.randomUUID()}>{option}</option>
                })}

            </select>
            <p className='error'>{error}</p>
        </div>
    )
}
