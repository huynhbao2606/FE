export default function Shoe(props) {
    const {
        data,
        // handleDetailProps,
        handleAddToCart
    } = props;

    return (
        <div
            className="group relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
        >
            {/* Hình ảnh */}
            <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
                <img
                    src={data?.image}
                    alt={data?.name || "Sản phẩm"}
                    className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            {/* Nội dung */}
            <div className="p-5">
                <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                    {data?.name}
                </h3>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {data?.shortDescription}
                </p>

                <p className="mt-2 font-bold text-green-600">
                    ${data?.price}
                </p>

                <div className="mt-4 flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() =>{
                            // handleDetailProps?.(data)
                    }}
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                        Xem chi tiết
                    </button>
                </div>

                <button
                    className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                    type="button"
                    onClick={() => handleAddToCart?.(data)}
                >
                    Add To Cart
                </button>
            </div>
        </div>
    );
}
