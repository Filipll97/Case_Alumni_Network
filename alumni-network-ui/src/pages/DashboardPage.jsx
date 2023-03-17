import keycloak from "../keycloak";
import { useUser } from "../context/UserContext";
import { getUserPosts } from "../api/post";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGroups } from "../api/group";
import GroupList from "../components/group/GroupList";

function DashBoardPage() {

    const { user, setUser } = useUser()
    const [posts, setPosts] = useState();
    const [groups, setGroups] = useState();

    if (keycloak.token && keycloak.isTokenExpired()) {
        keycloak.updateToken();
    }

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const postData = await getUserPosts();
                    if (postData) {
                        setPosts(postData);
                    }
                } catch (error) {
                    console.log(error);
                }

            };
            fetchData()
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const groupData = await getGroups();
                    if (groupData) {
                        setGroups(groupData);
                    }
                } catch (error) {
                    console.log(error);
                }

            };
            fetchData()
        }
    }, [user]);

    console.log(groups)

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

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {keycloak.token && (
                <div>
                    <pre>{keycloak.token}</pre>
                </div>
            )}
            <div className="flex flex-row p-2  items-center justify-center gap-9">
                <div className="flex flex-col items-center pt-12">
                    <p className="pb-8 text-2xl font-semibold">Dashboard</p>
                    {posts &&
                        posts.map((post) => (
                            <a href="#">
                                <div key={post.id} className="item-container m-2">
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

    const publicGroups = groups?.filter(group => !group.isPrivate);

    return (
        <div>

            {/* {keycloak.token && (
                <div>
                    <pre>{keycloak.token}</pre>
                </div>
            )} */}
            <div className="grid grid-rows-3 grid-flow-col gap-4">
                <div className="row-span-3 rounded-lg m-2 ml-12 mt-12">
                    <div className="text-center">
                        <p className="mb-2 mt-2 text-lg font-semibold text-gray-400">Popular Groups</p>
                    </div>
                    <GroupList groups={publicGroups} />
                </div>
                {/* <div className="col-span-2">03</div> */}
                <div className="row-span-2 col-span-4 mr-16 mt-12">
                    <div className="text-center">
                        <p className="pb-4 text-lg font-semibold text-gray-400 mt-2">Posts</p>
                    </div>
                    {posts &&
                        posts.map((post) => (
                            <Link to="/posts" key={post.id}>
                                <div key={post.id} className="item-container">
                                    <div>
                                        <div className="bg-gray-800 rounded-lg p-3 border-slate-600 border-2 hover:border-slate-400">
                                            <p className="text-lg font-semibold">{post.title}</p>
                                            <p className="text-gray-400 pt-3 pb-2 text-sm">{post.body}</p>
                                            <div className="flex flex-shrink justify-between">
                                                <small className="text-gray-500 ml-auto">{formatLastUpdatedDate(post.lastUpdated)} by<span className="text-gray-500 hover:text-gray-300">{post.author.username}</span></small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
export default DashBoardPage;
