import React, { useEffect, useState } from 'react'

export default function useLocalStorage(key, initialData) {

    const [data, setData] = useState(initialData)

    const existingData = JSON.parse(localStorage.getItem(key))
    useEffect(() => {
        if (existingData) {
            setData(existingData)
        } else {
            localStorage.setItem(key, JSON.stringify(initialData))
        }
    }, [])

    const updateLocalStorage = (newData) => {
        if (typeof newData === 'function') {
            localStorage.setItem(key, JSON.stringify(newData(initialData)))
        } else {
            localStorage.setItem(key, JSON.stringify(newData))
        }
        setData(newData)
    }
    return [data, updateLocalStorage]
}
