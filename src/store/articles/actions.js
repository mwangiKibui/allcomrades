import {ARTICLES_FETCH} from './types';
import {createClient} from 'contentful';

const spaceId = "1pkxcl4y93hb";
const accessToken = "ggA5Yh61vLMNrGaYPK8BOccxJ7yy2wXSV6KrZHmde7c";

const load_articles = (data) => {
    return {
        type:ARTICLES_FETCH,
        payload:data
    }
};

export const fetchArticles = () => {
       return dispatch => {
           const client = createClient({
               space:spaceId,
               accessToken
           });
           client.getEntries().then(data => {
               //we filter the bad posts
               let result = data.items.filter(post =>Array.isArray(post.fields.image) === true );
               result = result.filter(data =>  data.fields.image !== undefined);
               return dispatch(load_articles(result))
           }).catch(console.log);
       }
};
