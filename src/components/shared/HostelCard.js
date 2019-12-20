import React from 'react';
import {Link} from 'react-router-dom';

import {Card,Image} from 'semantic-ui-react';

const HostelCard = ({data}) => {
    return (
        <div className="hostel_card">
        <Card style={{width:"100%"}}>            
            <Image src={data.profiles[0]} wrapped ui={false} />
            <Card.Content>
                <Card.Header>
                <Link to={`/platform/hostels/${data._id}`} className="hostel_card--title">
                    {`${data.name} hostels`}
                </Link>
                </Card.Header>
                <Card.Meta>
                    <span>
                        {data.type}
                    </span>
                </Card.Meta>
                <Card.Description>
                    <span>Located in {data.location}</span>
                </Card.Description>
            </Card.Content>
        </Card>
        </div>
    )
};
export default HostelCard;