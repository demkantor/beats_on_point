import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';
import Swal from 'sweetalert2'
import swal from 'sweetalert';


//this component allows venues to edit thier profile
class VenueEdit extends Component {

  addressEdit=(venueId, type, current)=>{
      console.log('new address');
      const user = this.props.reduxState.user;
      swal(`Current: ${current}`, {
        content: "input",
      })
      .then((value) => {
        swal(`You typed: ${value}`)
        return(value)
      }).then((value)=>{
      swal({
        title: `Correct new address?`,
        text: `${value}`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((keep) => {
        if (keep) {
          swal("Your address has been saved!", {
            icon: "success",
          });
        this.props.dispatch({type: 'EDIT_DETAILS', payload:{edit: value, type: type, id: venueId, who: 'venues', userId: user.id}})
        } else {
          swal("Not touching your address!");
        }
      });
    })
  }

  componentDidMount=()=>{
      const user = this.props.reduxState.user;
      console.log(user.username);
      this.props.dispatch({type: 'GET_THIS_VENUE', payload: user.id});
  }

  descriptionEdit=(venueId, type)=>{
    const user = this.props.reduxState.user;
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
          this.props.dispatch({type: 'EDIT_DETAILS', payload:{edit: value, type: type, id: venueId, who: 'venues', userId: user.id}})
        } else {
          swal("Not touching your bio!");
        }
      });
    })
  }

  nameEdit=(venueId, type, current)=>{
      const user = this.props.reduxState.user;
      swal(`Current: ${current}`, {
        content: "input",
      })
      .then((value) => {
        swal(`You typed: ${value}`)
        return(value)
      }).then((value)=>{
      swal({
        title: `Great name! should we keep it?`,
        text: `${value}`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((keep) => {
        if (keep) {
          swal("Your name has been saved!", {
            icon: "success",
          });
          this.props.dispatch({type: 'EDIT_DETAILS', payload:{edit: value, type: type, id: venueId, who: 'venues', userId: user.id}})
        } else {
          swal("Not touching your name!");
        }
      });
    })
  }

  phoneEdit=(venueId, type, current)=>{
    // console.log('phone number');
    const user = this.props.reduxState.user;
    swal(`Current: ${current}`, {
      content: "input",
    })
    .then((value) => {
      swal(`You typed: ${value}`)
      return(value)
    }).then((value)=>{
    swal({
      title: `Correct new phone number?`,
      text: `${value}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((keep) => {
      if (keep) {
        swal("Your phone number has been saved!", {
          icon: "success",
        });
      this.props.dispatch({type: 'EDIT_DETAILS', payload:{edit: value, type: type, id: venueId, who: 'venues', userId: user.id}})
      } else {
        swal("Not touching your phone number!");
      }
    });
  })
}

  photoEdit=()=>{
    // console.log('takin pictures');
    this.props.history.push('/photo-edit');
  }

  socialMedia=(venueId, type, link)=>{
    const user = this.props.reduxState.user;
    Swal.fire({
      title: `Current: ${link}`,
      input: 'url',
      inputPlaceholder: `Enter ${type} URL`
    }).then((url)=>{
      if (url) {
        Swal.fire(`Entered URL: ${url.value}`)
        console.log(url.value)
        return(url)
      }
    }).then((url)=>{
      Swal.fire({
        title: `Is this the correct ${type} URL?`,
        text: url.value,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes, let's keep it!"
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'saved!',
            `Your ${type} link has been updated!`,
            'success'
          )
          this.props.dispatch({type: 'EDIT_DETAILS', payload:{edit: url.value, id: venueId, type: type, who: "venues", userId: user.id}})
        }
      })
    })
  }

  render() {
    const gig = this.props.reduxState.editProfile.editVenueReducer;
    return (
      <>
      <button className="log-in" onClick={()=>this.props.history.goBack()}>Back</button>
        <div className='profileEdit'>
          <div className="profileViewEdit" key={gig.id}>
            {this.props.reduxState &&
              <h1 className="welcome">Welcome {this.props.reduxState.user.username}</h1>
             }
              <div className="nameEdit">
                  <p className="profileName" >Venue Name: <strong>{gig.venuename}</strong></p>
                  <img className="editButton" src='./images/edit.png' alt="edit" onClick={()=>this.nameEdit(gig.id, 'venuename', gig.venuename)}/>
              </div>    
              <div className="bioPhotoEdit">
                  <img className="editBioPhoto" src={`data:image/png;base64,${gig.photo}`} alt={gig.venuename}/>
                  <img className="editButton" src='./images/edit.png' alt="edit" onClick={this.photoEdit}/>
              </div>
              <div className="bioAddressEdit">
                  {gig.address}
                  <img className="editButton" src='./images/edit.png' alt="edit" onClick={()=>this.addressEdit(gig.id, 'address', gig.address)}/>
              </div>
              <div className="bioPhoneEdit">
                  {gig.phone}
                  <img className="editButton" src='./images/edit.png' alt="edit" onClick={()=>this.phoneEdit(gig.id, 'phone', gig.phone)}/>
              </div>
              <div className="bioDescriptionEdit">
                  {gig.description}
                  <img className="editButton" src='./images/edit.png' alt="edit" onClick={()=>this.descriptionEdit(gig.id, 'description')}/>
              </div>
              <div className="socialMediaEdit">
                <img className="linkIcon" src="/images/twitter.png" alt="twitter"/>
                <img className="editLinkIcon" src="/images/pencil.png" alt="edit" onClick={()=>this.socialMedia(gig.id, "twitter", gig.twitter)}/>
                <img className="linkIcon" src="/images/facebook.png" alt="facebook"/>
                <img className="editLinkIcon" src="/images/pencil.png" alt="edit" onClick={()=>this.socialMedia(gig.id, "facebook", gig.facebook)}/>                        
                <img className="linkIcon" src="/images/www.png" alt="website"/>
                <img className="editLinkIcon" src="/images/pencil.png" alt="edit" onClick={()=>this.socialMedia(gig.id, "www", gig.www)}/>                        
                <img className="linkIcon" src="/images/youtube.png" alt="youtube"/>
                <img className="editLinkIcon" src="/images/pencil.png" alt="edit" onClick={()=>this.socialMedia(gig.id, "youtube", gig.youtube)}/>                   
              </div>
          </div>
        </div>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(VenueEdit);