import React, {Component} from 'react'
import '../App/App.css';


// curently unused component, this is to make a popUp modal thats reuseable

//also will need to import this component where used


//the below is a small bit that could go into app.css
//but would change it to look better

    // .popup {
    //   position: fixed;
    //   width: 100%;
    //   height: 100%;
    //   top: 0;
    //   left: 0;
    //   right: 0;
    //   bottom: 0;
    //   margin: auto;
    //   background-color: rgba(0,0,0, 0.5);
    // }
    // .popup_inner {
    //   position: absolute;
    //   left: 25%;
    //   right: 25%;
    //   top: 25%;
    //   bottom: 25%;
    //   margin: auto;
    //   border-radius: 20px;
    //   background: white;
    // }



class PopUp extends Component {


  //if to be used later then everything between here and render will need to go in other component


  // state = { 
  //   showPopUp: false
  // }


//togglePopUp=()=>{
//   this.setState({showPopUp: !this.state.showPopUp});  
// }


 //this will go in retun somewhere
  // {this.state.showPopUp &&
  //   <>
  //   <PopUp
  //       src={gig.twitter} 
  //       closePopUp={this.togglePopUp} 
  //   />
  //   </>
  //   }
  //<button onClick={this.togglePopUp}>click</button>

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
        <button onClick={this.props.closePopUp}>close me</button>
        <a href="https://google.com" target="_blank" rel="noreferrer noopener">
        <img className="linkIcons" src="/images/youtube.png" alt=''/></a>
        <a href="https://www.google.com" target="_blank" rel="noreferrer noopener">
        <img className="linkIcons" src="/images/youtube.png" alt=''/></a>
        </div>
      </div>
    );
  }
}


export default PopUp;