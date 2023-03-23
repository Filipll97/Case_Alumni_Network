import keycloak from "../keycloak";
import { useUser } from "../context/UserContext";
import { getUserPosts } from "../api/post";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGroups } from "../api/group";
import { getTopics } from "../api/topic";
import GroupList from "../components/Group/GroupList";
import PostList from "../components/Post/PostList";

function DashBoardPage() {

    const { user, setUser } = useUser()
    const [posts, setPosts] = useState();
    const [groups, setGroups] = useState();
    const [topics, setTopics] = useState();

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const postData = await getUserPosts();
                    if (postData) {
                        setPosts(postData);
                        console.log(postData);
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

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const topicData = await getTopics();
                    if (topicData) {
                        setTopics(topicData);
                    }
                } catch (error) {
                    console.log(error);
                }

            };
            fetchData()
        }
    }, [user]);

    function isMember(userId, topic) {
        return topic.users.some((u) => u.id === userId) ? "✔" : null;
    }

    if (!user) {
        return <div>Loading Dashboard...</div>;
    }
    return (
        <div>

            {/* {keycloak.token && (
                <div>
                    <pre>{keycloak.token}</pre>
                </div>
            )} */ }

            <div className="grid grid-rows-3 grid-flow-col gap-1">

                <div className="row-span-2 rounded-lg">
                    <aside id="default-sidebar" className="fixed top-25 left-0 z-40 w-56 h-screen transition-transform -translate-x-full lg:translate-x-0" aria-label="Sidebar">
                        <div className="h-full overflow-y-auto">
                            <p className="text-gray-400 mt-4 px-4 mb-2">Popular Topics</p>
                            <ul className="space-y-2">
                                {topics &&
                                    topics.map((topic) => (
                                        <li key={topic.id}>
                                            <Link to="/group" className="flex items-center text-base font-normal rounded-lg text-white hover:bg-gray-700">
                                                <small className="flex flex-shrink justify-between p-2 text-md">
                                                    <span>{topic.name}</span>
                                                    <span className="text-blue-500 font-bold">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{isMember(user.id, topic)}</span>
                                                </small>
                                            </Link>
                                        </li>

                                    ))
                                }
                            </ul>
                        </div>
                    </aside>
                </div>
                <PostList posts={posts} />
                <GroupList groups={groups} />
            </div>
        </div >
    );
}
export default DashBoardPage;
