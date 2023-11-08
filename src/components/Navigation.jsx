'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigation = void 0;
const blogpost_page_1 = require("../contexts/blogpost-page");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const Navigation = () => {
    const router = (0, navigation_1.useRouter)();
    const { page } = (0, blogpost_page_1.usePage)();
    console.log(page);
    return (<nav>
      <div className="nav-selection">
        <a className="navlink" onClick={() => router.push('/')}>
          Home
        </a>
      </div>
      <div className="nav-selection">
        
        
        
        <a onClick={() => console.log('wow')}>Click here</a>
      </div>
      <div className="nav-selection">
        <link_1.default className="navlink" href={'/project'}>
          Project
        </link_1.default>
      </div>
      <div className="nav-selection">
        <link_1.default className="navlink" href={'/'}>
          About Me
        </link_1.default>
      </div>
    </nav>);
};
exports.Navigation = Navigation;
//# sourceMappingURL=Navigation.jsx.map