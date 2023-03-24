import keycloak from "../keycloak";
import { useUser } from "../context/UserContext";
import { getUserPosts } from "../api/post";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getGroups } from "../api/group";
import { getTopics } from "../api/topic";
import GroupList from "../components/Group/GroupList";
import PostList from "../components/Post/PostList";
import GroupsModal from "../components/Group/GroupsModal";

function DashBoardPage() {
    const { user, setUser } = useUser()
    const [posts, setPosts] = useState();
    const [groups, setGroups] = useState();
    const [topics, setTopics] = useState();
    const [showGroupsModal, setShowGroupsModal] = useState(false);

    const toggleGroupsModal = () => {
        setShowGroupsModal(!showGroupsModal);
    };

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
        <div className="container mx-auto">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-6 mt-6">Dashboard</h1>
            </div>
            <div className="relative">
                <button
                    className="absolute bottom-0 right-0 bg-blue-700 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-700 lg:hidden"
                    onClick={toggleGroupsModal}
                >
                    <div className="">Groups</div>
                </button>
                {showGroupsModal && (
                    <GroupsModal groups={groups} onClose={toggleGroupsModal} />
                )}
            </div>
            <div className="grid grid-cols-6 gap-4 lg:px-4">
                <div className="col-span-1 lg:block hidden">
                    <div className="h-full overflow-y-auto">
                        <p className="text-gray-400 mt-4 mb-2">Popular Topics</p>
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
                </div>
                <div className="lg:col-span-3 xl:col-span-3 lg:mx-0 col-span-6">
                    <PostList posts={posts} />
                </div>
                <div className="col-span-2 lg:block hidden">
                    <GroupList groups={groups} />
                </div>
            </div>
        </div >
    );
}
export default DashBoardPage;
