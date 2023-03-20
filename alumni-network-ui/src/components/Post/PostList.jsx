import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getUserById } from "../../api/user";
import { useUser } from "../../context/UserContext";

function PostList({ posts }) {

    const { user, setUser } = useUser();
    const [usernames, setUsernames] = useState({});


    function formatLastUpdatedDate(lastUpdatedDate) {
        const currentDate = new Date();
        const lastUpdated = new Date(lastUpdatedDate);
        const diffInMs = currentDate - lastUpdated;
        const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));

        if (diffInHours < 24) {
            return `${diffInHours} hours ago`;
        } else {
            const diffInDays = Math.round(diffInHours / 24);
            return `${diffInDays} days ago`;
        }
    }

    async function getUserForPost(authorId) {
        try {
            const authorData = await getUserById(authorId);
            if (authorData) {
                setUsernames((prevState) => ({
                    ...prevState,
                    [authorId]: authorData.username,
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="row-span-2 col-span-2 mr-12 ml-12 mt-12">
            <div className="text-center">
                <p className="pb-4 text-lg font-semibold text-gray-400 mt-2">Posts</p>
            </div>
            {posts &&
                posts.map((post) => (
                    <Link to="/group" key={post.id}>
                        <div key={post.id} className="item-container mb-4">
                            <div>
                                <div className="bg-gray-800 rounded-lg p-3 border-slate-600 border-2 hover:border-slate-400">
                                    <p className="text-lg font-semibold">{post.title}</p>
                                    <p className="text-gray-400 pt-3 pb-2 text-sm">{post.body}</p>
                                    <div className="flex flex-shrink justify-between">
                                        <small className="text-gray-500 ml-auto">{formatLastUpdatedDate(post.lastUpdated)} by <span className="text-gray-500 hover:text-gray-300"> {usernames[post.authorId] ||
                                            (getUserForPost(post.authorId), "Loading...")}</span></small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            }
            {/* <article class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-between items-center mb-5 text-gray-500">
                    <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                        <svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                        Tutorial
                    </span>
                    <span class="text-sm">14 days ago</span>
                </div>
                <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">How to quickly deploy a static website</a></h2>
                <p class="mb-5 font-light text-gray-500 dark:text-gray-400">Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.</p>
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-4">
                        <img class="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                        <span class="font-medium dark:text-white">
                            Jese Leos
                        </span>
                    </div>
                    <a href="#" class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                        Read more
                        <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                </div>
            </article> */}
        </div>



    );
}

export default PostList;