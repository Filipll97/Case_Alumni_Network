import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGroupById } from "../../api/group";
import { getPostById } from "../../api/post";
import { useUser } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Reply from "./Reply";


function PostThread() {
    const { user, setUser } = useUser();
    const { postId } = useParams();
    const [post, setPost] = useState();
    const [comment, setComment] = useState("");
    const [groupName, setGroupName] = useState("");


    async function fetchGroupName(groupId) {
        const groupData = await getGroupById(groupId);
        if (groupData && groupData) {
            setGroupName(groupData.name);
        } else {
            setGroupName("Unknown Group");
        }
    }

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const postData = await getPostById(postId);
                    if (postData) {
                        setPost(postData);
                        fetchGroupName(postData.groupId);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [user, postId]);

    function formatLastUpdatedDate(lastUpdatedDate) {
        const currentDate = new Date();
        const lastUpdated = new Date(lastUpdatedDate);
        const diffInMs = currentDate - lastUpdated;
        const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));

        if (diffInHours < 24) {
            return `${diffInHours} hour(s) ago`;
        } else {
            const diffInDays = Math.round(diffInHours / 24);
            return `${diffInDays} days ago`;
        }
    }

    function handleChange(event) {
        setComment(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (comment.trim()) {
                handleSubmit(event);
            }
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // Save the comment using your API here
        console.log("Comment submitted:", comment);

        // Clear the input field
        setComment("");
    }

    if (!post) {
        return <div>Loading Post...</div>;
    }

    return (
        <div className="row-span-2 col-span-2 mr-12 ml-12 mt-24">
            <article className="p-6 rounded-lg card shadow-md hover:bg-gray-700 mb-4">
                <div className="flex justify-between items-center mb-2 text-gray-500">
                    <span>
                        <span>{groupName || "Loading..."}</span>
                    </span>
                    <span className="text-sm">{formatLastUpdatedDate(post.lastUpdated)}</span>
                </div>
                <h2 className="mb-4 text-2xl font-medium tracking-tight text-gray-900 dark:text-white">{post.title} </h2>
                <p className="mb-6 font-light text-gray-500 dark:text-gray-400">{post.body}</p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <img className="w-7 h-7 rounded-full text-xs" src={post.author.picture} alt="Profile Picture" />
                        <span className="font-medium dark:text-white">
                            <Link to={`/user/${post.author.id}`} className="hover:underline hover:text-gray-50">
                                {post.author.username}
                            </Link>
                        </span>
                    </div>
                    <span className="inline-flex items-center text-sm">
                        {post.replies.length} comments
                    </span>
                </div>
            </article>
            <div className="mt-8">
                <form onSubmit={handleSubmit} className="relative">
                    <textarea
                        className="w-full h-24 p-2 pl-4 pr-10 mb-4 rounded shadow-sm resize-none card text-white"
                        value={comment}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Write your comment here..."
                    />
                    <button
                        className="absolute right-2 bottom-6 text-white bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700"
                        type="submit"
                        disabled={!comment.trim()}
                    >
                        <FontAwesomeIcon icon="arrow-right" />
                    </button>
                </form>
            </div>
            <div className="mt-8">
                {post.replies.length > 0 && <h3 className="text-lg font-semibold mb-4 text-white">Replies:</h3>}
                {post.replies.map((reply) => (
                    <Reply key={reply.id} reply={reply} />
                ))}
            </div>
        </div >
    );
}
export default PostThread