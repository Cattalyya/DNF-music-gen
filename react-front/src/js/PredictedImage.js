import React, { Component } from 'react';

class PredictedImage extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            latest_update: Date.now(), // prevent cached
        };

        window.predictedImage = this;
    }

    render() {
        return <img src={`${this.props.src}?${this.state.latest_update}`} alt="pianorolls" className="img-thumbnail" />;
    }

}

export default PredictedImage;

