

const Cart = (props) => {

    const { listCart, removeCart, updateQtyCart, pay } = props;


    const renderListProduct = () => {
        if (!listCart.length) {
            return (
                <tr>
                    <td
                        colSpan={5}
                        className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                        Giỏ hàng trống
                    </td>
                </tr>
            );
        }

        return listCart.map((item, idx) => (
            <tr
                key={item.id ?? idx}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 w-14">
                    {idx + 1}
                </td>
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                    {item.name}
                </th>
                <td className="px-6 py-4 text-right">{item.price}</td>
                <td className="px-6 py-4 text-center">
                    <div className="max-w-xs mx-auto">
                        <div className="relative flex items-center max-w-[8rem]">
                            <button type="button" id="decrement-button" onClick={() => updateQtyCart(item.id, false)}
                                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2" d="M1 1h16"/>
                                </svg>
                            </button>
                            <input type="text" id="quantity-input" data-input-counter
                                   aria-describedby="helper-text-explanation"
                                   className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder={item.quantity} required/>
                            <button type="button" id="increment-button" onClick={() => updateQtyCart(item.id, true)}
                                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2" d="M9 1v16M1 9h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 text-right">
                    {item.price * item.quantity}
                </td>
                <td className="px-6 py-4 text-right w-20">
                    <button
                        type="button"
                        onClick={() => removeCart?.(item.id)}
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium
                       text-white bg-rose-600 hover:bg-rose-700 focus:outline-none
                       focus:ring-4 focus:ring-rose-300 dark:focus:ring-rose-800"
                        aria-label={`Xóa ${item.tenSP}`}
                        title="Xóa"
                    >
                        {/* icon thùng rác */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                             fill="currentColor" className="h-4 w-4" aria-hidden="true">
                            <path d="M9 3h6a1 1 0 0 1 1 1v1h4a1 1 0 1 1 0 2h-1.05l-1.1 12.1A3 3 0 0 1 14.86 22H9.14a3 3 0 0 1-2.99-2.9L5.05 7H4a1 1 0 1 1 0-2h4V4a1 1 0 0 1 1-1Zm2 0v1h2V3h-2ZM7.05 7l1.07 11.8a1 1 0 0 0 1.02.9h5.72a1 1 0 0 0 1.02-.9L16.95 7H7.05ZM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z"/>
                        </svg>
                        Xóa
                    </button>
                </td>
            </tr>
        ));
    };

    return (
        <>
            <div
                id="static-modal"
                data-modal-backdrop="static"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden fixed inset-0 z-50 overflow-y-auto overflow-x-hidden w-full h-[100dvh]"
            >
                <div className="relative mx-auto p-4 w-full max-w-3xl">
                    {/* Card */}
                    <div
                        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
                        <div
                            className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Giỏ hàng
                            </h3>
                            <button
                                type="button"
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                data-modal-hide="static-modal"
                                aria-label="Đóng"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                                <thead
                                    className="text-xs uppercase text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                                <tr>
                                    <th scope="col" className="px-6 py-3 w-14">
                                        STT
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sản phẩm
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right">
                                        Giá
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        SL
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right">
                                        Thành tiền
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right">
                                        Hành động
                                    </th>
                                </tr>
                                </thead>
                                <tbody>{renderListProduct()}</tbody>

                                <tfoot>
                                    <tr className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                                        <th
                                            colSpan={5}
                                            className="px-6 py-4 text-right font-semibold text-gray-900 dark:text-white"
                                        >
                                            Tổng cộng
                                        </th>
                                        <th className="px-6 py-4 text-right font-bold text-blue-600 dark:text-blue-400">
                                            {listCart.reduce((total, item) => total + item.price * item.quantity, 0)} VNĐ
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {/* Footer */}
                        <div
                            className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="button"
                                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                data-modal-hide="static-modal"
                            >
                                Đóng
                            </button>
                            <button
                                data-modal-hide="static-modal"
                                onClick={pay}
                                type="button"
                                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                            >
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
