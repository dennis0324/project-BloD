/// <reference types="react" />
import type { Item } from '@src/components/tab-group';
export declare const Tab: ({ path, parallelRoutesKey, item, onClick, }: {
    path: string;
    parallelRoutesKey?: string;
    item: Item;
    onClick?: () => void;
}) => import("react").JSX.Element;
