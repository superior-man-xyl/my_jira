import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadDevTools } from 'jira-dev-tool'
// 需要在jira-dev-tool后面引入，因为其中也包含有些antd的样式，这样保证后面的antd能覆盖前面的。而不是被覆盖
import 'antd/dist/antd.less';//使用这个antd.less是因为接下来要自定义antd的主题变量
import { AppProvide } from './context/index';

loadDevTools(() =>//使用loadDevTools，相当于为页面安装jira-dev-tools工具
  ReactDOM.render(
    <React.StrictMode>
      <AppProvide>
        <App />
      </AppProvide>
    </React.StrictMode>,
    document.getElementById('root')
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
