import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById, createPost } from "../../api/post";
import { useUser } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Reply from "./Reply";
import PostGroupName from "./PostGroupName";


function PostThread() {
    const { user, setUser } = useUser();
    const { postId } = useParams();
    const [post, setPost] = useState();
    const [comment, setComment] = useState("");
    const [updateComments, setUpdateComments] = useState(false);


    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const postData = await getPostById(postId);
                    if (postData) {
                        console.log("Postdata: ", postData)
                        setPost(postData);
                    }
                    if (updateComments) {
                        setUpdateComments(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [user, postId, updateComments]);

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

        const postData = {
            body: comment,
            recieverId: post[0].author.id,
            parentId: post[0].id,
        };

        try {
            const response = await createPost(postData);
            console.log("Response: ", response)
            setUpdateComments(true); // trigger comments update
        } catch (error) {
            console.error(error);
        }

        setComment("");
    }

    if (!post) {
        return <div>Loading Post...</div>;
    }

    console.log(post[0])

    return (
        <div className="container mx-auto">
            <div className="row-span-2 col-span-2 mr-12 ml-12 mt-24">
                <article className="p-6 rounded-lg card hover:bg-gray-700 mx-auto lg:w-1/2 w-full shadow">
                    <div className="flex justify-between items-center mb-2 text-gray-500">
                        {post[0].groupId && <PostGroupName groupId={post[0].groupId} />}
                        <span className="text-sm">{formatLastUpdatedDate(post[0].lastUpdated)}</span>
                    </div>
                    <h2 className="mb-4 text-2xl font-medium tracking-tight text-gray-900 dark:text-white">{post[0].title}</h2>
                    <p className="mb-6 font-light text-gray-500 dark:text-gray-400">{post[0].body}</p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            {post[0].author && (
                                <>
                                    <img className="w-7 h-7 rounded-full text-xs" src={post[0].author.picture} alt="Profile Picture" />
                                    <span className="font-medium dark:text-white">
                                        <Link to={`/user/${post[0].author.id}`} className="hover:underline hover:text-gray-50">
                                            {post[0].author.username}
                                        </Link>
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </article>
                <div className="mt-4 flex justify-center">
                    <form onSubmit={handleSubmit} className="lg:w-1/2 w-full relative">
                        <textarea
                            className="w-full h-32 p-4 pl-4 pr-10 mb-4 rounded-lg resize-none card text-white shadow-lg"
                            value={comment}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Write your comment here..."
                        />
                        <button
                            className="absolute right-2 bottom-6 text-white bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700"
                            type="submit"
                            disabled={!comment.trim()}
                        >
                            <FontAwesomeIcon icon="arrow-right" />
                        </button>
                    </form>
                </div>
                <div className="mt-5 flex justify-center items-center">
                    {post[0].author && post[0].replies.length > 0 && (
                        <>
                            {/* <span>{post[0].author.recievedPosts}</span> */}
                            {/* <h3 className="text-lg font-semibold mb-4 text-white">Replies:</h3> */}
                            <div className="lg:w-1/2 w-full card rounded-lg shadow-lg">
                                {/* render new reply */}
                                {post[0].replies
                                    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
                                    .map((reply, index) => (
                                        <Reply key={reply.id} reply={reply} index={index} />
                                    ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
export default PostThread