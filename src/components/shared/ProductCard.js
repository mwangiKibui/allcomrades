import React from 'react';
import {Link} from 'react-router-dom';
import {Card,Image} from 'semantic-ui-react';

const ProductCard = ({data}) => {
    return (
        <div className="product_card">
        <Card style={{width:"100%"}}>
           <img src={data.profiles[0]} className="product_card--img" alt={data.name} />
           <Card.Content>
                <span className="badge badge-danger">{data.type}</span>
               <Card.Header>
                    <Link className="product_card--link" to={`/platform/mp/${data._id}`}>{data.name}</Link>
               </Card.Header>               
               <Card.Meta>
                   <p className="product_card--price">Kshs: {parseInt(data.price).toLocaleString()}</p>
               </Card.Meta>
           </Card.Content>
           <Card.Content extra>
               <p className="product_card--seller">Being sold by {data.seller.firstname}</p>
           </Card.Content>
         </Card>
         </div>
    )
};

export default ProductCard;