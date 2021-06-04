/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  startDashboard: [
    {
      type: "doc",
      id: "start-react-dashboard/intro",
    },
    {
      type: "doc",
      id: "start-react-dashboard/start",
    },
    {
      type: "category",
      label: "🚲 基础知识介绍",
      items: ["start-react-dashboard/basic/npmrc", "start-react-dashboard/basic/package-lock"],
    },
    {
      type: "category",
      label: "✈️ 搭建架子",
      items: [
        "start-react-dashboard/foundation/menu",
        "start-react-dashboard/foundation/pre-css",
        "start-react-dashboard/foundation/router",
        "start-react-dashboard/foundation/env",
        "start-react-dashboard/foundation/network",
        "start-react-dashboard/foundation/antd",
        "start-react-dashboard/foundation/config-menu",
        "start-react-dashboard/foundation/deploy",
      ],
    },
    {
      type: "category",
      label: "🚀 进阶",
      items: [
        "start-react-dashboard/advance/mock",
        "start-react-dashboard/advance/authed",
        "start-react-dashboard/advance/typescript",
        "start-react-dashboard/advance/lint",
        "start-react-dashboard/advance/code-split",
        "start-react-dashboard/advance/wabpack-cache",
      ],
    },
    {
      type: "category",
      label: "杂项",
      items: [
        "start-react-dashboard/others/echarts",
        "start-react-dashboard/others/ssr",
      ],
    },
  ],
  leetCode: [
    {
      type: "doc",
      id: "leetcode/intro",
    },
    {
      type: "category",
      label: "简单",
      items: [
        "leetcode/array/two-sum",
        "leetcode/math/palindrome",
      ],
    },
  ]
};
