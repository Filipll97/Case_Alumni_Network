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
import SearchBar from "../components/Post/SearchBar";

function DashBoardPage() {
    const { user, setUser } = useUser()
    const [posts, setPosts] = useState();
    const [groups, setGroups] = useState();
    const [topics, setTopics] = useState();
    const [showGroupsModal, setShowGroupsModal] = useState(false);
    const [filteredPosts, setFilteredPosts] = useState();
    const [searchQuery, setSearchQuery] = useState("");

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

    useEffect(() => {
        if (posts) {
            const searchResults = posts.filter((post) =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPosts(searchResults);
        }
    }, [searchQuery, posts]);

    function isMember(userId, topic) {
        return topic.users.some((u) => u.id === userId) ? "✔" : null;
    }

    if (!user) {
        return <div>Loading Dashboard...</div>;
    }
    return (
        <div className="container mx-auto">
            <div className="mt-6 flex flex-col">
                {/* <p className=" my-4 text-center text-4xl font-extrabold">DashBoard</p> */}
                <SearchBar onSearch={setSearchQuery} />
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
                    <div className="card rounded-xl shadow-lg">
                        <p className="pt-2 px-2 text-lg font-semibold text-gray-400 ">Popular Topics</p>
                        <ul className="">
                            {topics &&
                                topics.map((topic) => (
                                    <li key={topic.id}>
                                        <Link to="/group" className="flex items-center shadow text-base font-normal rounded-lg text-white hover:bg-gray-700">
                                            <div className="flex justify-between p-2 text-md">
                                                <span>{topic.name}</span>
                                                {isMember(user.id, topic) ? <span className="text-blue-500 font-bold">✔</span> : <span className="text-blue-500 font-bold">Add</span>}
                                            </div>
                                        </Link>
                                    </li>

                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="lg:col-span-3 xl:col-span-3 lg:mx-0 col-span-6">
                    <PostList posts={filteredPosts || posts} />
                </div>
                <div className="col-span-2 pr-12 lg:block hidden">
                    <GroupList groups={groups} />
                </div>
            </div>
        </div >
    );
}
export default DashBoardPage;
