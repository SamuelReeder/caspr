import React, { createContext, useContext, useState } from 'react';

interface PageContextProps {
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

const PageContext = createContext<PageContextProps | undefined>(undefined);

export const PageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [page, setPage] = useState<string>('My Graphs');

    return (
        <PageContext.Provider value={{ page, setPage }}>
            {children}
        </PageContext.Provider>
    );
};

export const usePage = () => {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error('usePage must be used within a PageProvider');
    }
    return context;
};