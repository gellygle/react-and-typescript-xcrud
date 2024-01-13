import React, { useEffect, useState } from "react";
import { IProduct } from "./Product.type";

type Props = {
  data: IProduct;
  onBackBtnClickHnd: () => void;
  onUpdateClickHnd: (data: IProduct) => void;
};

const EditProduct = (props: Props) => {
  const { data, onBackBtnClickHnd, onUpdateClickHnd } = props;

  const [productObj, setProductObj] = useState<IProduct>({
    id: data.id,
    name: data.name,
    quantity: data.quantity,
    price: data.price,
    created_date: new Date(),
    updated_date: new Date(),
    user_id: '1', // Replace with a valid user ID
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProductObj((prevProductObj) => ({
      ...prevProductObj,
      [id]: id === 'quantity' || id === 'price' ? Number(value) : value,
    }));
  };

  const onSubmitBtnClickHnd = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateClickHnd(productObj);
    onBackBtnClickHnd();
  };

  useEffect(() => {
    console.log('productObj', productObj);
  }, [productObj]);

  return (
    <form onSubmit={onSubmitBtnClickHnd} className="row g-3">
      <div className="col-md-12">
        <label className="form-label">Name:</label>
        <input
          className="form-control"
          id="name"
          type="text"
          value={productObj.name}
          onChange={onChange}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Quantity:</label>
        <input
          className="form-control"
          type="number"
          id="quantity"
          value={productObj.quantity}
          onChange={onChange}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Unit Price:</label>
        <input
          className="form-control"
          id="price"
          type="number"
          value={productObj.price}
          onChange={onChange}
        />
      </div>
      <div>
        <input
          className="btn btn-danger"
          type="button"
          value="Cancel"
          onClick={onBackBtnClickHnd}
        />
        <input className="btn btn-primary" type="submit" value="Update" />
      </div>
    </form>
  );
};

export default EditProduct;