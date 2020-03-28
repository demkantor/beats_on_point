import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';
import swal from 'sweetalert';
import Swal from 'sweetalert2'


//page for logged in band to edit profile
class BandEdit extends Component {

  componentDidMount=()=>{
      const user = this.props.reduxState.user;
      const band =this.props.reduxState.editProfile.editBandReducer;
      console.log(user.username);
      this.props.dispatch({type: 'GET_THIS_BAND', payload: user.id});
      this.props.dispatch({type: 'GET_EDIT_GENRE', payload: band.id});
      this.props.dispatch({type: 'GET_ALL_GENRES'})
  }
    
  descriptionEdit=(bandId, type)=>{
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
          this.props.dispatch({type: 'EDIT_DETAILS', payload:{edit: value, type: type, id: bandId, who: 'bands', userId: user.id}})
        } else {
          swal("Not touching your bio!");
        }
      });
    })
  }

  nameEdit=(bandId, type, current)=>{
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
          swal("You name has been saved!", {
            icon: "success",
          });
        this.props.dispatch({type: 'EDIT_DETAILS', payload:{edit: value, type: type, id: bandId, who: 'bands', userId: user.id}})
        } else {
          swal("Not touching your name!");
        }
      });
    })
  }

  genreEdit=(bandId)=>{
    const user = this.props.reduxState.user;
    let options = {}
    this.props.reduxState.genreReducer.allGenres.map(band => {
      return options[band.id] = band.genre
      })
    console.log('hey', options);
    Swal.fire({
      title: 'Select field validation',
      input: 'select',
      inputOptions: options,
      inputPlaceholder: 'Select Genre',
      showCancelButton: true
      }).then((genre)=>{
        console.log(genre)
        if(genre){
          Swal.fire({
            title: `You selected ${genre.value}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Add it!"
            }).then((result) => {
                if (result.value) {
                  Swal.fire(
                    'saved!',
                    `New genre added!`,
                    'success'
                  )
          this.props.dispatch({type: 'ADD_MY_GENRE', payload:{edit: genre.value, id: bandId, userId: user.id}})
                }
            })
         }
      })
  }

  photoEdit=()=>{
    // console.log('takin pictures');
    this.props.history.push('/photo-edit');
  }

  socialMedia=(bandId, type, link)=>{
    const user = this.props.reduxState.user;
      // console.log(`in social media, ${bandId}, ${type}`);
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
          this.props.dispatch({type: 'EDIT_DETAILS', payload:{edit: url.value, id: bandId, type: type, who: "bands", userId: user.id}})
        }
      })
    })
  }

  render() {
    const gig = this.props.reduxState.editProfile.editBandReducer
    return (
      <>
      <button className="log-in" onClick={()=>this.props.history.goBack()}>Back</button>
        <div className="profileViewEdit" key={gig.id}>
          {this.props.reduxState &&
            <h1 className="welcome" >Welcome {this.props.reduxState.user.username}</h1>
          }
            <div className="nameEdit">
              <p className="profileName" >Band Name: <strong>{gig.bandname}</strong></p>
              <img className="editButton" src='./images/edit.png' alt="edit" onClick={()=>this.nameEdit(gig.id, 'bandname', gig.bandname)}/>
            </div>    
            <div className="bioPhotoEdit">
              <img className="editBioPhoto" src={`data:image/png;base64,${gig.photo}`} alt={gig.bandname}/>
              <img className="editButton" src='./images/edit.png' alt="edit" onClick={this.photoEdit}/>
            </div>
            {this.props.reduxState.genreReducer.bandEditGenre && (
                  <div className="genreEdit">
                    
                    <div>Genre:</div>
                    {this.props.reduxState.genreReducer.bandEditGenre.map(band => (
                      <div className="space" key={band.id}>
                        <strong>{band.genre}</strong>
                      </div>
                    ))}
                     <img className="editButton" src='./images/edit.png' alt="edit" onClick={()=>this.genreEdit(gig.id)}/>
                  </div>
                )}
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
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(BandEdit);