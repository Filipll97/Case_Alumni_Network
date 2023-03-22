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
        <div>
            <div className="grid grid-rows-3 grid-flow-col gap-4">
                <PostList posts={userPage.authoredPosts} />
                <div className="row-span-2 rounded-lg m-2 mr-12 ml-12 mt-16 card">
                    <div className="text-center">
                        <p className="mb-2 mt-2 text-lg font-semibold text-gray-200">{userPage.username}</p>
                    </div>
                    <p className="text-sm m-6 text-gray-400">{userPage.bio}</p>
                    <p className="text-sm m-6 text-gray-400">{userPage.funFact}</p>
                    <p className="text-sm m-6 text-gray-400">{userPage.status}</p>
                </div>
            </div>
        </div>
    );
}

export default GroupPage