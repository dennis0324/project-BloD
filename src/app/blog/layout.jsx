"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const pagination_button_1 = require("./pagination-button");
async function Page({ children, }) {
    return (<div className="w-1/2">
      {children}
      <pagination_button_1.BlogPagination />
    </div>);
}
exports.default = Page;
//# sourceMappingURL=layout.jsx.map