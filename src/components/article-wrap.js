import React, { Component } from 'react';
import '../sass/article.scss';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from "react-router-dom";

class ArticleWrap extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            {this.props.article.map(el => {
                return <div key={el.title} className="article transition" id={el.title}>
                 <div className="flag-outer-wrap">
                    <div className="flag-wrap">
                        <div className="circle"></div>
                        <div className="short-line"></div>
                        <div className="flag">{el.year}</div>
                    </div> 
                    <div className="flag-space"></div> 
                </div> 
                <div className="article-wrap">
                    <div className="movie-img transition"><img src={`${process.env.PUBLIC_URL}/images/article/${el.img}`} alt="" /></div>
                    <div className="movie-text transition">
                        <div className="name">{el.name}</div>
                        <div className="title">{el.title}</div>
                        <div className="content">{el.content}</div>
                        <Link to="/article" className="read-more">閱讀全文</Link>
                    </div>
                </div>
            </div>
            })}
        </div>
        );
    }
}

export default ArticleWrap;
