'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tab = void 0;
const clsx_1 = __importDefault(require("clsx"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const Tab = ({ path, parallelRoutesKey, item, onClick, }) => {
    const segment = (0, navigation_1.useSelectedLayoutSegment)(parallelRoutesKey);
    const href = item.slug ? path + '/' + item.slug : path;
    const isActive = (!item.slug && segment === null) ||
        segment === item.segment ||
        segment === item.slug;
    return (<link_1.default href={href} className={(0, clsx_1.default)('rounded-lg px-3 py-1 text-sm font-medium', {
            'bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white': !isActive,
            'bg-vercel-blue text-white': isActive,
        })} onClick={onClick}>
      {item.text}
    </link_1.default>);
};
exports.Tab = Tab;
//# sourceMappingURL=tab.jsx.map