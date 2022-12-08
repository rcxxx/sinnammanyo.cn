import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Social Channels',
    description: (
      <>
      </>
    ),
    img: 'img/icons/lzumi-06.png',
  },
];

function GameBoy({img}){
  return (
    <div class={styles['gameboy']}>
      <div class={styles['body']}></div>
      <div class={styles['screen-box']}>
        <div class={styles['decorate']}></div>
        <div class={styles['screen']}>
          <img src={img}></img>
        </div>
      </div>
      <div class={styles['buttons']}></div>
      <div class={styles['buttons-1']}></div>
      <div class={styles['buttons-2']}></div>
      <div class={styles['buttons-2-2']}></div>
      <div class={styles['pad-back']}>
        <div class={styles['pad-top']}></div>
      </div>
      <div class={styles['details-top']}></div>
      <div class={styles['details-back']}>
        <div class={styles['details-r']}></div>
      </div>
    </div>
  );
}

function Info({title, description, img}) {
  return (
    <div className={styles['info-container']}>
      <div className={styles['card']}>
        <div className={styles['back']}></div>
        <div className={styles['content']}>
          <h2>{title}</h2>
          <div className={styles['social-icons']}>
            
          </div>
        </div>
        <div className={styles['zoom']}><GameBoy img={img} /></div>
      </div>
    </div>
  );
}

export default function HomepageInfo() {
  return (
    <div className="row">
      {FeatureList.map((props, idx) => (
        <Info key={idx} {...props} />
      ))}
    </div>
  );
}
