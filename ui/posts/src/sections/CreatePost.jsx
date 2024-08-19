import React, { useState } from 'react'
import { useMakePostMutation } from '../redux/postSlice'
import { useNavigate } from 'react-router-dom'
export const CreatePost = () => {
    const [postTitle, setTitle] = useState('');
    const [postContent, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [makePost, {isLoading}] = useMakePostMutation();
    const navigate = useNavigate();
    const handlePostSubmit = async () => {
       
            const formData = new FormData();
            formData.append('title', postTitle);
            formData.append('content', postContent);
            formData.append('image', image);
            try {
            await makePost( formData).unwrap();
            navigate("/")
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <div className="heading text-center font-bold text-2xl m-5 text-gray-800"> Create New Post</div>
            <div className="editor mx-auto w-8/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" placeholder="Title" type="text" 
                  value={postTitle}
                  onChange={(e) => setTitle(e.target.value)}/>
                <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" placeholder="Describe everything about this post here"
                value={postContent}
                onChange={(e) => setContent(e.target.value)}></textarea>

                <div className="icons flex justify-between text-gray-500 m-2">
                 <input type='file'  onChange={(e) => setImage(e.target.files[0])}/>
                  
                 <div className="btn border border-indigo-500 p-1 px-4 float-end font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
                  onClick={handlePostSubmit} >
            {isLoading ? 'Loading...' : 'Post'}</div>
                </div>
            </div>
        </div>
    )
}
