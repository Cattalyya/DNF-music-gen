import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/main.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './js/App';
import PredictedImage from './js/PredictedImage';
import * as serviceWorker from './serviceWorker';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import request from 'request'
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

const Handle = Slider.Handle;

const LATENT_SPACE_DIM = 32;

var changeZ = function(value, z_id){
    request.post(
        {
          url:    'http://127.0.0.1:5000/onchange',
          form:   { value: value, z_id: z_id },
        }, 
        function(error, response, body){
            if (window.predictedImage) {
                window.predictedImage.setState({
                    latest_update: Date.now(),
                })
            }
        }
    );
}


const showTooltip = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

ReactDOM.render(
  <div>
    {[...Array(LATENT_SPACE_DIM).keys()].map((item, index) => (
      <Slider 
        min={-1} max={1} step={0.01} marks={{ 0: 0, 1:1, "-1": "-1"}} 
        handle={showTooltip} 
        onAfterChange={value => changeZ(value, index)} 
        defaultValue={window.zs[index]}
        key={index}  />
      ))
    }
  </div>,
  document.getElementById('latent-space-sliders')
);

ReactDOM.render(
  <PredictedImage src="imgs/pianorolls/current.png" />,
  document.getElementById('pianorollimg-div')
);

// console.log("AFTER RENDER:", window.zs);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
