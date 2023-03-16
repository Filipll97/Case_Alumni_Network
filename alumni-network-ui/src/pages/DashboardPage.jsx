import keycloak from "../keycloak";
import { useUser } from "../context/UserContext";
import { getUserPosts } from "../api/post";
import { useEffect, useState } from "react";

function DashBoardPage() {

    const { user, setUser } = useUser()
    const [posts, setPosts] = useState();

    if (keycloak.token && keycloak.isTokenExpired()) {
        keycloak.updateToken();
    }

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const data = await getUserPosts();
                    if (data) {
                        setPosts(data);
                    }
                } catch (error) {
                    console.log(error);
                }

            };
            fetchData()
        }
    }, [user]);

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

    console.log(posts)

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* {keycloak.token && (
                <div>
                    <pre>{keycloak.token}</pre>
                </div>
            )} */}
            <div className="flex flex-col items-center pt-12">
                <p className="pb-8 text-2xl font-semibold">Dashboard</p>
                {posts &&
                    posts.map((post) => (
                        <a href="#">
                            <div key={post.id} className="item-container">
                                <div>
                                    <div className="bg-gray-800 rounded-lg p-24 border-slate-600 border-2 hover:border-slate-400">
                                        <p className="text-lg font-semibold">{post.title}</p>
                                        <p className="text-gray-400 pt-3 pb-2 text-sm">{post.body}</p>
                                        <small className="block pt-2 text-gray-500">{formatLastUpdatedDate(post.lastUpdated)} by <a href="#"><span className="text-gray-500 hover:text-gray-300">{post.author.username}</span></a></small>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))
                }
            </div>
        </div>

    );
}
export default DashBoardPage;
