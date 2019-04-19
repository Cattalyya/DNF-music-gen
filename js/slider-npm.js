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

// import React from "react";
// import { MDBRangeInput, MDBRow, MDBContainer } from "mdbreact";

// const SliderPage = () => {
//     return (
//       <MDBContainer>
//         <MDBRow center>
//           <span className="font-weight-bold indigo-text mr-2">0</span>
//           <MDBRangeInput
//             min={0}
//             max={100}
//             value={50}
//             formClassName="w-25"
//           />
//           <span className="font-weight-bold indigo-text ml-2">100</span>
//         </MDBRow>
//         <MDBRow center>
//           <span className="font-weight-bold blue-text mr-2">0</span>
//           <MDBRangeInput
//             min={0}
//             max={100}
//             value={50}
//             formClassName="w-50"
//           />
//           <span className="font-weight-bold blue-text ml-2">100</span>
//         </MDBRow>
//         <MDBRow center>
//           <span className="font-weight-bold purple-text mr-2">0</span>
//           <MDBRangeInput
//             min={0}
//             max={100}
//             value={50}
//             formClassName="w-75"
//           />
//           <span className="font-weight-bold purple-text ml-2">100</span>
//         </MDBRow>
//       </MDBContainer>
//     );
// }
// 
import React from 'react';
import ReactDOM from 'react-dom';
import Slider, { Range } from 'rc-slider';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

ReactDOM.render(
  <div>
    <Slider />
    <Range />
  </div>,
  container
);

// ReactDOM.render(<SliderPage/>, document.getElementById('latent-space-sliders'));

// export default SliderPage;