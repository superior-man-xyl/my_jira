# jira
## 项目使用的mock方式
本项目使用的是本地node服务器。
---》 json-server
其优点是：
- 1. 配置简单，json-server 甚至可以三十秒内启动一个REST API Server
- 2. 自定义程度高，一切尽在掌握中
- 3. 增删改查真实模拟

缺点：
- 与接口管理工具相比，无法随着后端API的修改而修改

本项目中在__json_server_mock__里建立了db.json
设置一个 .env (上线后使用) 和 .env.development (开发时使用) 使用npm start时就是使用.env, 使用npm run build时就是使用.env.development 这就进行了一个灵活的切换

## 使用Custom Hook (自定义组件)来提取并复用代码

## 改造为ts
- qs报错，yarn add @types/qs 为qs安装一个ts的补丁，在node_modules里@types就会多一个qs文件夹，里面一个ts说明文件，index.d.ts,这东西是给js打补丁用的，因为哪些库都是用js开发的，要兼容ts就要加个ts补丁，也是ts说明书文件

## 鸭子类型
ts是面向接口编程的，而不是面向对象编程，就是说为某函数做类型定义，其不会在意其对应的是什么类型，只需要其类型中包含了其要用到的元素就行

## 建立个专属的服务端
使用 npx imooc-jira-tool，这个服务端是基于service worker 等于在浏览器建立了一个服务端，使用localstorage做数据库

