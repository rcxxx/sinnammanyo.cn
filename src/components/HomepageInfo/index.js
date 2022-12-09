import React from 'react';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

const FeatureList = [
  {
    title: 'Social Channels',
    description: (
      <>
      </>
    ),
    img: 'img/icons/lzumi-06.png',
    img_github : 'img/pixel/star.png',
    img_bilibili: 'img/pixel/payment.png', 
    img_wechat: 'img/pixel/users.png', 
    img_qq: 'img/pixel/target.png',
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

function Info({title, img, img_github, img_bilibili, img_wechat, img_qq}) {
  return (
    <div className={styles['info-container']}>
      <div className={styles['card']}>
        <div className={styles['back']}></div>
        
        <div className={styles['zoom']}><GameBoy img={img} /></div>
        <div className={styles['content']}>
          <h2>{title}</h2>
          <div className={styles['social-icons']}>
            <div className={styles['icons-top']}>
              <div className={styles['icon-t']}>
                <a href="https://space.bilibili.com/373512714" target="_blank">
                  <img src={img_bilibili} />
                </a>
              </div>
              <div className={styles['icon-l']}>
                <a href="https://github.com/rcxxx" target="_blank">
                  <img src={img_github} />
                </a>
              </div>
            </div>
            <div className={styles['icons-back']}>
              <div className={styles['icon-r']}>
                <a>
                  <img src={img_qq} />
                  <img 
                    src={useBaseUrl("https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/qr-code/qq.jpg")}
                    className={`dropdown__menu ${styles.dropdown__menu}`}
                  />
                </a>
              </div>
              <div className={styles['icon-b']}>
                <a>
                  <img src={img_wechat} />
                  <img 
                    src={useBaseUrl("https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/qr-code/wechat.jpg")}
                    className={`dropdown__menu ${styles.dropdown__menu}`}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
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
