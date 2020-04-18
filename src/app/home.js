import React from 'react';
// import ant design mobile
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import { WhiteSpace, NavBar, List, InputItem, Tabs, Badge, Button, Toast, Icon, ListView, Switch, Popover, Range } from 'antd-mobile';
import { useParams,useHistory} from "react-router-dom";
import { createForm } from 'rc-form';





function Home() {
    
    let history = useHistory();
    const tabs = [
        { title: <Badge dot>买</Badge> },
        { title: <Badge dot>卖</Badge> },
    ];

    let { username } = useParams();

    function publicButton() {
        Toast.success('Public information success !!!', 1);
    }

    const Item = Popover.Item;

    class Navi extends React.Component {
        state = {
            visible: false,
            selected: '',
        };
        onSelect = (opt) => {
            console.log(opt.props.value);
            if(opt.props.value=='quit'){
                history.push(`/`);
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
                                (<Item key="0" value="quit">退出登录</Item>),
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
                    <Demo />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', direction: 'column' }}>
                    <BasicInputWrapper />
                </div>
            </Tabs>
            <WhiteSpace />
        </div>);
}

const data = [
    {
        data_username: 'apple',
        data_sn: '15556951659',
        data_price: '350',
        data_require: '机票一张',
        data_time_start: '8',
        data_time_end: '10',
        data_visitor_count: '5'
    },
];
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

class Demo extends React.Component {
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
            this.rData = genData();
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
            this.rData = { ...this.rData, ...genData(++pageIndex) };
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
            const obj = data[index--];
            return (
                <div>
                    <div>
                        <List.Item extra={<Button type="primary" size="small" inline>预约登岛</Button>} multipleLine>
                            <span style={{ fontSize: '30px', color: '#FF6E27' }}>¥{obj.data_price} </span>
                            <span style={{ fontSize: '15px', color: 'grey' }}> {obj.data_time_start + '-' + obj.data_time_end + '点开放'} </span>
                            <List.Item.Brief>
                                <div>岛主编号:{obj.data_sn}</div>
                                <div>登岛条件:{obj.data_require}</div>
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
        this.props.form.validateFields({ force: true }, (error) => {
            if (!error) {
                console.log(this.props.form.getFieldsValue());
            } else {
                alert('Validation failed');
            }
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
                renderFooter={() => getFieldError('price') && getFieldError('price').join(',')}
            >
                <InputItem
                    {...getFieldProps('price', {
                        // initialValue: 'little ant',
                        rules: [
                            { required: true, message: '请输入收购价' },
                            { validator: this.validateAccount },
                        ],
                    })}
                    clear
                    error={!!getFieldError('price')}
                    onErrorClick={() => {
                        alert(getFieldError('price').join('且'));
                    }}
                    placeholder="请输入收购价"
                >收购价</InputItem>
                <InputItem {...getFieldProps('password')} placeholder="请输入岛屿密码" type="password">
                    登岛密码
                </InputItem>
                <InputItem
                    {...getFieldProps('requirment', {
                        // initialValue: 'little ant',
                    })}
                    placeholder="设置您的登岛条件"
                >登岛条件</InputItem>

                <Item
                    extra={<Switch {...getFieldProps('1', { initialValue: true, valuePropName: 'checked' })} />}
                >公布SN号</Item>
                <Item>
                    <div>岛屿开放时间段</div>
                    <div style={{ padding: 20, height: 50 }}>
                        <Range defaultValue={[8, 16]} min={0}
                            max={24} step={1} marks={std} /></div></Item>
                <Item>
                    <Button type="primary" onClick={this.onSubmit}>发布</Button>
                </Item>
            </List>
        </form>);
    }
}

const BasicInputWrapper = createForm()(BasicInput);

export default Home;