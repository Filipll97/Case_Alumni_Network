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

    console.log(user)


    if (!userPage) {
        return <div>Loading User...</div>;
    }

    return (
        <div className="container mx-auto">
            <div className="text-center flex justify-center">
                <h1 className="text-3xl font-bold mb-6 mt-6 w-1/2 card py-2 rounded-lg">{userPage.username}</h1>
            </div>
            <div className="grid grid-cols-6 gap-4 lg:px-4">
                {/* Group information 1 */}
                <div className="order-first lg:hidden lg:order-none col-span-6">
                    <div className="lg:hidden text-center rounded-lg m-2 mr-12 ml-12 mt-16 card">
                        <div className="pt-2 flex justify-center items-center">
                            <img
                                src={userPage.picture}
                                className="h-10 w-10 rounded-full object-cover"
                                alt=""
                            />
                        </div>
                        <div className="pb-4 text-center">
                            <p className="text-sm mt-6 mb-1 font-medium">Status</p>
                            <p className="text-sm mx-12 text-gray-400">{userPage.status}</p>
                            <p className="text-sm mt-6 mb-1 font-medium">Fun Fact</p>
                            <p className="text-sm mx-12 text-gray-400">{userPage.funFact}</p>
                            <p className="text-sm mt-6 mb-1 font-medium">Bio</p>
                            <p className="text-sm mx-12 mb-3 text-gray-400">{userPage.bio}</p>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4 lg:mx-0 col-span-6 mt-12">
                    <PostList posts={userPage.authoredPosts} />
                </div>
                {/* Group information 2 */}
                <div className="col-span-2 lg:block hidden">
                    <div className="rounded-lg m-2 mr-12 ml-12 mt-12 card shadow">
                        <div className="pt-3 flex justify-center items-center">
                            <img
                                src={userPage.picture}
                                className="h-20 w-20 border-4 rounded-full object-cover"
                                alt=""
                            />
                        </div>
                        <div className="pb-4 text-center">
                            <p className="text-sm mt-6 mb-1 font-medium">Status</p>
                            <p className="text-sm mx-12 text-gray-400">{userPage.status}</p>
                            <p className="text-sm mt-6 mb-1 font-medium">Fun Fact</p>
                            <p className="text-sm mx-12 text-gray-400">{userPage.funFact}</p>
                            <p className="text-sm mt-6 mb-1 font-medium">Bio</p>
                            <p className="text-sm mx-12 mb-3 text-gray-400">{userPage.bio}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default GroupPage