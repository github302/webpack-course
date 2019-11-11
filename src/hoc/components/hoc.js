import React, { Component } from 'react';
export default (WrappedComponent) => {
    return class EnchancedComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                value: '',
            }
        }

        handleChange = (e) => {
            this.setState({
                value: e.target.value
            })
        }
        
        render() {
            const passProps = {
                value: this.state.value,
                onChange: this.handleChange,
            }
            return (
                <WrappedComponent {...passProps}></WrappedComponent>
            )
        }
    }
}