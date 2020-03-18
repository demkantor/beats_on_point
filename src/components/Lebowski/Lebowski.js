import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';



class Lebowski extends Component {

  //bring in list of images stored in postgres made available by redux
  componentDidMount =()=>{
    this.moreFromTheDude();
  }

  moreFromTheDude =()=>{
    this.props.dispatch({ type: "NOBODY_FUCKS_WITH_THE_JESUS" });
  }

  render() {
    return (
      <div className='container'>
        <h1 className="nav-title">"Yeah well, that's just, ya know, like, your opinion, man."</h1>
        <p>"The Dude"</p>
        <br/>
        <button onClick={this.moreFromTheDude} >More from The Dude</button>
          {this.props.reduxState.lebowskiReducer.quote && (
              <div className="gridContainer">
                {this.props.reduxState.lebowskiReducer.quote.lines.map(rug => (
                  <div className="display" key={rug.id}>
                    <h4>{rug.text}</h4>
                    <p>{rug.character.name}</p>
                  </div>
                  ))}
                </div>
              )}
      </div>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
  export default connect(putReduxStateOnProps)(Lebowski);