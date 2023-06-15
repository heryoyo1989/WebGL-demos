import _ from 'lodash';
import printMe from './print';
import './style.css';
import InterIcon from './inter_milan.png';

function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'MC'], ' ');
    element.classList.add('hello');

    /*const interIcon = new Image();
    interIcon.src = InterIcon;
    element.appendChild(interIcon);*/

    const btn = document.createElement('button');
    btn.innerHTML = "click me";
    btn.onclick = printMe;
    element.appendChild(btn);
  
    return element;
  }
  
  document.body.appendChild(component());