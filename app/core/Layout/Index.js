import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PageLayout } from 'rs-page';
import Header from 'app/components/common/Header';
import MainContent from 'app/components/common/MainContent';
import Footer from 'app/components/common/Footer';

export default class Layout extends PageLayout {
    // 使用 redux 以后，此处静态方法大部分情况下无需调用
    static init(Component) {
        ReactDOM.render(<Component />, document.getElementById('app'));
    }

    system = {
        name: 'Mocker'
    }

    renderHeader() {
        return <Header system={this.system} />
    }

    renderMain() {
        return (
            <MainContent>
                {this.renderContent()}
            </MainContent>
        )
    }

    renderContent() {
        return '请自行覆盖renderContent方法';
    }
}
