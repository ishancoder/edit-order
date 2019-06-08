import React, { Component } from "react";
import "./Products.sass";
import { generateId } from "../../utils/utils";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };
    }

    addEmptyProduct = () => {
        const product = {
            id: generateId(),
            name: "",
            qty: 0,
            unitPrice: 0,
            notes: ""
        }

        this.setState(prevState => ({ items: prevState.items.concat(product) }));
    }

    onDelete = (id) => {
        this.setState(prevState => {
            return {
                items: prevState.items.filter(item => item.id !== id)
            }
        });
    };

    onChange = (idx, { target: { name, value } }) => {
        const { items } = this.state;
        const changedProduct = { ...this.state.items[idx], [name]: value };
        const formerPart = items.slice(0, idx);
        const laterPart = items.slice(idx + 1, items.length);
        this.setState({
            items: [...formerPart, changedProduct, ...laterPart]
        });
    };

    handleSave = () => {
        let isValid = true;
        this.state.items.forEach(item => {
            if(!isValid) return;
            if(!item.name || 
                item.qty === "" ||
                item.qty < 0 ||
                item.unitPrice === "" ||
                item.unitPrice < 0 ) {
                    alert("There is some problem with your products please check again.");
                    isValid = false;
                    return false;
                }
        });

        if(isValid && typeof this.props.onSave === "function") {
            this.props.onSave(this.state.items);
        }
    }

    render() {
        return <div className="products">
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>QTY</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                            <th>Notes</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.items.map((item, i) => {
                                return <tr key={item.id}>
                                    <td>
                                        <input
                                            className={(!item.id) ? "error" : ""}
                                            name="id"
                                            type="number"
                                            value={item.id}
                                            onChange={ev => this.onChange(i, ev)} readOnly/>
                                        <button className="attached">&harr;</button>
                                    </td>
                                    <td>
                                        <input
                                            className={`${(!item.name) ? "error" : ""} grow`}
                                            name="name"
                                            type="text"
                                            value={item.name}
                                            onChange={ev => this.onChange(i, ev)} required/>
                                    </td>
                                    <td>
                                        <input
                                            className={(item.qty === "" || item.qty < 0) ? "error" : ""}
                                            name="qty"
                                            type="number"
                                            value={item.qty}
                                            min="0"
                                            onChange={ev => this.onChange(i, ev)} required/>
                                    </td>
                                    <td>
                                        <input
                                            className={(item.unitPrice === "" || item.unitPrice < 0) ? "error" : ""}
                                            name="unitPrice"
                                            type="number"
                                            min="0"
                                            value={item.unitPrice}
                                            onChange={ev => this.onChange(i, ev)} required/>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.qty * item.unitPrice}
                                            readOnly />
                                    </td>
                                    <td>
                                        <textarea
                                            name="notes"
                                            value={item.notes}
                                            onChange={ev => this.onChange(i, ev)} />
                                    </td>
                                    <td>
                                        <button 
                                            className="danger" 
                                            onClick={() => this.onDelete(item.id)} 
                                            onChange={ev => this.onChange(i, ev)}>DELETE</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={this.addEmptyProduct}>Add Product</button>
            </div>
            <div className="pull-right">
                <button className="big" onClick={this.handleSave}>SAVE</button>
            </div>
        </div>;
    }
}

export default Products;