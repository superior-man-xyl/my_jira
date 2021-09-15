# my_jira
使用reat17+react Hook+TS4的仿jira项目
项目地址：https://github.com/sindu12jun/imooc-jira/tree/master
相关文档：https://www.notion.so/React-491ad0643476437cafde50bee4dde6ed
# 项目初始化
create-react-app jira --template typescript 创建一个使用typescript的react项目

# 初始化后的一些优化配置
## 相对路径编写过长问题
例如：``import {user} from "../../user"``
这样的路径过于长了
如何优化呢？
在tsconfig.json里面配置一个``"baseUrl": "./src",``
这样我们的决定路径就会在src下寻找
例如： user就在src下，那么就可以直接写``from "user"``

## 配置prettier 和ESLint 统一代码规范

## 配置commit的限制，防止不符合规范的commit出现