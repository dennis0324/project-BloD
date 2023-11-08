'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const navigation_1 = require("next/navigation");
require("./index.css");
const logo_1 = __importDefault(require("./logo"));
function logo({ className, mode }) {
    const location = (0, navigation_1.usePathname)();
    console.log(location);
    return location !== '/' || mode === 'main' ? (<div>
      <a onClick={() => console.log('testing')}>aaa</a>
      <logo_1.default className={className}/>
    </div>) : ('');
}
exports.default = logo;
//# sourceMappingURL=index.jsx.map