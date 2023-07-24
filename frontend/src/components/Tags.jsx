import axios from "axios";
import { setTags,setCurrentTag} from "../store/products/productSlice.js";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const Tags = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const tags = useSelector((state)=> state.products.tags);
    const current_tag = useSelector((state)=> state.products.current_tag);
    const user = useSelector(state => state.user);
    const fetchProducts = async () => {
        if (!isLoading && user.token) {
            let res = await axios.get('tags');
            dispatch(setTags(res.data.data.tags));
            setIsLoading(false);
        }
    }
    useEffect(()=> {
        fetchProducts();
    },[]);

    return (
        <div className="tag-container my-2 w-full overflow-x-scroll no-scrollbar">
            <div className="tags whitespace-nowrap p-2">
                <span onClick={()=> dispatch(setCurrentTag('all'))} className={"tag bg-gray-100 px-4 py-2 cursor-pointer rounded-full text-sm mr-2 " + (current_tag === 'all' ? " bg-secondary text-white" : "")}>all</span>

                {tags && tags.map((t)=>
                    <span onClick={()=> dispatch(setCurrentTag(t.id))} key={t.id} className={"tag cursor-pointer bg-gray-100 px-4 py-2 rounded-full text-sm mr-2 " + (current_tag === t.id ? " bg-secondary text-white" : "")}>{t.name}</span>
                )}
            </div>
        </div>
    );
};

export default Tags;