import React from 'react';

// import ant design mobile
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import { WhiteSpace, NavBar, List, InputItem, Tabs, Badge, Button, Toast } from 'antd-mobile';
import { Link } from "react-router-dom";
const tabs = [
    { title: <Badge dot>登录</Badge> },
    { title: <Badge dot>注册</Badge> },
];

const Login = () => (
    <div>
        <NavBar mode="light">Nook.Inc 股票交易所</NavBar>
        <Tabs tabs={tabs}
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', direction: 'column' }}>
                <List renderHeader={() => '欢迎使用'}>
                    <InputItem
                        type="username"
                        placeholder="请输入您的用户名"
                    >用户名</InputItem>
                    <InputItem
                        type="password"
                        placeholder="请输入您的密码"
                    >密码</InputItem>
                    <WhiteSpace size="xl" />
                    <WhiteSpace size="xl" />
                    <Button type="primary" onClick={loginButton}>登录</Button><WhiteSpace />
                </List>

            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', direction: 'column' }}>
                <List renderHeader={() => '欢迎使用'}>
                    <InputItem
                        type="username"
                        placeholder="请输入您的用户名"
                    >用户名</InputItem>
                    <InputItem
                        type="password"
                        placeholder="请输入您的密码"
                    >密码</InputItem>
                    <InputItem
                        type="sn"
                        placeholder="请输入您的SN编号"
                        defaultValue=""
                    >SN编号</InputItem>
                    <Button type="primary" onClick={registerButton}>注册</Button><WhiteSpace />
                </List>

            </div>
        </Tabs>
        <WhiteSpace />
    </div>
);

function loginButton() {
    Toast.success('Login success !!!', 1);
    
}

function registerButton() {
    Toast.success('Register success !!!', 1);
}

export default Login;