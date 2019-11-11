import { helloWorld, Hello } from './helloworld';
import React from 'react';
import ReactDOM from 'react-dom';
import Plugin from 'react-plugin-test-xy';
import 'react-plugin-test-xy/lib/main.css';
import './index.css';

class App extends React.Component {
    render() {
        return (
            <div className="app-text">
                {helloWorld()}
                <Hello />
                <Plugin />
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById("root"));