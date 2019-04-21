import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import request from 'request'

// Custom React Components
import App from './js/App';
import PredictedImage from './js/PredictedImage';
import StepSlider from './js/StepSlider';

// css
import './css/index.css';
import './css/main.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-slider/assets/index.css';

const Handle = Slider.Handle;


const LATENT_SPACE_DIM = 32;
const HILBERT_SPACE_DIM = 2;
const HILBERT_DEFAULT_P = 5;
const DEFAULT_STEPSIZE_P5 = 0.0009765625;

var refreshImage = function() {
  if (window.predictedImage) {
      window.predictedImage.setState({
          latest_update: Date.now(),
      })
  }
}

var updateStepsize = function(stepsize) {
  if (window.t_slider) {
      window.t_slider.setState({
          stepsize: stepsize,
      });
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
            var retval = JSON.parse(body);
            updateStepsize(retval.stepsize); 
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
    {[...Array(LATENT_SPACE_DIM - 1).keys()].map((item, index) => (
      <StepSlider stepsize={0.01} 
          min={-1}
          max={1}
          onchange={value => changeZ(value, index)}
          defaultValue={window.zs[index]}
          key={index}  />
      ))
    }
    <StepSlider stepsize={0.01} 
          min={-1}
          max={1}
          marks={{"-1": "-1", 1: 1}} 
          onchange={value => changeZ(value, LATENT_SPACE_DIM - 1)}
          defaultValue={window.zs[LATENT_SPACE_DIM - 1]}
          key={LATENT_SPACE_DIM - 1}  />
  </div>,
  document.getElementById('latent-space-sliders')
);

ReactDOM.render(
  <div>
      <StepSlider stepsize={1} 
          min={1}
          max={50}
          marks={{1: 1, 50: 50}} 
          onchange={value => changeP(value)}
          defaultValue={HILBERT_DEFAULT_P}
          key={100}  />
      <div className="spacediv"></div>
      <StepSlider stepsize={0.1} 
          isT={true}
          // initStepsize={() => changeP(HILBERT_DEFAULT_P)}
          stepsize={DEFAULT_STEPSIZE_P5}
          min={0}
          max={1}
          marks={{0: 0, 1: 1}} 
          onchange={value => changeT(value)}
          defaultValue={0.09842061425981084}
          key={101}  />
  </div>,
  document.getElementById('hilbert-curve-sliders')
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
