import React, { Component } from 'react';
import InputHoc from './hoc';
class Input extends Component {
    render() {
        return (
            <input type="text" {...this.props}/>
        )
    }
}
export default InputHoc(Input);