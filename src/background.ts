/*
 * @Author: HEXIAYUE
 * @Date: 2023-01-29 15:15:10
 * @Description: Do not edit
 * @LastEditors: HEXIAYUE
 * @LastEditTime: 2023-02-03 02:09:22
 */
chrome.runtime.onInstalled.addListener(function () {
    console.log("插件已被安装");
});

// popup点击事件监听
chrome.action.onClicked.addListener(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "toggle");
    });
});

// 接受消息
chrome.runtime.onMessage.addListener(async (msg) => {
    // 关闭不活跃tab的音乐播放
    if (msg == "close") {
        chrome.tabs.query({ currentWindow: true }, function (tabs) {
            tabs.forEach((value) => {
                if (!value.active) {
                    chrome.tabs.sendMessage(value.id, "close");
                }
            });
        });
    }
});
