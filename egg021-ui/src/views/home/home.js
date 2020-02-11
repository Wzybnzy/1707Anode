import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div>
                <header>
                    <span>姓名：</span>
                    <span>身份：</span>
                </header>
                <div className="wrapper">
                    <div className="left">
                        <ul>
                            <li>左侧列表</li>
                        </ul>
                    </div>
                    <div className="right">
                        二级视图
                    </div>
                </div>
            </div>
        )
    }
}
