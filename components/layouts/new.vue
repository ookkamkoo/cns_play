<template>
    <div class="newsboxhead" data-animatable="fadeInUp" data-delat="200">
        <a-flex :align="'center'">
            <span class="newsboxhead-icon-container">
                <SoundOutlined />
            </span>
            <span class="newsboxhead-text-containe">
                เว็บที่ให้บริการคาสิโนออนไลน์เต็มรูปแบบ ทั้งสล็อตออนไลน์ คาสิโนสด บาคาร่าสด เกมแทงปลา เกมกีฬา ฯลฯ
            </span>
        </a-flex>
    </div>
</template>
<style>
  .newsboxhead {
    width: 100%;
    height: 30px;
    background: #000000E6;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    overflow: hidden;
    color: whitesmoke;
  }
  .newsboxhead-icon-container{
    background: #000000E6;
    padding: 4px;
    position: absolute;
    z-index: 4;
  }

  .newsboxhead-text-containe {
    animation: marquee 15s linear infinite;
    white-space: nowrap;
    display: inline-block;
  }

  @keyframes marquee {
    0% {
      transform: translateX(300%); /* Start the text at the right edge */
      }
    100% {
        transform: translateX(-100%); /* Move the text to the left edge */
    }
  } 
</style>