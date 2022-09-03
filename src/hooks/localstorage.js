import { useState } from 'react';

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
    const [value, setValue] = useState(parsedValue ?? initialValue);

    setLocalstorageItem(key, value);

    function updateValue(value) {
        if (typeof value !== 'undefined') {
            setLocalstorageItem(key, value);
            
            setValue(value);
        }
    }

    return [value, updateValue];
}