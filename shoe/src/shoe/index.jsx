import Shoe from "./shoe.jsx";
import Detail from "./detail";
import Cart from "./cart.jsx";
import Navbar from "./navbar.jsx";
import { useSelector } from "react-redux";

export default function ShoppingShoe() {
    const listShoe = useSelector((state) => state.shoppingShoeReducer.listShoe);

    const renderListShoe = () => {
        return listShoe.map((item) => {
            return (
                <Shoe
                    key={item.id} data={item}
                />
            );
        });
    };

    return (
        <>
            <Navbar/>

            <div className="w-full mx-auto max-w-7xl mt-8 px-4">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                    hoppingShoe
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {renderListShoe()}
                </div>
            </div>

            <Detail/>

            <Cart/>
        </>
    );
}
