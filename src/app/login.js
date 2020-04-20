import React from 'react';
import axios from 'axios';

// import ant design mobile
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import { WhiteSpace, NavBar, List, InputItem, Tabs, Badge, Button, Toast } from 'antd-mobile';
import { useHistory } from "react-router-dom";
import { createForm } from 'rc-form';

axios.defaults.baseURL = 'http://118.89.23.205:3001';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = false;

function Login() {

    let history = useHistory();
    class BasicLoginExample extends React.Component {

        constructor(props) {
            super(props);
        }
        componentDidMount() {
            // this.autoFocusInst.focus();
        }
        handleClick = () => {
            this.inputRef.focus();
        }

        submit = () => {
            this.props.form.validateFields((error, value) => {
                console.log(error, value);

                axios.post('/verify', {
                    username: value.login_username,
                    password: value.login_password
                })
                    .then(function (response) {

                        console.log(response.data);
                        if (response.data == 'verify success') {
                            Toast.success('登录成功', 1);
                            history.push(`/Home/${value.login_username}`);
                        } else {
                            Toast.fail('账号或密码错误，请重新登录', 1);
                            history.push(`/`);
                        };
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            });
        }

        render() {
            const { getFieldProps } = this.props.form;
            return (
                <div>
                    <List renderHeader={() => '欢迎使用'}>
                        <InputItem
                            {...getFieldProps('login_username')}
                            type="text"
                            placeholder="请输入您的用户名"
                            maxLength={20}
                        >用户名</InputItem>
                        <InputItem
                            {...getFieldProps('login_password')}
                            type="password"
                            placeholder="请输入您的密码"
                            maxLength={20}
                        >密码</InputItem>
                        <WhiteSpace size="xl" />
                        <WhiteSpace size="xl" />
                        <Button type="primary" onClick={this.submit}>登录</Button><WhiteSpace />
                    </List>
                </div>
            );
        }
    }

    class BasicRegisterExample extends React.Component {

        constructor(props) {
            super(props);
        }
        componentDidMount() {
            // this.autoFocusInst.focus();
        }
        handleClick = () => {
            this.inputRef.focus();
        }
        submit = () => {
            this.props.form.validateFields((error, value) => {
                console.log(error, value);
                if ((value.register_username == "" || null) || (value.register_password == "" || null) || (value.register_sn == "" || null)) {
                    Toast.fail('用户名、密码、SN编号不能为空哦！', 1);
                } else if ((String(value.register_username).length > 40) || (String(value.register_password.maxLength).length > 40) || (String(value.register_sn.maxLength).length > 40 || null)) {
                    Toast.fail('用户名、密码、SN编号不能大于40字符哦！', 1);
                } else {
                    axios.post('/register', {
                        username: value.register_username,
                        password: value.register_password,
                        sn: value.register_sn
                    })
                        .then(function (response) {

                            console.log(response.data);
                            if (response.data == 'register success') {
                                Toast.success('注册成功！', 1);
                                history.push(`/Home/${value.register_username}`);
                            } else {
                                Toast.fail('注册失败！', 1);
                                history.push(`/`);
                            };
                        })
                        .catch(function (error) {
                            console.log(error);
                            Toast.fail('账号或密码已存在，请重新注册', 1);
                            history.push(`/`);
                        });
                }
            });
        }

        render() {
            const { getFieldProps } = this.props.form;
            return (
                <div>
                    <List renderHeader={() => '欢迎使用'}>
                        <InputItem
                            {...getFieldProps('register_username', {
                                initialValue: '',
                            })}
                            type="text"
                            placeholder="请输入您的用户名"
                        >用户名</InputItem>
                        <InputItem
                            {...getFieldProps('register_password', {
                                initialValue: '',
                            })}
                            type="password"
                            placeholder="请输入您的密码"
                        >密码</InputItem>
                        <InputItem
                            {...getFieldProps('register_sn', {
                                initialValue: '',
                            })}
                            type="sn"
                            placeholder="请输入您的SN编号"
                        >SN编号</InputItem>
                        <Button type="primary" onClick={this.submit}>注册</Button><WhiteSpace />
                    </List>
                </div>
            );
        }
    }
    const BasicLoginExampleWrapper = createForm()(BasicLoginExample);
    const BasicRegisterExampleWrapper = createForm()(BasicRegisterExample);

    const tabs = [
        { title: <Badge dot>登录</Badge> },
        { title: <Badge dot>注册</Badge> },
    ];

    return (
        <div>
            <NavBar mode="light">Nook.Inc 股票交易所</NavBar>

            <Tabs tabs={tabs}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', direction: 'column' }}>
                    <BasicLoginExampleWrapper />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', direction: 'column' }}>
                    <BasicRegisterExampleWrapper />

                </div>
            </Tabs>
            <WhiteSpace />
        </div>
    );

}

export default Login;
