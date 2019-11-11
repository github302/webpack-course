import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InputHoc from './components/input_hoc';

class HocDemo extends Component {
    render() {
        return (
            <InputHoc/>
        )
    }
}

ReactDOM.render(<HocDemo></HocDemo>, document.getElementById("app"));