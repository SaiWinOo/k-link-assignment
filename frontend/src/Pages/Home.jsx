import {useEffect, useState} from 'react';
import Logo from './../assets/logo.png';
import {BiCart, BiSearch} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {setCurrentPage, setCurrentTag, setLastPage, setProducts} from "../store/products/productSlice.js";
import Cart from "../components/Cart.jsx";
import {addToCart} from "../store/cart/cartSlice.js";
import {debounce} from "lodash";
import Tags from "../components/Tags.jsx";
import {toggleCartState} from "../store/cart/cartSlice.js";

const Home = () => {

    const navigate = useNavigate();
    const products = useSelector(state => state.products);
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');

    const fetchProducts = async (url, replace = false) => {
        if (!isLoading && user.token) {
            setIsLoading(true);
            let res = await axios.get(url ? url : 'products?page=' + parseInt(products.current_page));
            dispatch(setProducts({products: res.data.data.products.data, replace}));

            dispatch(setLastPage(res.data.data.products.last_page));
            dispatch(setCurrentPage(parseInt(res.data.data.products.current_page) + 1));
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!user.token) {
            return navigate('/login');
        }
    }, []);

    useEffect(() => {
        if (search !== '') {
            dispatch(setCurrentTag('all'));
        }
        let url = `products?search=${search}&tag=${products.current_tag}`;
        const fetchProductsDebounced = debounce(() => {
            fetchProducts(url, true);
        }, 500);

        fetchProductsDebounced();
    }, [search, products.current_tag])

    const handleScroll = () => {
        const container = document.querySelector('.products-container');
        if (container && container.scrollHeight < container.scrollTop + container.clientHeight + 10) {
            if (!isLoading && products.last_page >= products.current_page) {
                fetchProducts();
            }
        }
    };

    useEffect(() => {
        const container = document.querySelector('.products-container');
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [isLoading]);


    const handleClickProduct = (product) => {
        dispatch(addToCart(product));
    }

    const formatNumber  = (number)  => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <div className='bg-gray-100 min-h-screen flex'>
            <div className='p-5 bg-white w-full lg:w-[70%]'>
                <div className='flex items-center justify-between'>
                    <img className={'w-130px]'} src={Logo} alt=""/>
                    <div className='border p-1 px-2 w-[45%] rounded-md flex items-center'>
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='w-full '
                               placeholder='Search'/>
                        <div className='bg-secondary text-white px-5 py-2 rounded-full'>
                            <BiSearch/>
                        </div>
                    </div>
                </div>
                <div onClick={()=> dispatch(toggleCartState())} className={'fixed z-50 bottom-5 lg:hidden right-5 rounded-full text-white bg-secondary p-2  cursor-pointer'}>
                    <BiCart className={'text-2xl'}/>
                </div>
                <Tags/>
                {
                    !isLoading && !products.products?.length && 
                    <div className='text-center my-5 text-gray-600 py-5 text-2xl '>
                        No products found!
                    </div>
                }
                <div className={'mx-auto products-container no-scrollbar overflow-scroll h-[90vh]'}>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4  pt-5 mt-3 '>
                        {products.products && products.products.map((item) => (
                            <div onClick={() => handleClickProduct(item)} key={item.id}
                                 className='bg-white cursor-pointer shadow-md h-[300px] rounded-md w-[200px] p-2'>
                                <img className='w-[200px] h-[200px] rounded-md object-cover' src={item.image} alt=''/>
                                <p className='text-sm'>{item.title}</p>
                                <p className='text-sm text-secondary'>
                                    ks <strong className='text-secondary text-lg'>{formatNumber(item.price)}</strong>
                                </p>
                            </div>
                        ))}
                    </div>
                    {
                        isLoading && <div className={'h-[200px] py-10 animate-pulse w-full text-2xl text-center'}>
                            Loading products</div>
                    }
                </div>

            </div>

            <Cart/>

        </div>
    );
};

export default Home;