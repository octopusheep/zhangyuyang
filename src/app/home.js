import React from 'react';

// import ant design mobile
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import { WhiteSpace, NavBar, List, InputItem, Tabs, Badge, Button, Toast, Icon } from 'antd-mobile';

var username = 'durian';

const tabs = [
    { title: <Badge dot>买</Badge> },
    { title: <Badge dot>卖</Badge> },
];

const Home = () => (
    <div>
        <NavBar mode="light" rightContent={[
            <Icon key="0" type="ellipsis" />,
        ]}>你好，{username}</NavBar>
        <Tabs tabs={tabs}
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
            <div>
                <StockList />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', direction: 'column' }}>
                <List renderHeader={() => '欢迎使用'}>
                    <InputItem
                        type="price"
                        placeholder="请输入您的大头菜收购价"
                    >收购价</InputItem>
                    <InputItem
                        type="password_island"
                        placeholder="请输入您的登岛密码"
                    >登岛密码</InputItem>
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


function registerButton() {
    Toast.success('Register success !!!', 1);
}

const Item = List.Item;
const Brief = Item.Brief;

class StockList extends React.Component {
    state = {
        disabled: false,
    }

    render() {
        return (<div>
            <List renderHeader={() => 'Basic Style'} className="my-list">
                <Item extra={'extra content'}>Title</Item>
            </List>
            <List renderHeader={() => 'Subtitle'} className="my-list">
                <Item arrow="horizontal" multipleLine onClick={() => { }}>
                    Title <Brief>subtitle</Brief>
                </Item>
                <Item
                    arrow="horizontal"
                    multipleLine
                    onClick={() => { }}
                    platform="android"
                >
                    ListItem （Android）<Brief>There may have water ripple effect of <br /> material if you set the click event.</Brief>
                </Item>
                <Item
                    arrow="horizontal"
                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    multipleLine
                    onClick={() => { }}
                >
                    Title <Brief>subtitle</Brief>
                </Item>
            </List>
            <List renderHeader={() => 'Customized Right Side（Empty Content / Text / Image）'} className="my-list">
                <Item>Title</Item>
                <Item arrow="horizontal" onClick={() => { }}>Title</Item>
                <Item extra="extra content" arrow="horizontal" onClick={() => { }}>Title</Item>
                <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                    Title <Brief>subtitle</Brief>
                </Item>
            </List>
            <List renderHeader={() => 'Align Vertical Center'} className="my-list">
                <Item multipleLine extra="extra content">
                    Title <Brief>subtitle</Brief>
                </Item>
            </List>
            <List renderHeader={() => 'Icon in the left'}>
                <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    arrow="horizontal"
                    onClick={() => { }}
                >My wallet</Item>
                <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                    onClick={() => { }}
                    arrow="horizontal"
                >
                    My Cost Ratio
          </Item>
            </List>
            <List renderHeader={() => 'Text Wrapping'} className="my-list">
                <Item data-seed="logId">Single line，long text will be hidden with ellipsis；</Item>
                <Item wrap>Multiple line，long text will wrap；Long Text Long Text Long Text Long Text Long Text Long Text</Item>
                <Item extra="extra content" multipleLine align="top" wrap>
                    Multiple line and long text will wrap. Long Text Long Text Long Text
          </Item>
                <Item extra="no arrow" arrow="empty" className="spe" wrap>
                    In rare cases, the text of right side will wrap in the single line with long text. long text long text long text
          </Item>
            </List>
            <List renderHeader={() => 'Other'} className="my-list">
                <Item disabled={this.state.disabled} extra="" onClick={() => { console.log('click', this.state.disabled); this.setState({ disabled: true }); }}>Click to disable</Item>
                <Item>
                    <select defaultValue="1">
                        <option value="1">Html select element</option>
                        <option value="2" disabled>Unable to select</option>
                        <option value="3">option 3</option>
                    </select>
                </Item>
            </List>
        </div>);
    }
}

export default Home;