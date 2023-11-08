import React from 'react';
type state = {
    page: number;
    setPage: (page: number) => void;
};
export declare function usePage(): state;
export default function PageProvider({ children, }: {
    children: React.ReactNode;
}): React.JSX.Element;
export {};
