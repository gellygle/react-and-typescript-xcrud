import React, { useEffect, useState } from 'react';
import { IProduct, PageEnum } from './Product.type';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login'
import RegistrationForm from './RegistrationForm';
import { toast } from 'react-toastify';



const Home = () => {
  const [productList, setProductList] = useState([] as IProduct[]);
  const [shownPage, setShownPage] = useState(PageEnum.list);
  const [dataToEdit, setDataToEdit] = useState({} as IProduct);
  const [isLogin, setIsLogin] = useState(false as Boolean);

  useEffect(() => {
    const listInString = window.localStorage.getItem("ProductList");
    if (listInString) {
      _setProductList(JSON.parse(listInString));
    }
  }, []);


  const onAddProductClickHnd = () => {
    setShownPage(PageEnum.add);
  };

  const showListPage = () => {
    setShownPage(PageEnum.list);
  };

  const _setProductList=(list:IProduct[])=>{
    setProductList(list);
    window.localStorage.setItem("ProductList",JSON.stringify(list))
  };

 


  const addProduct = (data: IProduct) => {
    _setProductList([...productList, data]);
    console.log('Added product to list:', data);
    showListPage();
  };

  const deleteProduct=(data:IProduct)=>{


    const indexToDelete =productList.indexOf(data);
    const tempList=[...productList]

    tempList.splice(indexToDelete,1);
    _setProductList(tempList)
  };
  
  const EditProductData=(data:IProduct)=>{
    setShownPage(PageEnum.edit)
    setDataToEdit(data)
  }

const updateData=(data:IProduct)=>{
  const filteredData=productList.filter(x=> x.id===data.id)[0]
  const indexOfRecord=productList.indexOf(filteredData);
  const tempData=[...productList]
  tempData[indexOfRecord]=data;
  _setProductList(tempData)
}


  // LOGOUT THE USER AND DELETE OR REMOVE THE TOKEN FROM LOCAL STORAGE

  const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        setIsLogin(false);
        toast.success('Logout Succesfully'); 
        
      };

  return (
    <>
      <ToastContainer/>
      <section className='container mt-3'>
      
        {isLogin === false && <Login setIsLogin={setIsLogin} />}
        {isLogin === true && (
          <>
           
            
            <button onClick={handleLogout} className='btn btn-outline-secondary' >Logout</button>
             
             
            <input className="btn btn-primary d-flex" type="button" value="Add Product" onClick={onAddProductClickHnd} />
            <ProductList list={productList} onDeleteClickHnd={deleteProduct} onEdit={EditProductData} />
            </>
        )}
        {shownPage === PageEnum.add && <AddProduct onBackBtnClickedHnd={showListPage} onSubmitClickHnd={addProduct} />}
        {shownPage===PageEnum.edit&&<EditProduct data={dataToEdit} onBackBtnClickHnd={showListPage} onUpdateClickHnd={updateData}/>}
        <RegistrationForm/>
      </section>
    </>
  );
};

export default Home;




