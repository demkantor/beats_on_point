import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';
import swal from 'sweetalert';
import Swal from 'sweetalert2'



class BandEdit extends Component {

    componentDidMount=()=>{
        const user = this.props.reduxState.user;
        console.log(user.username);
        this.props.dispatch({type: 'GET_THIS_BAND', payload: user.id});
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

    descriptionEdit=(bandId)=>{
          swal("New Bio Here....", {
            content: "input",
          })
          .then((value) => {
            swal(`You typed: ${value}`)
            return(value)
          }).then((value)=>{
          swal({
            title: `Do you want to keep your new bio?`,
            text: `${value}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((keep) => {
            if (keep) {
              swal("You new bio has been saved!", {
                icon: "success",
              });
            this.props.dispatch({type: 'EDIT_BAND_DESCRIPTION', payload:{edit: value, id: bandId}})
            } else {
              swal("Not touching your bio!");
            }
          });
       })
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
            {this.props.reduxState.editProfile.editBandReducer
            && (
            <>
                {this.props.reduxState.editProfile.editBandReducer.map(gig => (
                <div className="profileViewEdit" key={gig.id}>
                    <div className="nameEdit">
                        <p className="profileName" >Band Name: <strong>{gig.name}</strong></p>
                        <img className="editButton" src='./images/edit.png' alt="edit" onClick={()=>this.nameEdit(gig.id)}/>
                    </div>    
                    <div className="bioPhotoEdit">
                        <img className="editBioPhoto" src={`data:image/png;base64,${gig.photo}`} alt={gig.name}/>
                        <img className="editButton" src='./images/edit.png' alt="edit" onClick={()=>this.photoEdit(gig.id)}/>
                    </div>
                    <div className="bioDescriptionEdit">
                        {gig.description}
                        <img className="editButton" src='./images/edit.png' alt="edit" onClick={()=>this.descriptionEdit(gig.id)}/>
                    </div>
                    <div className="socialMediaEdit">
                        <img className="linkIcon" src="/images/twitter.png" alt="twitter"/>
                        <img className="editLinkIcon" src="/images/pencil.png" alt="edit" onClick={()=>this.twitterEdit(gig.id)}/>
                        <img className="linkIcon" src="/images/facebook.png" alt="facebook"/>
                        <img className="editLinkIcon" src="/images/pencil.png" alt="edit" onClick={()=>this.facebookEdit(gig.id)}/>                        
                        <img className="linkIcon" src="/images/www.png" alt="website"/>
                        <img className="editLinkIcon" src="/images/pencil.png" alt="edit" onClick={()=>this.wwwEdit(gig.id)}/>                        
                        <img className="linkIcon" src="/images/youtube.png" alt="youtube"/>
                        <img className="editLinkIcon" src="/images/pencil.png" alt="edit" onClick={()=>this.youtubeEdit(gig.id)}/>                   
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
  
  export default connect(putReduxStateOnProps)(BandEdit);