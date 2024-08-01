"use client"
import { SearchContext } from '@/lib/SearchContext';
import store from '@/redux/store';
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';

function StoreProvider({ children }) {
    const [isWindowLoaded, setIsWindowLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof history !== 'undefined') {
            setIsWindowLoaded(true);
        }
    }, []);

    return (
        <div>
            {
                isWindowLoaded ?
                    <SearchContext>
                        <Provider store={store} >
                            {children}
                        </Provider>
                    </SearchContext>
                    : null
            }
        </div>
    );
}

export default StoreProvider;
