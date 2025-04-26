import { useState, useEffect } from 'react';

function setLocalstorageItem(key, value) {
        const valueString = JSON.stringify(value);
        localStorage.setItem(key, valueString);
}

export default function useLocalstorage(key, initialValue = null) {
    if (typeof key !== 'string') {
        throw new Error('Localstorage key must be a string');
    }

    const storedValue = localStorage.getItem(key);
    const parsedValue = Boolean(storedValue) ? JSON.parse(storedValue) : null;
    
    const initialState = initialValue instanceof Set
        ? new Set(parsedValue || [])
        : parsedValue ?? initialValue;

    const [value, setValue] = useState(initialState);

    useEffect(() => {
        const valueToStore = value instanceof Set ? Array.from(value) : value;
        setLocalstorageItem(key, valueToStore);
    }, [key, value]);

    function updateValue(newValue) {
        if (typeof newValue !== 'undefined') {
            setValue(newValue);
        }
    }

    return [value, updateValue];
}