// class SliderMe extends React.Component {
//   render() {
//     return <h1>Hello, {this.props.name}</h1>;
//   }
// }

//     //<h1>Hello, {this.props.name}</h1>;

// SliderMe.defaultProps = {
//   name: 'Slider',
//   val: 0.3
// };

// ReactDOM.render(<SliderMe/>, document.getElementById('latent-space-sliders'));


import React, { Component } from 'react'
import Slider from 'react-rangeslider'

class VolumeSlider extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      volume: 0
    }
  }

  handleOnChange = (value) => {
    this.setState({
      volume: value
    })
  }

  render() {
    let { volume } = this.state
    return (
      <Slider
        value={volume}
        orientation="vertical"
        onChange={this.handleOnChange}
      />
    )
  }
}

ReactDOM.render(<VolumeSlider/>, document.getElementById('latent-space-sliders'));

