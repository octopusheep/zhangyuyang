import React from 'react';
import axios from 'axios';
// import ant design mobile
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import { WhiteSpace, NavBar, List, InputItem, Tabs, Badge, Button, Toast, Icon, ListView, Switch, Popover, Range, Modal } from 'antd-mobile';
import { useParams, useHistory } from "react-router-dom";
import { createForm } from 'rc-form';


axios.defaults.baseURL = 'http://118.89.23.205:3001';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = false;



function Home() {
    const operation = Modal.operation;
    let history = useHistory();
    const tabs = [
        { title: <Badge dot>买</Badge> },
        { title: <Badge dot>卖</Badge> },
    ];

    let { username } = useParams();

    function publicButton() {
        Toast.success('Public information success !!!', 1);
    }

    const PopItem = Popover.Item;

    var data = [];

    axios.get('/get_islands')
        .then(function (response) {

            console.log(response.data);
            if (response.data == 'search islands fail') {
            } else {
                data = response.data;
                console.log('show data:' + data);
            };
        })
        .catch(function (error) {
            console.log(error);
        });

    const NUM_ROWS = 10;
    let pageIndex = 0;

    function genData(pIndex = 0) {
        const dataBlob = {};
        for (let i = 0; i < NUM_ROWS; i++) {
            const ii = (pIndex * NUM_ROWS) + i;
            dataBlob[`${ii}`] = `row - ${ii}`;
        }
        return dataBlob;
    }

    class IslandList extends React.Component {
        constructor(props) {
            super(props);
            const dataSource = new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            });

            this.state = {
                dataSource,
                isLoading: true,
            };
        }

        componentDidMount() {
            setTimeout(() => {



                this.rData = data;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    isLoading: false,
                });
            }, 600);
        }

        onEndReached = (event) => {

            if (this.state.isLoading && !this.state.hasMore) {
                return;
            }
            console.log('reach end', event);
            this.setState({ isLoading: true });
            setTimeout(() => {
                this.rData = { ...this.rData };
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    isLoading: false,
                });
            }, 1000);
        }

        render() {
            const separator = (sectionID, rowID) => (
                <div
                    key={`${sectionID}-${rowID}`}
                    style={{
                        backgroundColor: '#F5F5F9',
                        height: 8,
                        borderTop: '1px solid #ECECED',
                        borderBottom: '1px solid #ECECED',
                    }}
                />
            );
            let index = data.length - 1;
            const row = (rowData, sectionID, rowID) => {
                if (index < 0) {
                    index = data.length - 1;
                }
                let show_sn = '岛主不愿意显示'
                let start;
                const obj = data[index--];
                if (obj.island_allow_sn == '1') {
                    show_sn = obj.island_sn;
                }

                if(obj.island_start===''){
                    start='0';
                }else{
                    start=obj.island_start;
                }

                function show() {

                }
                return (
                    <div>
                        <div>
                            <List.Item extra={<Button type="primary" size="small" inline onClick={() => operation([
                                { text: '登岛密码:' + obj.island_password, onPress: () => console.log('预约成功') },
                            ])}>预约登岛</Button>} multipleLine>
                                <span style={{ fontSize: '30px', color: '#FF6E27' }}>¥{obj.island_price} </span>
                                <span style={{ fontSize: '15px', color: 'grey' }}> {start + '-' + obj.island_end + '点开放'} </span>
                                <List.Item.Brief>
                                    <div>岛主编号:{show_sn}</div>
                                    <div>登岛条件:{obj.island_condition}</div>
                                </List.Item.Brief>
                            </List.Item>
                        </div>
                    </div>
                );
            };
            return (
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderHeader={() => <span>查看今天的收购价</span>}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    renderRow={row}
                    renderSeparator={separator}
                    className="am-list"
                    pageSize={4}
                    useBodyScroll
                    onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />
            );
        }
    }

    const Item = List.Item;
    const std = { 0: 0, 3: 3, 6: 6, 9: 9, 12: 12, 15: 15, 18: 18, 21: 21, 24: 24 }

    class BasicInput extends React.Component {
        state = {
            value: 1,
        }
        onSubmit = () => {
            this.props.form.validateFields({ force: true }, (error, value) => {
                if (!error) {
                    console.log(this.props.form.getFieldsValue());
                } else {
                    alert('您输入的岛屿信息不合理哦！');
                }
                let allow_sn;
                if (value.register_island_allow_sn === true) {
                    allow_sn = '1';
                } else {
                    allow_sn = '0';
                }

                if (value.register_island_time === undefined) {
                    Toast.fail('请选择开放岛屿的时间段哦！', 1);
                }

                axios.post('/get_account', {
                    search_username: username,
                })
                    .then(function (response) {
                        let get_sn = response.data[0].sn
                        console.log('get sn:' + get_sn);
                        axios.post('/register_island', {
                            island_price: value.register_island_price,
                            island_password: value.register_island_password,
                            island_condition: value.register_island_condition,
                            island_allow_sn: allow_sn,
                            island_start: value.register_island_time[0],
                            island_end: value.register_island_time[1],
                            island_sn: get_sn,
			    island_num: '0'
                        })
                            .then(function (response) {

                                console.log(response.data);
                                if (response.data == 'register island success') {
                                    Toast.success('提交岛屿信息成功！', 1);
                                    history.push(`/Home/` + username);
                                } else {
                                    Toast.fail('提交岛屿信息失败！', 1);
                                };
                            })
                            .catch(function (error) {
                                console.log(error);
                                Toast.fail('请勿重复提交岛屿信息！', 1);
                            });

                    })
                    .catch(function (error) {
                        console.log(error);

                    });


            });
        }
        onReset = () => {
            this.props.form.resetFields();
        }
        validateAccount = (rule, value, callback) => {
            if (value > 100) {
                callback();
            } else {
                callback(new Error('价格应大于100'));
            }
        }
        render() {
            const { getFieldProps, getFieldError } = this.props.form;

            return (<form>
                <List
                    renderHeader={() => '公布您的岛屿'}
                    renderFooter={() => getFieldError('register_island_price') && getFieldError('register_island_price').join(',')}
                >
                    <InputItem
                        {...getFieldProps('register_island_price', {
                            // initialValue: 'little ant',
                            rules: [
                                { required: true, message: '请输入收购价' },
                                { validator: this.validateAccount },
                            ],
                        })}
                        clear
                        error={!!getFieldError('register_island_price')}
                        onErrorClick={() => {
                            alert(getFieldError('register_island_price').join('且'));
                        }}
                        placeholder="请输入收购价"
                    >收购价</InputItem>
                    <InputItem {...getFieldProps('register_island_password')} placeholder="请输入岛屿密码" type="password">
                        登岛密码
                </InputItem>
                    <InputItem
                        {...getFieldProps('register_island_condition', {
                            // initialValue: 'little ant',
                        })}
                        placeholder="设置您的登岛条件"
                    >登岛条件</InputItem>

                    <Item
                        extra={<Switch {...getFieldProps('register_island_allow_sn', { initialValue: true, valuePropName: 'checked' })} />}
                    >公布SN号</Item>
                    <Item>
                        <div>岛屿开放时间段</div>
                        <div style={{ padding: 20, height: 50 }}>
                            <Range {...getFieldProps('register_island_time')} defaultValue={[0, 24]} min={0}
                                max={24} step={1} marks={std} /></div></Item>
                    <Item>
                        <Button type="primary" onClick={this.onSubmit}>发布</Button>
                    </Item>
                </List>
            </form>);
        }
    }

    const BasicInputWrapper = createForm()(BasicInput);

    class Navi extends React.Component {
        state = {
            visible: false,
            selected: '',
        };
        onSelect = (opt) => {
            console.log(opt.props.value);
            if (opt.props.value == 'quit') {
                history.push(`/`);
            }
            if (opt.props.value == 'delete') {

                axios.post('/get_account', {
                    search_username: username,
                })
                    .then(function (response) {
                        let get_sn = response.data[0].sn
                        console.log('get sn:' + get_sn);
                        axios.post('/delete_island', {
                            sn: get_sn
                        })
                            .then(function (response) {

                                console.log(response.data);
                                if (response.data == 'no island find') {
                                    Toast.fail('未找到您提交的岛屿信息！', 1);
                                    history.push(`/Home/` + username);
                                } else if (response.data == 'island delete success') {
                                    Toast.fail('删除岛屿成功！', 1);
                                    history.push(`/Home/` + username);
                                };
                            })
                            .catch(function (error) {
                                console.log(error);
                                Toast.fail('请勿重复提交岛屿信息！', 1);
                            });

                    })
                    .catch(function (error) {
                        console.log(error);

                    });
            }
            this.setState({
                visible: false,
                selected: opt.props.value,
            });
        };
        handleVisibleChange = (visible) => {
            this.setState({
                visible,
            });
        };
        render() {
            return (<div>
                <NavBar
                    mode="light"
                    rightContent={
                        <Popover mask
                            overlayClassName="fortest"
                            overlayStyle={{ color: 'currentColor' }}
                            visible={this.state.visible}
                            overlay={[
                                (<PopItem key="0" value="quit">退出登录</PopItem>),
                                (<PopItem key="1" value="delete">删除岛屿</PopItem>),
                            ]}
                            align={{
                                overflow: { adjustY: 0, adjustX: 0 },
                                offset: [-10, 0],
                            }}
                            onVisibleChange={this.handleVisibleChange}
                            onSelect={this.onSelect}
                        >
                            <div style={{
                                height: '100%',
                                padding: '0 15px',
                                marginRight: '-15px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            >
                                <Icon type="ellipsis" />
                            </div>
                        </Popover>
                    }
                >
                    你好，{username}
                </NavBar>
            </div>);
        }
    }
    return (
        <div>
            <Navi />
            <Tabs tabs={tabs}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
                <div>
                    <IslandList />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', direction: 'column' }}>
                    <BasicInputWrapper />
                </div>
            </Tabs>
            <WhiteSpace />
        </div>);
}




export default Home;
