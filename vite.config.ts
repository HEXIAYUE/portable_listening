/*
 * @Author: HEXIAYUE
 * @Date: 2023-01-29 10:56:28
 * @Description: Do not edit
 * @LastEditors: HEXIAYUE
 * @LastEditTime: 2023-01-29 10:56:44
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import crx from "vite-plugin-crx-mv3";

export default defineConfig(({ mode }) => {
    return {
        plugins: [
            vue(),
            crx({
                manifest: "./src/manifest.json",
            }),
        ],
        build: {
            emptyOutDir: mode == "production",
        },
    };
});
