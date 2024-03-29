import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGroupPosts } from "../../api/post";
import { getUserById } from "../../api/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";


function GroupPosts({ group }) {

    const [groupPosts, setGroupPosts] = useState();
    const [usernames, setUsernames] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const groupData = await getGroupPosts(group.id);
                if (groupData) {
                    setGroupPosts(groupData);
                }
            } catch (error) {
                console.log(error);
            }

        };
        fetchData()
    }, []);

    function formatLastUpdatedDate(lastUpdatedDate) {
        const currentDate = new Date();
        const lastUpdated = new Date(lastUpdatedDate);
        const diffInMs = currentDate - lastUpdated;
        const diffInMinutes = Math.round(diffInMs / (1000 * 60));
        const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));

        if (diffInMinutes < 60) {
            return `${diffInMinutes} minute(s) ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hour(s) ago`;
        } else {
            const diffInDays = Math.round(diffInHours / 24);
            return `${diffInDays} day(s) ago`;
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

    if (!groupPosts) {
        return <div>Loading Posts...</div>;
    }

    return (
        <div className="row-span-2 rounded-lg">
            {groupPosts &&
                groupPosts.map((post) => {
                    return (
                        <div key={post.id}>
                            <article className="p-6 rounded-lg card shadow-md hover:bg-gray-700 mb-4">
                                <div className="flex justify-between items-center mb-2 text-gray-500">
                                    <span>{group.name}</span>
                                    <span className="text-sm">{formatLastUpdatedDate(post.lastUpdated)}</span>
                                </div>
                                <Link to={`/posts/user/${post.id}`}>
                                    <h2 className="mb-4 text-2xl font-medium tracking-tight text-gray-900 dark:text-white">{post.title} </h2>
                                </Link>
                                <p className="mb-6 font-light text-gray-500 dark:text-gray-400">{post.body}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-4">
                                        <img className="w-7 h-7 rounded-full text-xs" src={post.author.picture} alt="Profile Picture" />
                                        <span className="font-medium dark:text-white">
                                            <Link to={`/user/${post.author.id}`} className="hover:underline hover:text-gray-50">
                                                {usernames[post.authorId] || (getUserForPost(post.authorId), "Loading...")}
                                            </Link>
                                        </span>
                                    </div>
                                    {post.replies &&
                                        <span className="inline-flex items-center text-sm">
                                            {post.replies.length} <FontAwesomeIcon className="ml-1" icon={faComments} />
                                        </span>
                                    }
                                </div>
                            </article>
                        </div>
                    );
                })}

        </div>
    );
}

export default GroupPosts