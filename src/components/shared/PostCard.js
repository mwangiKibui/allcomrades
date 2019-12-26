// react
import React from 'react';
import {Link} from 'react-router-dom';
import {Card} from 'semantic-ui-react';

const  PostCard = ({data}) => {
    return (
        <div className="post_card">
            
            <Card style={{width:"100%"}}>
                <img src={data.fields.image[0].fields.file.url}  alt={data.fields.title} className="post_card--image" />
                <Card.Content>
                    <Card.Header>
                    <Link to={`/platform/posts/${data.sys.id}`} className="post_card--link">
                            {data.fields.title}
                    </Link>
                    </Card.Header>
                    <Card.Meta>
                        <span className="badge badge-danger">
                             {data.fields.category}
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        <span className="post_card--writer">By {data.fields.writer}</span>
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    );
};
export default PostCard;