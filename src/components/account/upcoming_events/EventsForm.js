import React from 'react';
import {connect} from 'react-redux';

import {getUserData} from '../../../store/user';
import {fetchEvent,getEventsData,updateEventDetails,uploadEvent} from '../../../store/events';

class EventsForm extends React.Component {
    /**
     * --> what is needed for an event 
     * =>name,venue,time,description,images,date,organizer
     */
    fileObj = [];
    data = new FormData();

    state = {
        name:'',
        venue:'',
        time:'afternoon',
        type:'student',
        admin:null,
        eventId:null,
        loading:false,
        update:false,
        uploaded:false,
        updated:false,
        description:'',
        images:[],
        fileArray:[],
        date:'',
        organizer:'',
        error:'',
        action:'upload event'
    };

    componentDidMount = async () => {
        const {_id,admin} = this.props.user;
        //what if we are updating
        if(this.props.location.state){
           let {_id} = this.props.location.state;
           await this.props.fetchEvent(_id).catch(console.log);
           let {name,venue,time,description,date} = this.props.event;
           this.setState({
               name,venue,time,description,date:new Date(date).getDate(),eventId:_id
           })
        }
        return this.setState({
            organizer:_id,admin
        });
    };
    uploadMultipleImages = e => {
        this.fileObj.push(e.target.files);
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.state.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
        };
        this.setState({images:e.target.files});
        for(let i=0;i<e.target.files.length;i++){
            this.data.append('profile',e.target.files[i]);
        }
    };
    //we may have to add option of deleting the images much later
    onChange = e => {
        return this.setState({
            [e.target.name] : e.target.value
        })
    };
    onSubmit = async e => {
        e.preventDefault();
        this.setState({error:'',uploaded:false,updated:false});
        const {name,venue,time,update,description,images,date,organizer,eventId,type} = this.state;
        const {updateEventDetails,event,uploadEvent} = this.props;
        if(update){
           if(!name || !venue || !time || !description || !date || !type) return this.setState({
               error:'Fill all the fields'
           });
           const data = {name,venue,time,description,date,organizer,type};
           this.setState({loading:true});
           await updateEventDetails(data,eventId).catch(console.log);
           this.setState({loading:false});
           return this.setState({
            name:event.name,venue:event.venue,time:event.time,description:event.description,
            date:new Date(event.date).getDate(),updated:true,type:event.type
           });     
    }else{
        if(!name || !venue || !time || !description || !date || images.length === 0 || !type || !organizer) return this.setState({
            error:'Fill out all the fields'
        });
        const obj = {name,venue,time,description,date,type,organizer};
        for(const elem  of Object.keys(obj)){
            this.data.append(elem,obj[elem]);
        };
        //we can upload an event
        this.setState({loading:true});
        await uploadEvent(this.data).catch(console.log);
        return this.setState({
            loading:false,name:'',venue:'',description:'',date:'',fileArray:[''],uploaded:true            
        });
    };        
    }
    render(){
        return(
            <section className="event_form">
                <form onSubmit={this.onSubmit}>
                    
                     <div className="form-group">
                         {
                             this.state.error && <div className="alert alert-danger">{this.state.error}</div>
                         }
                         {
                             this.state.updated && <div className="alert alert-success">
                                 Your event has been successfully updated
                             </div>
                         }
                         {
                             this.state.uploaded && <div className="alert alert-success">
                                 Your event has been successfully uploded
                            </div>
                         }
                     </div>

                     <div className="form-group">
                         <label htmlFor="event_name">Name of event</label>
                         <input type="text"
                         name="name"
                         className="form-control"
                         value={this.state.name}
                         onChange={this.onChange}
                         placeholder="What is the name of the event"
                         />
                     </div>

                     <div className="form-group">
                         <label htmlFor="venue">Venue of event</label>
                         <input type="text"
                         name="venue"
                         className="form-control"
                         value={this.state.venue}
                         onChange={this.onChange}
                         placeholder="Where shall the event happen"
                         />
                     </div>

                     <div className="form-group">
                         <label htmlFor="time">At what time shall event start</label>
                         <select className="form-control" name="time" value={this.state.time} onChange={this.onChange}>
                             <option value='morning'>morning</option>
                             <option value='afternoon'>afternoon</option>
                             <option value='evening'>evening</option>
                             <option value='late night'>late night</option>
                         </select>
                     </div>

                     <div className="form-group">
                         <label htmlFor="description">Description</label>
                        <textarea className="form-control" name="description" onChange={this.onChange}
                        value={this.state.description} rows="5" cols="40" placeholder="Describe your event here"
                        /> 
                     </div>

                     {
                         this.state.fileArray.length > 0 && (
                             <div className="form-group multi-preview">
                                 <label htmlFor="images">Uploaded images</label>
                                 <br />
                                 {
                                    this.state.fileArray.map((file, index) => 
                                    <img src={file} key={index}  className="event_form--image" alt="hostel" />
                                    )
                                 }
                             </div>
                         )
                     }

                     {
                         !this.state.update && (
                            <div className="form-group">
                                <label htmlFor="images">Event Images</label>
                                <input type="file"
                                    className="form-control"
                                    multiple
                                    id="images"
                                    name="profile"
                                    onChange={this.uploadMultipleImages}
                                    
                                />
                            </div>
                         )
                     }

                    {
                        this.state.admin && <div className="form-group">
                            <label htmlFor="type">Type of event</label>
                            <select name="type" className="form-control" onChange={this.onChange} value={this.state.type}>
                                <option value="student">student</option>
                                <option value="cu">cu</option>
                                <option value="ycs">ycs</option>
                                <option value="school">school</option>
                            </select>
                        </div>
                    }
                     
                     <div className="form-group">
                         <label htmlFor="date">Date of event</label>
                         <input type="date"
                         className="form-control"
                         name="date"
                         onChange={this.onChange}
                         value={this.state.date}
                         placeholder="Date of event"
                         />
                     </div>

                     <div className="form-group">
                         <input type="submit" className="btn btn-outline-success" value={
                             this.state.loading ? 'uploading' : this.state.action
                         } />
                     </div>

                </form>
            </section>
        )
    }
};
const mapToProps = state => ({
    user:getUserData(state).user,
    event:getEventsData(state).event
});
const dispatchToProps = {
    fetchEvent,
    updateEventDetails,
    uploadEvent
}
export default connect(mapToProps,dispatchToProps)(EventsForm);