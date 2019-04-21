import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/main.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import request from 'request'


import App from './js/App';
import PredictedImage from './js/PredictedImage';
import StepSlider from './js/StepSlider';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

const Handle = Slider.Handle;


const LATENT_SPACE_DIM = 32;
const HILBERT_SPACE_DIM = 2;

var refreshImage = function() {
  if (window.predictedImage) {
      window.predictedImage.setState({
          latest_update: Date.now(),
      })
  }
}

var changeZ = function(value, z_id){
    request.post(
        {
          url:    'http://127.0.0.1:5000/onchangeZ',
          form:   { value: value, z_id: z_id },
        }, 
        function(error, response, body){
            refreshImage();
        }
    );
}


var changeP = function(value){
    request.post(
        {
          url:    'http://127.0.0.1:5000/onchangeP',
          form:   { value: value },
        }, 
        function(error, response, body){
            refreshImage();
        }
    );
}

var changeT = function(value){
    request.post(
        {
          url:    'http://127.0.0.1:5000/onchangeT',
          form:   { value: value },
        }, 
        function(error, response, body){
            refreshImage();
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
  <PredictedImage src="imgs/pianorolls/current.png" />,
  document.getElementById('pianorollimg-div')
);

ReactDOM.render(
  <div>
    {[...Array(LATENT_SPACE_DIM).keys()].map((item, index) => (
      <StepSlider step={0.01} 
          min={-1}
          max={1}
          marks={{0: 0, 1: 1}} 
          onchange={value => changeZ(value, index)}
          defaultValue={window.zs[index]}
          key={index}  />
      ))
    }
  </div>,
  document.getElementById('latent-space-sliders')
);

ReactDOM.render(
  <div>
      <StepSlider step={1} 
          min={1}
          max={50}
          marks={{1: 1, 50: 50}} 
          onchange={value => changeP(value)}
          defaultValue={1}
          key={100}  />
      <StepSlider step={0.01} 
          min={0}
          max={1}
          marks={{0: 0, 1: 1}} 
          onchange={value => changeT(value)}
          defaultValue={0.5}
          key={101}  />
  </div>,
  document.getElementById('hilbert-space-sliders')
);




// console.log("AFTER RENDER:", window.zs);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
