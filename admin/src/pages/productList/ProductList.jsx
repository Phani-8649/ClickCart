import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
// import { useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import { deleteProduct, getProduct } from "../../redux/apiCalls";
import { useEffect } from "react";


export default function ProductList() {
  // const [data, setData] = useState(productRows);
  const dispatch=useDispatch();
  const products=useSelector(state=>state.product.products);

  useEffect(()=>{
    getProduct(dispatch);
  },[dispatch]);



  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    deleteProduct(id,dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "instock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={row=>row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
