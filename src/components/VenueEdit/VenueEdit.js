import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';
import Swal from 'sweetalert2'



class VenueEdit extends Component {

    componentDidMount=()=>{
        const user = this.props.reduxState.user;
        console.log(user.username);
        this.props.dispatch({type: 'GET_THIS_VENUE', payload: user.id});
    }

    twitterEdit=()=>{
      console.log('you in twitter');
    }

    facebookEdit=()=>{
      console.log('you in facebook');
    }

    wwwEdit=()=>{
      console.log('you in www');
    }

    youtubeEdit=()=>{
      console.log('you in youtube');
    }

    nameEdit=()=>{
      console.log('whats in a name');
    }

    descriptionEdit=()=>{
      console.log('describe me');
    }

    photoEdit=()=>{
      console.log('takin pictures');
    }

  render() {
    return (
      <>
        {this.props.reduxState &&
        <h1>Welcome {this.props.reduxState.user.username}</h1>
        }
        <div className='profileEdit'>
            {this.props.reduxState.editProfile.editVenueReducer
            && (
            <>
                {this.props.reduxState.editProfile.editVenueReducer.map(gig => (
                <div className="profileViewEdit" key={gig.id}>
                    <div className="nameEdit">
                        <p className="profileName" >Band Name: <strong>{gig.name}</strong></p>
                        <img className="editButton" src='./images/edit.png' alt="edit" onClick={this.nameEdit}/>
                    </div>    
                    <div className="bioPhotoEdit">
                        <img className="editBioPhoto" src={`data:image/png;base64,${gig.photo}`} alt={gig.name}/>
                        <img className="editButton" src='./images/edit.png' alt="edit" onClick={this.photoEdit}/>
                    </div>
                    <div className="bioDescriptionEdit">
                        {gig.description}
                        <img className="editButton" src='./images/edit.png' alt="edit" onClick={this.descriptionEdit}/>
                    </div>
                    <div className="socialMediaEdit">
                        <img className="linkIcon" src="/images/twitter.png" alt="twitter"/>
                        <img className="editLinkIcon" src="/images/pencil.png" alt="edit" onClick={this.twitterEdit}/>
                        <img className="linkIcon" src="/images/facebook.png" alt="facebook"/>
                        <img className="editLinkIcon" src="/images/pencil.png" alt="edit" onClick={this.facebookEdit}/>                        
                        <img className="linkIcon" src="/images/www.png" alt="website"/>
                        <img className="editLinkIcon" src="/images/pencil.png" alt="edit" onClick={this.wwwEdit}/>                        
                        <img className="linkIcon" src="/images/youtube.png" alt="youtube"/>
                        <img className="editLinkIcon" src="/images/pencil.png" alt="edit" onClick={this.youtubeEdit}/>                   
                    </div>
                </div>
              ))}
            </>
            )}
        </div>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
  export default connect(putReduxStateOnProps)(VenueEdit);