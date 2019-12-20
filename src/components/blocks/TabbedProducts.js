// react
import React, { Component } from 'react';
import {connect} from 'react-redux';
// third-party
import PropTypes from 'prop-types';
// data stubs
import Carousel from '../shared/Carousel';
import {fetchProducts,getMpData} from '../../store/market_place';
import BlockMpAdvert from './BlockMpAdvert';

class TabbedProducts extends Component {
    timeout;

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            loading: false,
            groups: [
                { id: 1, name: 'All', current: true },
                { id: 2, name: 'Food and vegetables', current: false },
                { id: 3, name: 'Electronics', current: false },
                { id: 4, name: 'Clothing', current: false },
                { id:5,  name:'Furniture', current:false}
            ],
        };
    };

    componentDidMount = () => {
        let {fetchProducts,loading,products} = this.props;
        fetchProducts();
        if(!loading){
            return this.setState({
                products,
                loading:false
            });
        };
    };

    componentWillUnmount() {
        clearTimeout(this.timeout);
    };

    handleChangeGroup = (newCurrentGroup) => {
        clearTimeout(this.timeout);

        const { groups } = this.state;
        const currentGroup = groups.find((group) => group.current);

        if (currentGroup && currentGroup.id === newCurrentGroup.id) {
            return;
        }

        this.setState((state) => (
            {
                loading: true,
                groups: state.groups.map((group) => (
                    { ...group, current: group.id === newCurrentGroup.id }
                )),
                
            }
        ));

        // sending request to server, timeout is used as a stub
        this.timeout = setTimeout(() => {
            this.setState((state) => {
                // this is only for demo purpose
                const _products = state.products.filter(
                    product => product.category === newCurrentGroup.name
                );
                return {
                    products: _products,
                    loading: false,
                };
            });
        }, 2000);
    };

    render() {

        const {products} = this.state;

        if(products.length === 0) return <BlockMpAdvert />;

        return (
            <Carousel
                {...this.props}
                {...this.state}
                onGroupClick={this.handleChangeGroup}
            />
        );
    }
};
TabbedProducts.propTypes = {
    title: PropTypes.string.isRequired,
    layout: PropTypes.oneOf(['grid-4', 'grid-4-sm', 'grid-5', 'horizontal']),
    rows: PropTypes.number,
    withSidebar: PropTypes.bool,
};
TabbedProducts.defaultProps = {
    layout: 'grid-4',
    rows: 1,
    withSidebar: false,
};
const mapStateToProps = state => ({
  loading:getMpData(state).loading,
  products:getMpData(state).products
});
const dispatchStateToProps = {
    fetchProducts
};
export default connect(mapStateToProps,dispatchStateToProps)(TabbedProducts);