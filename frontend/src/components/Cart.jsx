import {useDispatch, useSelector} from "react-redux";
import {increaseQuantity, decreaseQuantity, removeFromCart,payNow} from "../store/cart/cartSlice.js";

const Cart = () => {
    const carts = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const formatNumber  = (number)  => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className={'bg-white border-l lg:w-[30%] fixed h-screen lg:h-auto overflow-y-scroll lg:overflow-y-hidden w-full lg:relative ' + (carts.cartOpen ? 'block' : 'hidden lg:block')}>
            <h4 className={'text-xl font-semibold p-5 py-7'}>Order details</h4>
            <div className='p-4 overflow-scroll h-[60vh]'>
                {carts && carts.products.map(p => (
                    <div key={p.id} className='flex  p-2 my-2 items-start justify-between'>
                        <img className='w-[80px] h-[80px] object-cover ' src={p.image} alt="" />
                        <div className={'flex flex-col justify-between'}>
                            <p className='text-sm '>{p.title}</p>
                            <div className={'flex items-center gap-2'}>
                                <div className='flex items-center gap-2 border border-1 rounded-md '>
                                    <button onClick={()=> dispatch(decreaseQuantity(p.id))} className='border-r px-2.5 py-1'>-</button>
                                    <span>{p.quantity}</span>
                                    <button onClick={()=> dispatch(increaseQuantity(p.id))} className='border-l px-2.5 py-1'>+</button>
                                </div>
                                <span>ks <span>{formatNumber(p.price * p.quantity)}</span></span>
                            </div>
                        </div>
                        <div className={'cursor-pointer'} onClick={()=> dispatch(removeFromCart(p.id))}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="feather feather-x">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </div>
                    </div>
                ) )}
            </div>
            {
                carts.total !== 0 &&
                <div className={'bg-bg text-md h-[37vh] p-5'}>
                    <div className={'flex justify-between py-3'}>
                        <span>Subtotal</span>
                        <p  className={'text-secondary'}><span>Ks</span> <span>{formatNumber(carts.subTotal)}</span></p>
                    </div>
                    <div className={'flex justify-between py-3'}>
                        <span>Tax(5%)</span>
                        <p  className={'text-secondary'}><span>Ks</span> <span>{formatNumber(carts.tax)}</span></p>
                    </div>
                    <div className={'border border-2 border-dashed'}></div>
                    <div className={'flex font-semibold justify-between py-3'}>
                        <span >Total</span>
                        <p  className={'text-secondary'}><span>Ks</span> <span>{formatNumber(carts.total)}</span></p>
                    </div>
                    <button onClick={()=> dispatch(payNow())} className={'bg-secondary text-white w-full h-[50px] rounded-md mt-5'}>Pay Now</button>
                </div>
            }
        </div>
    );
};

export default Cart;