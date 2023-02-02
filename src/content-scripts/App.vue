<!--
 * @Author: HEXIAYUE
 * @Date: 2023-01-29 16:02:15
 * @Description: Do not edit
 * @LastEditors: HEXIAYUE
 * @LastEditTime: 2023-02-03 02:16:41
-->
<template>
    <div class="hxy-crx-container" :class="{ 'hxy-show': showModal }">
        <div class="hxy-left">
            <img
                class="hxy-picurl"
                :src="musicObj.data.picurl"
                :class="{ 'hxy-img-animation': isPlay }"
            />
        </div>
        <div class="hxy-right">
            <p class="hxy-title">歌名: {{ musicObj.data.name }}</p>
            <p class="hxy-title">作者名: {{ musicObj.data.artistsname }}</p>
            <audio
                :src="musicObj.data.url"
                controls="controls"
                hidden="hidden"
                id="audioBox"
                ref="audioPlay"
            ></audio>
            <div class="hxy-word"></div>
            <div class="hxy-palyer">
                <img class="hxy-palyerBtn" src="../assets/img/上一曲.png" @click="previousSong" />
                <img
                    class="hxy-palyerBtn"
                    :src="palyUrlList[Number(isPlay)]"
                    @click="audioPlayfun"
                />
                <img class="hxy-palyerBtn" src="../assets/img/下一曲.png" @click="nextSong" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, nextTick } from "vue";
import imgSrc1 from "../assets/img/播放.png";
import imgSrc2 from "../assets/img/暂停.png";
// 扩展空间是打开
const showModal = ref(false);
// 音乐接口配置
const musicApiOption = {
    url: "https://api.uomg.com/api/rand.music",
    data: {
        format: "json",
    },
};
// 音乐的数据
const musicObj = reactive({ data: {} });
// 音乐是否播放
const isPlay = ref(false);

// 播放按钮图标数组
const palyUrlList = [imgSrc1, imgSrc2];

const audioPlay = ref(null);

// 接受消息
chrome.runtime.onMessage.addListener(async (msg) => {
    // 打开扩展弹窗
    if (msg === "toggle") {
        if (showModal.value) {
            close();
        } else {
            open();
            // 存在歌曲再打开就不刷新
            if (!musicObj.data.picurl) {
                const { code, data } = await fetchRequest(musicApiOption);
                if (code == 1) {
                    musicObj.data = reactive(data);
                }
            }
        }
    }
    // 暂停音乐播放
    if (msg == "close") {
        // 暂停其他tab音乐播放
        await nextTick();
        isPlay.value = false;
        audioPlay.value.pause();
    }
});
// 打开扩展弹窗
function open() {
    showModal.value = true;
    document.querySelector("body").addEventListener("click", close);
}

// 关闭扩展弹窗
function close() {
    showModal.value = false;
    document.querySelector("body").removeEventListener("click", close);
}

// 音乐或暂停
function audioPlayfun() {
    chrome.runtime.sendMessage("close");
    if (isPlay.value) {
        audioPlay.value.pause();
    } else {
        audioPlay.value.play();
    }
    isPlay.value = !isPlay.value;
}

// 上一首
async function previousSong() {
    // 音频播放
    const { code, data } = await fetchRequest(musicApiOption);
    if (code == 1) {
        musicObj.data = reactive(data);
        await nextTick();
        isPlay.value = false;
        audioPlayfun();
    }
}
// 下一首
async function nextSong() {
    // 音频播放
    const { code, data } = await fetchRequest(musicApiOption);
    if (code == 1) {
        musicObj.data = reactive(data);
        await nextTick();
        isPlay.value = false;
        audioPlayfun();
    }
}

// 获取接口返回数据
const fetchRequest = async (option = {}) => {
    const defaultOpt = {
        // 请求地址
        url: "",
        // 请求方式
        method: "get",
        // 请求头信息
        headers: {},
        // 其他参数
        other: {},
        // 接口参数
        data: {},
    };

    // 参数整合
    option = Object.assign({}, defaultOpt, option);

    // fetch请求参数
    const fetchOption = {
        headers: option.headers,
        method: option.method,
        ...option.other,
    };

    // 处理请求方式
    if (option.method.toLowerCase() == "get") {
        // get方法将参数拼接在url后面
        const values = Object.values(option.data);
        const keys = Object.keys(option.data);
        const arr = [];
        for (let i = 0; i < values.length; i++) {
            arr.push(`${keys[i]}=${values[i]}`);
        }
        const str = arr.join("&");
        option.url += `?${str}`;
    } else if (option.method.toLowerCase() == "post") {
        // post请求将参数转为JSON字符串传给body
        fetchOption.body = JSON.stringify(option.data);
    }

    // 请求方法
    const fetchData = await fetch(option.url, fetchOption);
    const response = await fetchData.json();
    return response;
};
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.hxy-crx-container {
    width: 400px;
    height: 130px;
    right: 0;
    top: 300px;
    border-radius: 3%;
    position: fixed;
    background-color: #223343;
    transform: translateX(500px);
    box-sizing: border-box;
    z-index: 999999;
    transition: all 0.4s ease 0s;
    box-shadow: rgb(0 0 0 / 12%) 0px 0px 15px 2px;
    display: flex;
    align-items: center;
}
.hxy-crx-container.hxy-show {
    transform: translateX(0);
}

.hxy-left {
    margin: 0 20px;
    position: relative;
}
.hxy-picurl {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #eee;
    transition: all 0.4s ease 0s;
}
.hxy-picurl:hover {
    transform: scale(2);
    border-radius: 0;
}
.hxy-img-animation {
    animation-name: rotateAnimation;
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
}

@keyframes rotateAnimation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.hxy-right {
    height: 100%;
    width: 100%;
    padding-top: 5px;
}
.hxy-title {
    font-size: 16px;
    height: 24px;
    line-height: 24px;
    overflow: hidden;
    color: #fff;
    text-align: center;
}
.hxy-palyer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 100%;
}
.hxy-palyerBtn {
    width: 32px;
    height: 32px;
    margin: 0 20px;
    cursor: pointer;
}
.hxy-palyerBtn:hover {
    opacity: 0.8;
}
.hxy-word {
    height: calc(100% - 24px - 24px - 40px);
    text-align: center;
}
</style>
