<!--
 * @Author: HEXIAYUE
 * @Date: 2023-01-28 16:20:51
 * @Description: Do not edit
 * @LastEditors: HEXIAYUE
 * @LastEditTime: 2023-01-31 00:43:33
-->

# portable_listening

一个可以在网页随时播放音乐的谷歌浏览器扩展插件

# 技术栈

1. 使用基于 vite 构建 Chrome 扩展 的[vite-plugin-crx-mv3](https://github.com/Jervis2049/vite-plugin-crx-mv3)
2. 音乐接口由[FREE Api](https://www.free-api.com/doc/302)提供

# install

yarn install

# development

yarn run dev

# production

yarn run build

# 版本介绍

### 1.1.0

1. 完成基本的播放音频的功能
2. 展示音频图片，作者名，音频名
3. 图片展示
   [![V1.1.md.png](https://img.hxyxyz.top/images/2023/01/31/V1.1.md.png)](https://img.hxyxyz.top/image/jsJeb)

### 1.2.0

1.在活动 tab 播放音乐时，暂停之前页面的已播放的音乐,限制只能存在一个播放页面

