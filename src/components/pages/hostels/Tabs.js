import React,{useState} from 'react';
import classnames from 'classnames';
import {TabContent,TabPane,Nav,NavItem,NavLink} from 'reactstrap';
import {IoIosPhonePortrait} from 'react-icons/io';

const Tabs = ({data}) => {
    const [activeTab,setActiveTab] = useState('1');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    };
  

    return(
       <div>
           <Nav tabs>
               <NavItem>
                   <NavLink
                   className={classnames({
                       active:activeTab === '1'
                   })}
                   onClick={() => toggle('1')}
                   >
                    Features
                   </NavLink>
               </NavItem>
               <NavItem>
                   <NavLink
                   className={classnames({
                       active:activeTab === '2'
                   })}
                   onClick={() => toggle('2')}
                   >
                    Description and contacts
                   </NavLink>
               </NavItem>
           </Nav>
           <TabContent activeTab={activeTab}>
               <TabPane tabId='1'>
                   <div className="col-12 col-md-12">
                       <p className="tab_features">Name: {data.name} hostels</p>
                       <p className="tab_features">Location: {data.location}</p>
                       <p className="tab_features">Room type: {data.type}</p>
                       <p className="tab_features">Rent: Kshs: {parseInt(data.rent).toLocaleString()}</p>
                       {data.deposit !== "NaN" && <p className="tab_featuers">Deposit: Kshs: {parseInt(data.deposit).toLocaleString()}</p>}
                   </div>
               </TabPane>
               <TabPane tabId="2">
                   <div className="col-12 col-md-12">
                       <p className="tab_description">
                           {data.description}
                       </p>
                       <p className="tab_icon">
                            <span><IoIosPhonePortrait className="tab_icon--icon"/> {data.caretaker}</span>
                       </p>
                   </div>
               </TabPane>
           </TabContent>
       </div>
    )
};


export default Tabs;