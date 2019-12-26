import React from 'react';
import { connect } from 'react-redux';

import { getUserData } from '../../../store/user';
import { fetchProduct, getMpData, updateProductDetails, uploadProduct } from '../../../store/market_place';

class ProductsForm extends React.Component {
    
    fileObj = [];
    data = new FormData();

    state = {
        name: '',
        price: '',
        measure_of_quantity: '',
        type:'electronics',
        prodId:null,
        loading: false,
        update: false,
        uploaded: false,
        updated: false,
        description: '',
        images: [],
        fileArray: [],
        seller: '',
        error: '',
        action: 'upload product'
    };

    componentDidMount = async () => {
        const { _id } = this.props.user;
        //what if we are updating
        if (this.props.location.state) {
            let { _id } = this.props.location.state;
            await this.props.fetchProduct(_id).catch(console.log);
            let { name, price,measure_of_quantity, description,type} = this.props.product;
            this.setState({
                name, price, measure_of_quantity, description,prodId:_id,type,action:'update'
            })
        }
        return this.setState({
            seller: _id
        });
    };
    uploadMultipleImages = e => {
        this.fileObj.push(e.target.files);
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.state.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        };
        this.setState({ images: e.target.files });
        for (let i = 0; i < e.target.files.length; i++) {
            this.data.append('profiles', e.target.files[i]);
        }
    }
    onChange = e => {
        return this.setState({
            [e.target.name]: e.target.value
        })
    };
    onSubmit = async e => {
        e.preventDefault();
        this.setState({ error: '', uploaded: false, updated: false });
        const { name, price, measure_of_quantity, update, description, images, seller,prodId,type } = this.state;
        const { updateProductDetails, product, uploadProduct } = this.props;
        if (update) {
            if (!name || !price || !measure_of_quantity || !description || !seller || !type) return this.setState({
                error: 'Fill all the fields'
            });
            const data = { name, price, measure_of_quantity, description, seller, type };
            this.setState({ loading: true });
            await updateProductDetails(data,prodId).catch(console.log);
            this.setState({ loading: false });
            return this.setState({
                name: product.name, price: product.price, measure_of_quantity: product.measure_of_quantity, description: product.description,
                updated: true,type:product.type
            });
        } else {
            if (!name || !price || !measure_of_quantity || !description || images.length === 0 || !type) return this.setState({
                error: 'Fill out all the fields'
            });
            const obj = { name, price, measure_of_quantity, description, seller,type };
            for (const elem of Object.keys(obj)) {
                this.data.append(elem, obj[elem]);
            };
            //we can upload product
            this.setState({ loading: true });
            await uploadProduct(this.data).catch(console.log);
            return this.setState({
                loading: false, name: '', price: '',measure_of_quantity:'', description: '', date: '', fileArray: [''], 
                uploaded: true,type:''
            })
        };
    }
    render() {
        return (
            <section className="product_form">
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        {
                            this.state.error && <div className="alert alert-danger">{this.state.error}</div>
                        }
                        {
                            this.state.updated && <div className="alert alert-success">
                                Your product has been successfully updated
                             </div>
                        }
                        {
                            this.state.uploaded && <div className="alert alert-success">
                                Your product has been successfully uploded
                            </div>
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="product_name">Name of your product</label>
                        <input type="text"
                            name="name"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChange}
                            placeholder="What is the name of your product"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="venue">Price of product</label>
                        <input type="text"
                            name="price"
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChange}
                            placeholder="How much do you want to charge"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="time">Measure of quantity</label>
                        <input type="text"
                        name="measure_of_quantity"
                        className="form-control"
                        value={this.state.measure_of_quantity}
                        onChange={this.onChange}
                        placeholder="What is your measure e.g (per item,per kilo, etc)"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Type">Type of product</label>
                        <select name="type" onChange={this.onChange} value={this.state.type} className="form-control">
                                <option value="electronics">electronics</option>
                                <option value="clothing">clothing</option>
                                <option value="furniture">furniture</option>
                                <option value="food and vegetables">food and vegetables</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" name="description" onChange={this.onChange}
                            value={this.state.description} rows="5" cols="40" placeholder="Describe your product here"
                        />
                    </div>
                    
                    
                    {
                        this.state.fileArray.length > 0 && (
                            <div className="form-group multi-preview">
                                <label htmlFor="images">Uploaded images</label>
                                <br />
                                {
                                    this.state.fileArray.map((file, index) =>
                                        <img src={file} key={index} className="product_form--image" alt="product" />
                                    )
                                }
                            </div>
                        )
                    }

                    {
                        !this.state.update && (
                            <div className="form-group">
                                <label htmlFor="images">Product Images</label>
                                <input type="file"
                                    className="form-control"
                                    name="profiles"
                                    onChange={this.uploadMultipleImages}
                                    multiple
                                />
                            </div>
                        )
                    }

                   

                    <div className="form-group">
                        <input type="submit" className="btn btn-outline-success" value={
                            this.state.loading ? 'loading' : this.state.action
                        } />
                    </div>

                </form>
            </section>
        )
    }
};
const mapToProps = state => ({
    user: getUserData(state).user,
    product: getMpData(state).product
});
const dispatchToProps = {
    fetchProduct,
    updateProductDetails,
    uploadProduct
}
export default connect(mapToProps, dispatchToProps)(ProductsForm);