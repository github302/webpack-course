import React from 'react';
import ReactDOM from 'react-dom';
import './search.scss';
import logo from './images/logo.png';
import shape from './images/shape.svg';
class Search extends React.Component {
    render() {
        return (
            <div>
                <p className="search-text">搜索文字111search page4而恶热</p>
                <img src={logo} />
                <img src={shape} />
            </div>
        )
    }
};

ReactDOM.render(<Search/>, document.getElementById('root'));