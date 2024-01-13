
import {IProduct} from "./Product.type";
import "bootstrap/dist/css/bootstrap.min.css"


type Props={
    list:IProduct[];
    onDeleteClickHnd:(data:IProduct)=>void
    onEdit:(data:IProduct)=>void
};

const ProductList=(props:Props)=>{
    const {list,onDeleteClickHnd,onEdit}=props;


   

    return(

      <div className="row g-3">

      <table className="table  ">
      <thead>
        <tr className="">
          <th>Name</th>
          <th>Unit Price</th>
          <th>Total Price</th>
          <th>Created Date</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {list.map(product=>{
          console.log(product)
          return (
                  <tr key={product.id}>
                    <td>{`${product.name}`}</td>
                    <td>{`${product.price}`}</td>
                    <td>{`${product.quantity * product.price}`}</td> 
                    <td>{`${product.created_date}`}</td> 
                    <td>
                      <div className="m-3">
                        <input className="btn btn-success" type="button" value="Edit" onClick={()=>onEdit(product)} />
                        <input  className="btn btn-danger" type="button" value="Delete" onClick={()=>onDeleteClickHnd(product)}/>
                      </div>
                    </td>
                  </tr>
                );
              })}
              </tbody>
      </table>
          </div>
)
}
export default ProductList;