/*
 * @Author: HEXIAYUE
 * @Date: 2023-01-29 15:15:10
 * @Description: Do not edit
 * @LastEditors: HEXIAYUE
 * @LastEditTime: 2023-01-29 16:01:05
 */
chrome.runtime.onInstalled.addListener(function () {
    console.log("插件已被安装");
});

chrome.action.onClicked.addListener(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "toggle");
    });
});
