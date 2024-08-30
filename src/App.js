import './App.css';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://bikeshop-backend.azurewebsites.net/products')
            .then(response => {
            setProducts(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    const addToCart = (product) => {
        axios.post('https://bikeshop-backend.azurewebsites.net/addToCart', product);
    }

    return (
        <div>
            <h1 data-cy="Products-header">Available Products</h1>
            {products.map(product => (
                <div className="product" data-cy="Products-list" key={product.ID}>
                    <h3>Product: {product.Name}</h3>
                    <p>Price: {product.Price} $</p>
                    <button className="button" type="submit" onClick={() => addToCart(product)}>Add to cart</button>
                </div>
            ))}
        </div>
    );
};

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [totalValue, setTotalValue] = useState([]);

    useEffect(() => {
        axios.get('https://bikeshop-backend.azurewebsites.net/cart')
            .then(response => {
            setCart(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        axios.get('https://bikeshop-backend.azurewebsites.net/totalCartValue')
            .then(response => {
            setTotalValue(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    const deleteFromCart = (productId) => {
        axios.delete('https://bikeshop-backend.azurewebsites.net/deleteFromCart/' + productId)
            .then(response => {
            console.log("Deleted item from cart");
        })
        .catch(error => {
            console.error(error);
        });
        window.location.reload();
    }

    return (
        <div>
            <h1 data-cy="Cart-header">Your Cart</h1>
            {cart.map(product => (
                <div key={product.ID}>
                    <h3>Product: {product.Name}</h3>
                    <p>Price: {product.Price}$</p>
                    <p>Amount: {product.Amount}</p>
                    <button className="button" type="submit" onClick={() => deleteFromCart(product.ID)}>Delete from cart</button>
                </div>
            ))}
            <h2>Total cart value: {totalValue}$</h2>
        </div>
    );
};

const Payment = () => {
    const [totalValue, setTotalValue] = useState([]);

    const [paymentInfo, setPaymentInfo] = useState({
        Name: '',
        Surname: '',
        Phone: '',
        Email: '',
        Address: '',
        CreditCardNumber: '',
        CreditCardExpirationDate: '',
        CreditCardCVV: '',
        Sum: 0
    })

    useEffect(() => {
        axios.get('https://bikeshop-backend.azurewebsites.net/totalCartValue')
            .then(response => {
            setTotalValue(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    const handleChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        paymentInfo.Sum = totalValue;
        try {
            const response = await axios.post('https://bikeshop-backend.azurewebsites.net/makePayment', paymentInfo);
            console.log('Payment data submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting payment data:', error);
        }
    };

    return (
        <div className="paymentInfo" data-cy="Payment-form">
            <h1 data-cy="Payment-header">Payment info</h1>

            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <th colSpan="2">Please provide the necessary data</th>
                    </tr>
                    <tr>
                        <td className="label">
                            <label htmlFor ="name">Name</label>
                        </td>
                        <td>
                            <input type="text" name="name" placeholder="Name"
                                   defaultValue={paymentInfo.Name} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td className="label">
                            <label htmlFor ="surname">Surname</label>
                        </td>
                        <td>
                            <input type="text" name="surname" placeholder="Surname"
                                   defaultValue={paymentInfo.Surname} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td className="label">
                            <label htmlFor ="phone">Phone</label>
                        </td>
                        <td>
                            <input type="text" name="phone" placeholder="Phone"
                                   defaultValue={paymentInfo.Phone} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td className="label">
                            <label htmlFor ="email">Email</label>
                        </td>
                        <td>
                            <input type="text" name="email" placeholder="Email"
                                   defaultValue={paymentInfo.Email} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td className="label">
                            <label htmlFor ="address">Address</label>
                        </td>
                        <td>
                            <input type="text" name="address" placeholder="Address"
                                   defaultValue={paymentInfo.Address} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td className="label">
                            <label htmlFor ="creditCardNumber">Credit Card Number</label>
                        </td>
                        <td>
                            <input type="text" name="creditCardNumber" placeholder="Credit Card Number"
                                   defaultValue={paymentInfo.CreditCardNumber} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td className="label">
                            <label htmlFor ="creditCardNumber">Credit Card Expiration Date</label>
                        </td>
                        <td>
                            <input type="text" name="creditCardExpirationDate" placeholder="Credit Card Expiration Date"
                                   defaultValue={paymentInfo.creditCardExpirationDate} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td className="label">
                            <label htmlFor ="creditCardCVV">Credit Card CVV</label>
                        </td>
                        <td>
                            <input type="text" name="creditCardCVV" placeholder="Credit Card CVV"
                                defaultValue={paymentInfo.CreditCardCVV} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td className="label">
                            <label htmlFor ="sum">Sum</label>
                        </td>
                        <td>
                            <h4 data-cy="Cart-value">{totalValue}$</h4>
                        </td>
                    </tr>
                </table>
                <button className="button" type="submit">Pay</button>
            </form>

        </div>
    );
};

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header" data-cy="App-header">
                    <p>
                        Welcome to my Bike Shop! (v0.1)
                    </p>
                </header>
                <nav>
                    <ul data-cy="Navigation">
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>
                        <li>
                            <Link to="/payment">Payment</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/payment" element={<Payment/>}/>
                </Routes>

            </div>

        </BrowserRouter>
    );
}

export default App;
