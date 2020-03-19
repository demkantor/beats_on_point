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
      <>
        <div className='lebowskiContainer'>
          <h1 className="dude">"Yeah well, that's just, ya know, like, your opinion, man."</h1>
          <p className="dude">"The Dude"</p>
          <button className="moreDude" onClick={this.moreFromTheDude} >More from The Dude</button>
          <br/>
          <br/>
            {this.props.reduxState.lebowskiReducer.quote && (
                <div className="dude">
                  {this.props.reduxState.lebowskiReducer.quote.lines.map(rug => (
                    <div className="display" key={rug.id}>
                      <h4>{rug.text}</h4>
                      <p>{rug.character.name}</p>
                    </div>
                    ))}
                  </div>
                )}
          </div>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
  export default connect(putReduxStateOnProps)(Lebowski);