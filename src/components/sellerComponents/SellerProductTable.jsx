import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Input } from '../ui/input';
import { useDispatch } from 'react-redux';
import { getProductsForSeller } from '@/redux/features/products/productSlice';
import BreadCrumbTwo from '../userComponents/BeadCrumTwo';
import AlertDialogTamplate from '../adminComponents/AlertDialogTamplate';
import  AddProductDialog  from '../adminComponents/AddProductDialog';
import { EmptyMessage } from '..';

const SellerProductTable = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [search, setSearch] = useState('');
  const pageSize = 6;
  const totalProducts = products.length;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsForSeller({ search, page }))
      .unwrap()
      .then(res => {
        setProducts(res.data);
        setTotalPages(res.pages);
      })
      .catch(err => console.log(err))
  }, [products, totalPages]);


  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }
  const handleNextPage = () => {
    if (totalPages > 1) {
      if (page < totalPages) {
        setPage(page + 1);
      }
    }
  }
  const start = (page - 1) * pageSize + 1;
  const end = Math.ceil(page * pageSize, totalProducts);



  return (
    <section className="w-full h-full">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 pb-5">
        <BreadCrumbTwo href={"/seller/dashboard"} page1={"Dashboard"} page2={"Products"} color={"text-black dark:text-white"} />
        <div className="grid sm:flex gap-5 sm:items-center sm:px-0">
          <div className="relative w-full">
            <Input
              type="search"
              id="location-search"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 dark:bg-gray-800 rounded-e-lg border-s-2 border border-orange-500 dark:placeholder-gray-400 dark:text-white focus:ring-0 focus-visible:ring-offset-0 focus:border-none"
              placeholder="Search for products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white rounded-e-lg border border-orange-700 hover:bg-orange-400 focus:outline-none">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <AddProductDialog />
        </div>
      </div>
      <div className="flex flex-col">
        {products.length === 0 ? (
         <EmptyMessage
         msg={"Products Not Found"}
         />
        ) : (
          <>
            <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-0'>
              <table className="w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr className="divide-x divide-gray-200 dark:divide-gray-600">
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700 dark:text-gray-100"
                    >
                      <span>Product</span>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-left text-sm font-normal text-gray-700 dark:text-gray-100"
                    >
                      Brand
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700 dark:text-gray-100"
                    >
                      Stock
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700 dark:text-gray-100"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700 dark:text-gray-100"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700 dark:text-gray-100"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-gray-100 dark:bg-gray-900">
                  {products.map((product) => (
                    <tr key={product._id} className="divide-x divide-gray-200 dark:divide-gray-600">
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 object-cover"
                              src={product?.images[0]?.url}
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-100">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-12 py-4">
                        <div className="text-sm text-gray-700 dark:text-gray-100">{product.brand}</div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 dark:text-gray-100">
                        <span className={`${product.quantity > 0 ? "inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800" : "inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800"}`}>
                          {product.quantity > 0 ? "Stock In" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 dark:text-gray-100">
                        {product.quantity}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 dark:text-gray-100">
                        {product.price}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">
                        <div className='flex gap-5'>
                          <Link
                            to={`/product/${product._id}`}
                          >
                           <Button className="text-blue-500 hover:text-blue-700 bg-transparent hover:bg-transparent">
                              View
                            </Button>
                          </Link>
                          <Link to={`/seller/product-update/${product._id}`}>
                            <Button className="text-green-500 hover:text-green-700 bg-transparent hover:bg-transparent">
                              Edit
                            </Button>
                          </Link>


                          <AlertDialogTamplate
                            description={"This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
                            qn={"Are you sure you want to Delete this item?"}
                            action={"Delete"}
                            btnText={"Delete"}
                            textColor={"text-red-500 hover:text-red-700"}
                            id={product._id}
                            path={"product"}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 w-full border-gray-300">
              <div className="mt-2 grid gap-5 sm:flex items-center justify-between">
                <div>
                  {`Showing ${start} to ${end} of ${products.length} results`}
                </div>
                <div className='flex'>
                  <Button type="button"
                    onClick={handlePreviousPage}
                    disabled={page <= 1}
                  >
                    &larr; Previous
                  </Button>
                  <Button
                    className="bg-transparent text-black dark:text-white border-2 border-orange-500 hover:bg-transparent"
                  >
                    {page}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNextPage}
                    disabled={page >= totalPages}
                  >
                    Next &rarr;
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SellerProductTable;
