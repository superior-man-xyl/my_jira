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

## 使用Custom Hook来提取并复用代码
