import React from 'react';
import './index.css';
export type Mode = 'main' | 'footer';
declare function logo({ className, mode }: {
    className?: string;
    mode: Mode;
}): React.JSX.Element | "";
export default logo;
