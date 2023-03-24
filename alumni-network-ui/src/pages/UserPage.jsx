import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../api/user";
import PostList from "../components/Post/PostList";
import { useUser } from "../context/UserContext";


function GroupPage() {

    const { user, setUser } = useUser()
    const { userId } = useParams();
    const [userPage, setUserPage] = useState();

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    console.log(userId)
                    const groupData = await getUserById(userId);
                    if (groupData) {
                        setUserPage(groupData);
                    }
                } catch (error) {
                    console.log(error);
                }

            };
            fetchData()
        }
    }, [user]);


    if (!userPage) {
        return <div>Loading User...</div>;
    }

    return (
        <div className="container mx-auto">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-6 mt-6">{userPage.username}</h1>
            </div>
            <div className="grid grid-cols-6 gap-4 lg:px-4">
                {/* Group information 1 */}
                <div className="order-first lg:hidden lg:order-none col-span-6">
                    <div className="lg:hidden text-center rounded-lg m-2 mr-12 ml-12 mt-16 card">
                        <div className="pt-2">
                            <img
                                src={user.picture}
                                className="h-10 w-10 rounded-full object-cover"
                                alt=""
                            />
                        </div>
                        <div className="pb-4">
                            <div className="text-center">
                                <p className="text-sm mt-6">Status</p>
                            </div>
                            <p className="text-sm mx-6 text-gray-400">{userPage.status}</p>
                            <div className="text-center">
                                <p className="text-sm mt-6">Fun Fact</p>
                            </div>
                            <p className="text-sm mx-6 text-gray-400">{userPage.funFact}</p>
                            <div className="text-center">
                                <p className="text-sm mt-6">Bio</p>
                            </div>
                            <p className="text-sm mx-6 text-gray-400">{userPage.bio}</p>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4 lg:mx-0 col-span-6">
                    <PostList posts={userPage.authoredPosts} />
                </div>
                {/* Group information 2 */}
                <div className="col-span-2 lg:block hidden">
                    <div className="rounded-lg m-2 mr-12 ml-12 mt-16 card">
                        <div className="pt-2">
                            <img
                                src={user.picture}
                                className="h-10 w-10 rounded-full object-cover"
                                alt=""
                            />
                        </div>
                        <div className="pb-4">
                            <div className="text-center">
                                <p className="text-sm mt-6">Status</p>
                            </div>
                            <p className="text-sm mx-6 text-gray-400">{userPage.status}</p>
                            <div className="text-center">
                                <p className="text-sm mt-6">Fun Fact</p>
                            </div>
                            <p className="text-sm mx-6 text-gray-400">{userPage.funFact}</p>
                            <div className="text-center">
                                <p className="text-sm mt-6">Bio</p>
                            </div>
                            <p className="text-sm mx-6 text-gray-400">{userPage.bio}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default GroupPage