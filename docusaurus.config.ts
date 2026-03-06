import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: 'SparkFun Documentation',
    tagline: 'Hookup Guides, Tutorials, and API References for SparkFun Products',
    favicon: 'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    // Set the production url of your site here
    url: 'https://docs.sparkfun.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'sparkfun', // Usually your GitHub org/user name.
    projectName: '', // Usually your repo name.

    onBrokenLinks: 'throw',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    plugins: [
        [
            '@docusaurus/plugin-ideal-image',
            {
                quality: 70,
                max: 1030, // max resized image's size.
                min: 640, // min resized image's size. if original is lower, use that size.
                steps: 2, // the max number of images generated between min and max (inclusive)
                disableInDev: false,
            },
        ],
    ],
    presets: [
        [
            'classic',
            {
                sitemap: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,

        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/sfe_social_card.jpg',
        colorMode: {
            respectPrefersColorScheme: true,
        },
        plugins: [
            [
                '@docusaurus/plugin-ideal-image',
                {
                    quality: 70,
                    max: 1030, // max resized image's size.
                    min: 640, // min resized image's size. if original is lower, use that size.
                    steps: 2, // the max number of images generated between min and max (inclusive)
                    disableInDev: false,
                },
            ],
        ],
        algolia: {
            // The application ID provided by Algolia
            appId: '43ODL9UA7J',

            // Public API key: it is safe to commit it
            apiKey: '981767a679772e5d03f0f8968a3d7a11',

            indexName: 'SparkFun_Documentation_Site',

            // Optional: see doc section below
            contextualSearch: false,

            navigator: {
                navigate({ itemUrl }) {
                    window.location.href = itemUrl;
                },
            },

            // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
            //externalUrlRegex: 'external\\.com|domain\\.com',

            // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
            // replaceSearchResultPathname: {
            //     from: '/docs/', // or as RegExp: /\/docs\//
            //     to: '/',
            // },

            // Optional: Algolia search parameters
            // searchParameters: {},

            // Optional: path for search page that enabled by default (`false` to disable it)
            searchPagePath: 'search',

            // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
            // insights: false,

            // // Optional: whether you want to use the new Ask AI feature (undefined by default)
            // askAi: 'YOUR_ALGOLIA_ASK_AI_ASSISTANT_ID',

            //... other Algolia params
        },
        navbar: {
            title: 'Documentation',
            logo: {
                alt: 'SparkFun Logo',
                src: 'img/sfe_flame.png',
            },
            items: [

                { to: 'sparkfun', label: 'All Sites', position: 'left' },
            ],
        },
        footer: {
            style: 'dark',

            links: [
                {
                    title: 'SparkFun Electronics',
                    items: [
                        {
                            label: 'SparkFun.com',
                            href: 'https://www.sparkfun.com',
                        },
                        {
                            label: 'SparkFun Community Forum',
                            href: 'https://community.sparkfun.com/',
                        },
                        // {
                        //     label: 'Terms of Service',
                        //     href: ' https://www.sparkfun.com/terms/',
                        // },


                    ],
                },
                {
                    title: 'Social Channels',
                    items: [
                        {
                            label: 'YouTube',
                            href: 'https://www.youtube.com/sparkfun',
                        },
                        {
                            label: 'Instagram',
                            href: 'https://www.instagram.com/sparkfun/',
                        },
                        {
                            label: 'X',
                            href: 'https://x.com/sparkfun',
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/sparkfun',
                        },
                        {
                            label: 'Facebook',
                            href: 'https://www.facebook.com/SparkFun',
                        },
                    ],
                },

            ],
            copyright: `Copyright © ${new Date().getFullYear()} SparkFun Electronics`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
