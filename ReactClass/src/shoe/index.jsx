import { useState } from "react";
import Shoe from "./shoe.jsx";
import Detail from "./detail";
import data from "./data.json";
import Cart from "./cart.jsx";
import Navbar from "./navbar.jsx";
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux";

export default function ShoppingShoe() {
  // const [listShoe, setListShoe] = useState(data);
    const listShoe = useSelector((state) => state.shoppingShoeReducer.listShoe);
    const detailShoe = useSelector((state) => state.shoppingShoeReducer.detailShoe);
  // const [detailShoe, setDetailShoe] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [listCart, setListCart] = useState([]);

  const renderListShoe = () => {
    return listShoe.map((item) => {
      return (
        <Shoe
            key={item.id} data={item}
            // handleDetailProps={handleDetail}
            handleAddToCart={handleAddToCart} />
      );
    });
  };


  const findIndexCart = (id) => {
      return listCart.findIndex(item => item.id === id);
  }

  // const handleDetail = (data) => {
  //   setDetailShoe(data);
  //   setOpenDetail(true);
  // };

  const handleAddToCart = (data) => {
      const productToCart = {
          id: data.id,
          name: data.name,
          image: data.image,
          price: data.price,
          quantity: 1,
      }

      const index = findIndexCart(data.id);
        if (index !== -1) {
            const newListCart = [...listCart];
            newListCart[index].quantity += 1;
            setListCart(newListCart);
        }else {
            setListCart([...listCart, productToCart]);
        }

      console.log("productToCart", productToCart);
      console.log("listCart", listCart);
  }

  const removeCart = (id) => {
      const newListCart = listCart.filter((item) => item.id !== id);
      setListCart(newListCart);
  }

  const handleUpdateQtyCart = (id, isPlus) => {
      if(isPlus){
            const index = findIndexCart(id);
            if(index !== -1){
                const newListCart = [...listCart];
                newListCart[index].quantity += 1;
                setListCart(newListCart);
            }
      }else{
            const index = findIndexCart(id);
            if(index !== -1){
                const newListCart = [...listCart];
                if(newListCart[index].quantity > 1){
                    newListCart[index].quantity -= 1;
                    setListCart(newListCart);
                }else{
                    removeCart(id);
                }
            }
      }
  }

  const pay = () => {
        Swal.fire(
            'Thanh toán thành công!',
            'Cảm ơn bạn đã mua hàng!',
            'success'
        )
        setListCart([]);
    }

  return (
      <>
          <Navbar listCart={listCart}/>
          <div className="container mx-auto max-w-7xl mt-8 px-4">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                  📱 ShoppingShoe
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {renderListShoe()}
              </div>
          </div>

          <Detail
              open={openDetail}
              // detailShoe={detailShoe}
              onClose={() => setOpenDetail(false)}
              handleAddToCart={handleAddToCart}
          />

          <Cart
              listCart={listCart}
              removeCart={removeCart}
              updateQtyCart={handleUpdateQtyCart}
              pay={pay}
          />
      </>
  );
}
