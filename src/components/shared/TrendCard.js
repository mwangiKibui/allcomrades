// react
import React from 'react';

import {Card} from 'semantic-ui-react';

const TrendCard = ({data}) => {
    return (
       <div className="trend_card">
          <Card style={{width:"100%"}}> 
              <img src={data.urlToImage} wrapped ui={false} className="trend_card--image"/>
              <Card.Content>
                  <a href={data.url} className="trend_card--link">
                      <Card.Header>{data.title}</Card.Header>
                  </a>
                  <Card.Meta>
                      <span className="badge badge-danger">{data.source.name}</span>
                  </Card.Meta>
              </Card.Content>
          </Card>
       </div>
    );
};
export default TrendCard;