import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';



class BandEdit extends Component {

    state={
        file: '',
        filename: "No File Selected",
        image: null
    }

    handleChange=(event)=>{
        this.setState({
            file: event.target.files[0],
            filename: event.target.files[0].name,
            image: URL.createObjectURL(event.target.files[0])
        })
    }

    submit=(event)=>{
        event.preventDefault();
        console.log('just commenting', this.state.filename)
    }


  render() {
    return (
      <>
        <div className='bandEdit'>
            <form onSubmit={this.submit}>
                <div className="photoForm">
                    <input type="file" className="photoInput" onChange={this.handleChange} />
                </div>
                <input type='submit'value='Upload'className="log-in"/>
            </form>
            <div>
                {this.state.file ?
                <div className="previewImage">
                    <p>preview: <strong>{this.state.filename}</strong></p>
                    <img src={this.state.image} alt='' width="150px"/>   
                </div>
                : null}
            </div>
        </div>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
  export default connect(putReduxStateOnProps)(BandEdit);