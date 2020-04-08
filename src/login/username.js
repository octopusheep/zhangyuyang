import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

//import css
import './index.css';

// import ant design mobile
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import { Flex, WhiteSpace } from 'antd-mobile';
import { NavBar, Icon } from 'antd-mobile';

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);

const FlexExample = () => (
  <div className="flex-container">
    <Flex justify="center" direction='column'>
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline" />
    </Flex>
  </div>
);


ReactDOM.render(
  <React.StrictMode>
    <NavBar mode="light">Stockeen</NavBar>
    <FlexExample />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
