'use client';
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPagination = void 0;
const navigation_1 = require("next/navigation");
const react_1 = __importStar(require("react"));
const navigation_2 = require("next/navigation");
const blogpost_page_1 = require("../../contexts/blogpost-page");
const next_button_1 = __importDefault(require("../../components/next-button"));
function BlogPagination() {
    const location = (0, navigation_2.usePathname)();
    const pageContext = (0, blogpost_page_1.usePage)();
    const router = (0, navigation_1.useRouter)();
    const [page, setPage] = (0, react_1.useState)(parseInt(location.split('/')[2] ?? '0'));
    const [totalPage, setTotalPage] = (0, react_1.useState)(1);
    (0, react_1.useEffect)(() => {
        fetch(`http://localhost:3000/api/blogposts?postCount=5&format=length`)
            .then((res) => res.json())
            .then((res) => {
            console.log(res);
            setTotalPage(res.length);
        });
    }, []);
    function handleNextPage() {
        console.log('next');
        if (page < totalPage - 1) {
            router.push(`/blog/${page + 1}`);
            pageContext.setPage(page + 1);
            setPage(page + 1);
            console.log(page);
        }
    }
    function handlePrevPage() {
        console.log('prev');
        if (page > 0) {
            router.push(`/blog/${page - 1}`);
            pageContext.setPage(page - 1);
            setPage(page - 1);
        }
    }
    return (<div className="flex flex-wrap items-center gap-2 justify-center">
      <div className="grid grid-cols-2 gap-4">
        <next_button_1.default onClick={handlePrevPage}>PREV</next_button_1.default>
        <next_button_1.default onClick={handleNextPage}>NEXT</next_button_1.default>
      </div>
    </div>);
}
exports.BlogPagination = BlogPagination;
//# sourceMappingURL=pagination-button.jsx.map