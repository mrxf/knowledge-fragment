/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: '知识碎片',
  tagline: '记录技术学习内容',
  url: 'https://knowledge-fragment.vercel.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'mrxf', // Usually your GitHub org/user name.
  projectName: 'knowledge-fragment', // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: '知识碎片',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'start-react-dashboard/intro',
          position: 'left',
          label: '中后台系统搭建',
        },
        {to: '/blog', label: '日志', position: 'right'},
        {
          href: 'https://github.com/mrxf',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/start-react-dashboard/intro',
            },
          ],
        },
        {
          title: '与我相关',
          items: [
            {
              label: '技术博客',
              to: 'https://www.thisjs.com/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/mrxf/',
            },
          ],
        },
        {
          title: '友情链接',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 知识积累, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/mrxf/knowledge-fragment/edit/master/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/mrxf/knowledge-fragment/edit/master/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
