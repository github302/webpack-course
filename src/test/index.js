import join from 'lodash/join';
import MyImage from './bg.png';
import './index.css';
import config from './index.json';
import printMe from './print';


function component() {
    const element = document.createElement("div");
    element.innerHTML = join(['Hello', 'webpack', config.Hello], ' ');
    element.classList.add('hello');

    const btn = document.createElement('btn');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);

    const icon = new Image();
    icon.src = MyImage;
    element.appendChild(icon);

    return element
}

document.body.appendChild(component());