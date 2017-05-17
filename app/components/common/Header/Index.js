import React from 'react';
import { notification, Icon, Menu, Dropdown } from 'antd';
import { Link } from 'react-router';
import './Index.scss';

const openNotification = () => {
  notification.open({
    message: '任何问题找严伟庆',
    icon: <Icon type="smile-circle" style={{ color: '#2db7f5' }} />
  });
}

const menu = (
  <Menu>
    <Menu.Item><Link to="/docs/readme">文档</Link></Menu.Item>
    <Menu.Item><Link to="/docs/developr_log">开发者日志</Link></Menu.Item>
  </Menu>
);

const Header = (props) => {
  return (
    <header className="navbar"> 
      <div className="container">
        <Link className="pull-left navbar-brand" to="/">
          <h1>{props.system && props.system.name}</h1>
        </Link>
        <ul className="pull-right navbar-nav">
          <li><a onClick={openNotification}>反馈</a></li>
          <li>
            <Dropdown overlay={menu}><Link to="/">你好</Link></Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
