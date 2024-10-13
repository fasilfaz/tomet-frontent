import Radio from '@/components/userComponents/RadioComp'
import { EmptyMessage, ProductCard, SubBanner } from '../../components'
import React, { useEffect, useState } from 'react'
import { priceData, sortData } from '@/data'
import { useDispatch } from 'react-redux'
import { axiosInstance } from '@/lib/axiosInstance'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Helmet } from 'react-helmet'
import { GetBrands } from '@/redux/features/products/productSlice'
import { getCategories } from '@/redux/features/categories/CategoriesSlice'

const ProductPage = () => {
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [checkedBrands, setCheckedBrands] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([]);
    const [selectedSortRange, setSelectedSortRange] = useState({}); 
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [totalPages, setTotalPages] = useState(null);
    const [page, setPage] = useState(1);
    const pageSize = 6;
    const totalProducts = products?.length;

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

    useEffect(() => {
        const data = {
            category: checkedCategories,
            brand: checkedBrands,
            radio: selectedPriceRange,
            sort: selectedSortRange,
        }
        dispatch(getCategories())
            .unwrap()
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));

        dispatch(GetBrands())
            .unwrap()
            .then(res => setBrands(res.data))
            .catch(err => console.log(err));

        axiosInstance.post(`/api/v1/product/fetch/products/user?page=${page}&search=${search}`, data, { withCredentials: true })
            .then((res) => {
                setProducts(res.data.data);
                setTotalPages(res.data.pages);
            })
            .catch((err) => console.log(err));
    }, [products, checkedBrands, checkedCategories, selectedPriceRange, selectedSortRange]);

    const handleCheckboxChange = (categoryId) => {
        if (checkedCategories.includes(categoryId)) {
            setCheckedCategories(checkedCategories.filter(id => id !== categoryId));
        } else {
            setCheckedCategories([...checkedCategories, categoryId]);
        }
    };

    const handleBrandCheckboxChange = (brandName) => {
        if (checkedBrands.includes(brandName)) {
            setCheckedBrands(checkedBrands.filter(name => name !== brandName));
        } else {
            setCheckedBrands([...checkedBrands, brandName]);
        }
    };

    const handlePriceChange = (value) => {
        setSelectedPriceRange(value);
        console.log("Selected price range:", value);
        // Perform filtering or other actions based on selected price range
    };
    const handleSortChange = (value) => {
        setSelectedSortRange(value);
        console.log("Selected price range:", value);
        // Perform filtering or other actions based on selected price range
    };

    return (
        <section className='relative'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Shop Furniture - Urban Nest | Quality Home Furnishings for Every Room</title>
                <meta name="description" content="Discover Urban Nest's collection of quality furniture for every room. Browse our wide selection of living room, bedroom, dining, and outdoor furniture. Shop online and transform your space today!" />
                <meta name="keywords" content="urban nest shop furniture, online furniture store, living room furniture, bedroom sets, dining furniture, outdoor decor, modern furniture" />
                <link rel="canonical" href="https://urban-nest-app.netlify.app/shop" />
            </Helmet>
            <SubBanner title={"Products"} href={'/'} page1={"Home"} page2={"Products"} color={"text-black"} />
            <section className='grid gap-5 sm:gap-0 grid-cols-12'>
                <div className="sm:sticky sm:left-0 sm:col-span-4 lg:col-span-2 col-span-12 ">
                    <aside id="sidebar-multi-level-sidebar" aria-label="Sidebar">
                        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-950">
                            <ul className="space-y-2 grid gap-5 font-medium">
                                <li>
                                    <h2 className='font-semibold text-lg'>FILTER BY CATEGORIES</h2>
                                    <ul className='space-y-2 pt-2 font-normal'>
                                        {categories?.map(category => (
                                            <li key={category._id} className="flex items-center gap-5">
                                                <input
                                                    type="checkbox"
                                                    id={`category-${category._id}`}
                                                    checked={checkedCategories.includes(category._id)}
                                                    onChange={() => handleCheckboxChange(category._id)}
                                                    className="hidden"
                                                />
                                                <label
                                                    htmlFor={`category-${category._id}`}
                                                    className="relative cursor-pointer flex items-center"
                                                >
                                                    <div className="w-4 h-4 border border-orange-500 rounded-md flex-shrink-0 mr-2">
                                                        {checkedCategories.includes(category._id) && (
                                                            <div className="w-4 h-4 bg-orange-500 rounded-md"></div>
                                                        )}
                                                    </div>
                                                    <p className="uppercase">{category.name}</p>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li>
                                    <h2 className='font-semibold text-lg'>FILTER BY BRANDS</h2>
                                    <ul className='space-y-2 pt-2 font-normal'>
                                        {brands?.map(brand => (
                                            <li key={brand} className="flex items-center gap-5">
                                                <input
                                                    type="checkbox"
                                                    id={`brand-${brand}`}
                                                    checked={checkedBrands.includes(brand)}
                                                    onChange={() => handleBrandCheckboxChange(brand)}
                                                    className="hidden"
                                                />
                                                <label
                                                    htmlFor={`brand-${brand}`}
                                                    className="relative cursor-pointer flex items-center"
                                                >
                                                    <div className="w-4 h-4 border border-orange-500 rounded-md flex-shrink-0 mr-2">
                                                        {checkedBrands.includes(brand) && (
                                                            <div className="w-4 h-4 bg-orange-500 rounded-md"></div>
                                                        )}
                                                    </div>
                                                    <p className="uppercase">{brand}</p>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li>
                                    <h2 className='font-semibold text-lg'>FILTER BY PRICE</h2>
                                    <div className="space-y-2 pt-2 font-normal">
                                        {priceData?.map(price => (
                                            <Radio
                                                key={price._id}
                                                id={`price-${price._id}`}
                                                name="price"
                                                value={price.array}
                                                checked={selectedPriceRange === price.array}
                                                onChange={() => handlePriceChange(price.array)}
                                                label={price.name}
                                            />
                                        ))}
                                    </div>
                                </li>
                                <li>
                                    <h2 className='font-semibold text-lg'>SORT BY</h2>
                                    <div className="space-y-2 pt-2 font-normal">
                                        {sortData?.map(sortItem => (
                                            <Radio
                                                key={sortItem._id}
                                                id={`sortItem-${sortItem._id}`}
                                                name="sortItem"
                                                value={sortItem.value}
                                                checked={selectedSortRange === sortItem.value}
                                                onChange={() => handleSortChange(sortItem.value)}
                                                label={sortItem.name}
                                            />
                                        ))}
                                    </div>
                                </li>
                            </ul>
                            <div className='pt-4'>
                                <Button onClick={() => window.location.reload()}>
                                    RESET FILTERS
                                </Button>
                            </div>
                        </div>
                    </aside>
                </div>
                <div className="sm:col-span-8 lg:col-span-10 col-span-12 container py-5">
                    <div>
                        <form className="max-w-md ms-auto pb-5">
                            <div className="flex">
                                <div className="relative w-full">
                                    <Input
                                        type="search"
                                        value={search}
                                        id="location-search"
                                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-2 border border-orange-500 dark:placeholder-gray-400 dark:text-white bg-transparent"
                                        placeholder="Search for products"
                                        required
                                        onChange={(e) => setSearch(e.target.value)} />
                                    <Button type="submit" className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white rounded-e-lg border border-orange-700 hover:bg-orange-400 focus:outline-none">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </Button>
                                </div>
                            </div>
                        </form>
                        {products?.length > 0 ? (
                            <div>
                                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    <ProductCard products={products} />
                                </div>

                                <div className="mt-5 grid gap-5 sm:flex items-center justify-between">
                                    <div>
                                        {`Showing ${start} to ${end} of ${products?.length} results`}
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

                        ) : (
                            <EmptyMessage msg={"Products not found"} />
                        )}

                    </div>
                </div>
            </section>
        </section>
    )
}

export default ProductPage