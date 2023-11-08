"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function NextPrevBtn({ children, onClick, }) {
    return (<div className={'cursor-pointer rounded-lg px-3 py-1 text-sm font-medium bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white'} onClick={onClick}>
      {children}
    </div>);
}
exports.default = NextPrevBtn;
//# sourceMappingURL=next-button.jsx.map