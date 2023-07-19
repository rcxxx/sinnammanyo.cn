import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Stack',
    description: (
      <>
        不用心的学习笔记
      </>
    ),
    img: 'img/icons/head/lzumi-06.png',
    link: 'docs/',
  },
  {
    title: 'Projects',
    description: (
      <>
        简单搞搞的好玩项目
      </>
    ),
    img: 'img/icons/head/re-01.png',
    link: 'projects/category/projects/',
  },
  {
    title: 'Notes',
    description: (
      <>
        没有内涵的文章摘抄
      </>
    ),
    img: 'img/icons/head/C2.png',
    link: 'notes/',
  },
];

function Feature({title, description, img, link}) {
  return (
    <div className={clsx('col col--4', styles['card-box'])}>
      <div className={styles['card']}>
        <div className={styles['card-img-box']}>
          <img src={img}></img>
        </div>
        <div className={styles['content']}>
          <div className={styles['details']}>
            <h2>{title}</h2>
            <div className={styles['description']}>
              {description}
            </div>
            <div class={clsx('text--center',styles['card-button'])}>
              <div class={styles['warp']}>
                <Link to={link}>
                  <button class={styles['button']}>🌈Portal</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
