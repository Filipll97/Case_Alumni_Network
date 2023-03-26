import React from "react";
import { Link } from "react-router-dom";

function Reply({ reply }) {
    return (
        <div className="flex items-start space-x-4 my-4 p-4 border-b border-gray-700">
            <img className="w-7 h-7 rounded-full text-xs" src={reply.author.picture} alt="Profile Picture" />
            <div className="text-white">
                <span className="font-medium dark:text-white">
                    <Link to={`/user/${reply.author.id}`} className="hover:underline hover:text-gray-50">
                        {reply.author.username}
                    </Link>
                </span>
                <p className="text-gray-300 text-sm pt-3 px-1">{reply.body}</p>
            </div>
        </div>
    );
}

export default Reply;