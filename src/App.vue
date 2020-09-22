<template>
  <router-view/>
</template>

<style lang="less">
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  color: #2c3e50;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
.spinner {
  display: none !important;
}
.is-disabled {
  cursor: no-drop!important;
}
@font-face {
  font-family: 'cusfont';  /* project id 2087388 */
  src: url('https://at.alicdn.com/t/font_2087388_0j3byzscbv1t.eot');
  src: url('https://at.alicdn.com/t/font_2087388_0j3byzscbv1t.eot?#iefix') format('embedded-opentype'),
  url('https://at.alicdn.com/t/font_2087388_0j3byzscbv1t.woff2') format('woff2'),
  url('https://at.alicdn.com/t/font_2087388_0j3byzscbv1t.woff') format('woff'),
  url('https://at.alicdn.com/t/font_2087388_0j3byzscbv1t.ttf') format('truetype'),
  url('https://at.alicdn.com/t/font_2087388_0j3byzscbv1t.svg#cusfont') format('svg');
}
.cus-icon{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
