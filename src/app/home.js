import React from 'react';

// import ant design mobile
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import { WhiteSpace, NavBar, List, InputItem, Tabs, Badge, Button, Toast, Icon, ListView } from 'antd-mobile';
import { useParams } from "react-router-dom";

const tabs = [
    { title: <Badge dot>买</Badge> },
    { title: <Badge dot>卖</Badge> },
];

const Item = List.Item;

function Home() {

    let { username } = useParams();

    function publicButton() {
        Toast.success('Public information success !!!', 1);
    }
    return (
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
                        <Button type="primary" onClick={publicButton}>发布</Button><WhiteSpace />
                    </List>

                </div>
            </Tabs>
            <WhiteSpace />
        </div>);
}

class StockList extends React.Component {
    state = {
        disabled: false,
    }

    render() {
        return (<div>
            <List renderHeader={() => 'Basic Style'} className="my-list">
                <Item extra={'extra content'}>Title</Item>
                <Item extra={'extra content'}>Title</Item>
                <Item extra={'extra content'}>Title</Item>
                <Item extra={'extra content'}>Title</Item>
                <Item extra={'extra content'}>Title</Item>
                <Item extra={'extra content'}>Title</Item>
                <Item extra={'extra content'}>Title</Item>
                <Item extra={'extra content'}>Title</Item>
                <Item extra={'extra content'}>Title</Item>
                <Item extra={'extra content'}>Title</Item>
                <Item extra={'extra content'}>Title</Item>
                <Item extra={'extra content'}>Title</Item>
                <Item extra={'extra content'}>Title</Item>
                <Item extra={'extra content'}>Title</Item>
                <Item extra={'extra content'}>Title</Item>
                <Item extra={'extra content'}>Title</Item>

            </List>
        </div>);
    }
}

export default Home;