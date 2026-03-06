/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ReactNode } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import ShowcaseSearchBar from '@site/src/pages/sparkfun/_components/ShowcaseSearchBar';
import ShowcaseCards from './_components/ShowcaseCards';
import ShowcaseFilters from './_components/ShowcaseFilters';
import styles from './index.module.css';



function ShowcaseHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroDocBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
            </div>
        </header>
    );
}

export default function Showcase(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout>
            <ShowcaseHeader />
            <main className="margin-vert--lg">

                <ShowcaseFilters />
                <div
                    style={{ display: 'flex', marginLeft: 'auto' }}
                    className="container">
                    <ShowcaseSearchBar />
                </div>
                <ShowcaseCards />
            </main>
        </Layout >
    );
}
