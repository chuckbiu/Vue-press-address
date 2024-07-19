# 🔠 **Webfont Dowload** Vite 插件⚡

从您的 Vite 项目**收集 webfont 链接、导入和定义，**下载**css 和字体文件**（隐私优先）**，将字体添加到您的**捆绑包中**（或通过开发服务器提供），并使用**非渲染阻塞方法**注入**字体定义，同时将外部 css 和字体文件存储在**持久文件缓存**中，使它们可用于**离线**开发。

```
npm i vite-plugin-webfont-dl -D
```

谷歌字体 地址 https://fonts.google.com/selection/embed

## 1 使用方法：**零配置** 

​	0 *下载并注入字体* 

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400&family=Roboto:wght@100&display=swap" rel="stylesheet">
```

​	1 无需任何配置即可添加**`webfontDownload`**到您的 Vite 插件中，插件将自动处理所有事情

```json
// vite.config.js

import webfontDownload from 'vite-plugin-webfont-dl';

export default {
  plugins: [
    webfontDownload(),
  ],
};
```

## 2 简单配置

​		0 *下载并注入字体* 

```html
<link href="[CSS URL]" rel="stylesheet">
```

​	   1 **`webfontDownload`**使用选定的 Google Fonts **CSS URL**添加到您的 Vite 插件：

```js
// vite.config.js

import webfontDownload from 'vite-plugin-webfont-dl';

export default {
  plugins: [
    webfontDownload([
      'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap',
      'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap'
    ]),
  ],
};
```

### 🧩 支持的 webfont 提供商

- **[Google Fonts](https://fonts.google.com/)**：适用于[零配置](https://github.com/feat-agency/vite-plugin-webfont-dl?tab=readme-ov-file#zero-config)或[简单配置](https://github.com/feat-agency/vite-plugin-webfont-dl?tab=readme-ov-file#simple-config)
- **[Bunny Fonts](https://bunny.net/fonts/)** : 适用于[零配置](https://github.com/feat-agency/vite-plugin-webfont-dl?tab=readme-ov-file#zero-config)或[简单配置](https://github.com/feat-agency/vite-plugin-webfont-dl?tab=readme-ov-file#simple-config)
- **[Fontshare](https://www.fontshare.com/)**：适用于[零配置](https://github.com/feat-agency/vite-plugin-webfont-dl?tab=readme-ov-file#zero-config)或[简单配置](https://github.com/feat-agency/vite-plugin-webfont-dl?tab=readme-ov-file#simple-config)
- **[Fira Code](https://github.com/tonsky/FiraCode)**、**[ Hack](https://github.com/source-foundry/Hack)**字体（`cdn.jsdelivr.net`）：适用于[零配置](https://github.com/feat-agency/vite-plugin-webfont-dl?tab=readme-ov-file#zero-config)或[简单配置](https://github.com/feat-agency/vite-plugin-webfont-dl?tab=readme-ov-file#simple-config)
- **[内部](https://rsms.me/inter/)**字体（`rsms.me`）：适用于[零配置](https://github.com/feat-agency/vite-plugin-webfont-dl?tab=readme-ov-file#zero-config)或[简单配置](https://github.com/feat-agency/vite-plugin-webfont-dl?tab=readme-ov-file#simple-config)
- *任何具有 CSS（包含`@font-face`定义）的提供程序都可以使用[简单配置](https://github.com/feat-agency/vite-plugin-webfont-dl?tab=readme-ov-file#simple-config)*

### 🛠️**选项**

- **`injectAsStyleTag`**（`boolean`，默认值：）`true`：
  将 webfonts 作为`<style>`标签（嵌入 CSS）或外部`.css`文件注入
- **`minifyCss`**（`boolean`，默认*值* `build.minify`）：
  在构建期间最小化 CSS 代码。
- **`embedFonts`**（`boolean`，默认值`false`：）：
  将 base64 编码的字体嵌入到 css 中。
- **`async`**（`boolean`，默认值`true`：）：
  防止使用`webfonts.css`可能导致内容安全策略问题的内联事件处理程序（）。
  仅适用于**`injectAsStyleTag:false`**。
- **`cache`**（`boolean`，默认值：`true`）：
  将下载的 css 和字体文件持久存储在本地文件缓存中。
  如果设置为，`false`现有缓存将被删除。
- **`proxy`**（`false|AxiosProxyConfig`，默认值`false`：）：网络请求的
  [代理配置。](https://axios-http.com/docs/req_config)

```js
import {ViteWebfontDownload} from 'vite-plugin-webfont-dl';
ViteWebfontDownload(
  [],
  {
    injectAsStyleTag: true,
    minifyCss: true,
    async: true,
    cache: true,
    proxy: false,
  }
)
```

​	或

```js
ViteWebfontDownload(
  [
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  ],
  {
    injectAsStyleTag: true,
    minifyCss: true,
    async: true,
    cache: true,
    proxy: false,
  }
)
```

### 第三方网页字体

使用标准方法将第三方网络字体（[Google Fonts](https://fonts.google.com/)、[Bunny Fonts](https://bunny.net/fonts/)或[Fontshare](https://www.fontshare.com/)）添加到网页会**显著减慢页面加载速度。Lighthouse** 和**PageSpeed** **Insights**称它们为***“阻止渲染的资源”***，这意味着在从远程服务器获取网络字体 CSS 之前，页面无法完全渲染。

通过避免第三方 webfonts 导致的渲染阻塞资源，您可以**提高页面性能**，从而带来**更好的用户体验**并**改善 SEO 结果**。

 该插件**从第三方 webfont 服务\（如 Google Fonts）\下载给定的字体，并将它们*（作为内部或外部样式表）***动态注入**到您的 Vite 项目中，将第三方 webfont 转换为**自托管字体。

除了**性能显著提升**之外，由于不涉及第三方服务器，您的访问者还将受益于**隐私保护。**

效果对比 

使用插件css时间展示

![](.\assets\Snipaste_2024-07-02_16-08-10.png)

不使用插件css时间

![](.\assets\Snipaste_2024-07-02_16-10-09.png)

渲染阻塞---其他资料 https://pagespeedchecklist.com/eliminate-render-blocking-resources

