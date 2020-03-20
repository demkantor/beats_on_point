import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';



class PhotoEdit extends Component {

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
        });
    }

    submit=(event)=>{
        event.preventDefault();
        console.log('just commenting', this.state.filename, this.props.reduxState.user.id);
        const formData = new FormData();
        formData.append('file', this.state.file);
        const image = ({pic: formData, id: this.props.reduxState.user.id});
        this.props.dispatch({type: 'WANT_YOUR_PICTURE', payload: image});
    }

    cheapClick=()=>{
        this.refs.fileUploader.click();
    }

  render() {
    return (
      <>
        <div className='photoEdit'>
            <form  className="photoForm" onSubmit={this.submit}>
                 <div className="photoInput">
                    <input type="file" ref="fileUploader" onChange={this.handleChange} />
                    <label htmlFor="file" className="photoUpload" onClick={this.cheapClick}>Choose</label>
                 </div>
                <div>
                    {this.state.file 
                    ?
                    <div className="previewImage">
                        <p>preview: <strong>{this.state.filename}</strong></p>
                        <img src={this.state.image} alt='' width="250px"/>   
                    </div>
                    :
                    <div className="previewImage">
                        <p>a preview of your image will display below </p>
                        <img src="/images/preview.png" alt='' width="250px"/>
                    </div>
                    }
                </div>
                <input type='submit'value='Upload'className="log-in"/>
            </form>
        </div>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
  export default connect(putReduxStateOnProps)(PhotoEdit);