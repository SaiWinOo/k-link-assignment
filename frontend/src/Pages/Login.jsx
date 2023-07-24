import Logo from '../assets/logo_white.png';
import Avator from './../components/icons/avator';
import Input from "../components/atoms/Input.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import {setToken, setUser} from "../store/auth/authSlice.js";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const user = useSelector((state)=> state.user);

    useEffect(() => {
        if (user.token) {
            return navigate('/');
        }
    }, []);

    const login  =  async  (e) => {
        e.preventDefault();
        setIsLoading(true);
        let res = await axios.post('/login', {email , password});
        if(res.data.message === 'success'){
            navigate('/')
        }
        dispatch(setUser(res.data?.data?.user));
        dispatch(setToken(res.data?.data?.token));
        setIsLoading(false);
    }

    return (
        <div className={'bg-primary h-screen  flex '}>
            <div className={'bg-primary w-[50vw] p-5 h-[90%] text-white'}>
                <img src={Logo} alt=""/>
                <div className={'flex flex-col items-center justify-center h-full'}>
                    <div className={'flex gap-1'}>

                        {
                            [...Array(5)].map((_, i) => (
                                <svg key={i} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.53834 0.609964C8.70914 0.199318 9.29086 0.199318 9.46166 0.609964L11.5278 5.57744C11.5998 5.75056 11.7626 5.86885 11.9495 5.88383L17.3123 6.31376C17.7556 6.3493 17.9354 6.90256 17.5976 7.19189L13.5117 10.6919C13.3693 10.8139 13.3071 11.0053 13.3506 11.1876L14.5989 16.4208C14.7021 16.8534 14.2315 17.1954 13.8519 16.9635L9.26063 14.1592C9.10062 14.0615 8.89938 14.0615 8.73937 14.1592L4.14806 16.9635C3.76851 17.1954 3.29788 16.8534 3.40108 16.4208L4.64939 11.1876C4.69289 11.0053 4.6307 10.8139 4.48831 10.6919L0.402413 7.19189C0.0646446 6.90256 0.244408 6.3493 0.687735 6.31376L6.05054 5.88383C6.23744 5.86885 6.40024 5.75056 6.47225 5.57744L8.53834 0.609964Z" fill="#FEC84B"/>
                                </svg>
                            ))
                        }

                    </div>
                    <p className={'text-white text-xl p-5 text-center w-[70%]'}>KLink has saved us thousands of hours of work. We’re able to spin up projects and features much faster.</p>
                        <Avator/>
                        <p>Lori Bryson</p>
                        <p className={'text-gray-500'}>Product Designer, Sisyphus</p>
                </div>
                <div className={'flex items-center text-gray-500 justify-between'}>
                    <a target='_blank' href="https://klinkenterprise.com" rel="noreferrer">© klinkenterprise.com</a>
                    <a href="mailto:help@klinkenterprise.com">help@klinkenterprise.com</a>
                </div>
            </div>
            <div className={'bg-white w-[50vw] flex items-center justify-center'}>
                <div>
                    <h3 className={'text-3xl font-semibold'}>Log in</h3>
                    <p className={'text-gray-500 text-md my-1'}>Welcome back! Please enter your details</p>
                    <form onSubmit={login}>
                        <div className={'mt-8'}>
                            <label htmlFor="email" className={'text-gray-500'}>Email</label>
                            <Input id={'email'} onChange={(e)=> setEmail(e.target.value)} placeholder={'Enter your email'}/>
                        </div>
                        <div>
                            <label htmlFor="password" className={'text-gray-500'}>Password</label>
                            <Input id={'password'} onChange={(e)=> setPassword(e.target.value)} type={'password'}/>
                        </div>
                        <button type={'submit'} className={'bg-secondary flex items-center justify-center text-white text-md w-full mt-8 py-2 rounded-md'}>

                            {
                                isLoading &&
                                <div role="status">
                                    <svg aria-hidden="true"
                                         className="w-6 h-6 mr-2 text-white animate-spin fill-secondary"
                                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"/>
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            }
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;