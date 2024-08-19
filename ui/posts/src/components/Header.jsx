import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <div>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <p>Posts</p>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <Link to="/" className=" px-3 py-2 text-sm font-medium text-white">Home</Link>
                                    <Link to="/dashboard" className=" px-3 py-2 text-sm font-medium text-white">Dashboard</Link>
                                    <Link to="/msg" className=" px-3 py-2 text-sm font-medium text-white">Message</Link>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                            <div className="relative ml-3">
                                <div>
                                    <Link to="/login">
                                        <button type="button" className="relative flex text-white text-xl rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" >
                                            Log in
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </nav>
        </div>
    )
}
