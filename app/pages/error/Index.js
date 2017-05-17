import React from 'react';
import Layout from 'app/core/Layout';
import './Index.scss';

@Layout.init
export default class Index extends Layout {
  renderMain() {
    return (
      <div className="error-page">
        <img src="http://img.yunshanmeicai.com/weixin-mall/image/nothing.png" />
        <h2>你知道啥是知识的荒原吗? <a href="/">还不快点这里去首页</a></h2>
      </div>
    );
  }
}
