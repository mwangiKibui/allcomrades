import { combineReducers } from 'redux';

// reducers
import trendsReducer from './trends';
import advertsReducer from './adverts';
import articlesReducer from './articles';
import eventsReducer from './events';
import hostelsReducer from './hostels';
import mpReducer from './market_place';
import userReducer from  './user';
import categoriesReducer from './categories';
import currencyReducer from './currency';
import mobileMenuReducer from './mobile-menu';
import quickviewReducer from './quickview';
import sidebarReducer from './sidebar';
import wishlistReducer from './wishlist';


export default combineReducers({
    trends:trendsReducer,
    adverts:advertsReducer,
    articles:articlesReducer,
    events:eventsReducer,
    hostels:hostelsReducer,
    mp:mpReducer,
    categories:categoriesReducer,
    user:userReducer,
    currency: currencyReducer,
    mobileMenu: mobileMenuReducer,
    quickview: quickviewReducer,
    sidebar: sidebarReducer,
    wishlist: wishlistReducer,
});
