import React, { Component } from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
const Handle = Slider.Handle;

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

class StepSlider extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            stepsize: this.props.stepsize,
            defaultValue: this.props.defaultValue,
            marks: this.props.marks,
        };

        if (this.props.isT) {
            window.t_slider = this;
        }

    }

    render() {
        return <Slider min={this.props.min} 
            max={this.props.max} 
            step={this.state.stepsize} 
            handle={showTooltip} 
            marks={this.props.marks}
            defaultValue={this.props.defaultValue}
            onAfterChange={this.props.onchange} 
            key={this.props.key}  />;
    }

}

export default StepSlider;

