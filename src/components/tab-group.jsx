"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabGroup = void 0;
const tab_1 = require("./tab");
const TabGroup = ({ path, parallelRoutesKey, items, }) => {
    return (<div className="flex flex-wrap items-center gap-2">
      {items.map((item) => (<tab_1.Tab key={path + item.slug} item={item} path={path} parallelRoutesKey={parallelRoutesKey}/>))}
    </div>);
};
exports.TabGroup = TabGroup;
//# sourceMappingURL=tab-group.jsx.map