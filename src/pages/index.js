import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageInfo from '@site/src/components/HomepageInfo';

import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx(styles['header-content'], 'container')}>
      <div className={styles['header-content-inner']}>
        <div className={clsx('hero__title', styles['header-title'])}>
          <p>
            Rcxxx's
            <br />
            <em>Personal Site</em>
          </p>
        </div>
        <div className={styles['header-right']}>
          <div className={clsx('hero__subtitle', styles['header-describe'])}>
            <p>
              Hi I'm rcxxx 👋<br />
              <em>very interested in & CV & ML & DL</em><br />
              <em>🤔 I'm studying, but I'm lazy</em>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="">
      <HomepageHeader />
      <main>
        <HomepageInfo />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
