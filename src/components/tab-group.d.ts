/// <reference types="react" />
export type Item = {
    text: string;
    slug?: string;
    segment?: string;
    parallelRoutesKey?: string;
};
export declare const TabGroup: ({ path, parallelRoutesKey, items, }: {
    path: string;
    parallelRoutesKey?: string;
    items: Item[];
}) => import("react").JSX.Element;
