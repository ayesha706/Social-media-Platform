import React from 'react'
import { Comments } from '../sections/Comments'
export const Home = () => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center py-7 bg-gray-100">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full py-4">
                    <div className="flex justify-between items-center">
                        <div className=" mb-1 p-3">
                            <span className="text-gray-800 font-semibold">John Doe</span><br />
                            <span className="text-gray-600  ">2 hours ago</span>
                        </div>
                    </div>
                    <div className="p-3">
                        <p className="text-gray-700 leading-tight mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu sapien porttitor, blandit velit ac,
                            vehicula elit. Nunc et ex at turpis rutrum viverra.
                        </p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606" alt="Mountain" className="w-full h-64 object-cover" />
                    <div className='flex p-3 gap-2'>
                        <button>Like</button>
                        <button>Comment</button>
                    </div>
                    <Comments />
                </div>
               
            </div>

        </div>
    )
}
