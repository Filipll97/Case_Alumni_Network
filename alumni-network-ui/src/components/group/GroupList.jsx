import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function GroupList({ groups }) {

    const { user, setUser } = useUser();


    function isMember(userId, group) {
        return group.users.some((u) => u.id === userId) ? "Member" : "Not A Member";
    }

    return (
        <div className="rounded-xl shadow-md card">
            <div className="pt-4 px-4">
                <div className="flex justify-between items-center p-0 m-0">
                    <p className="font-semibold text-gray-400 text-lg ">Communities</p>
                    <Link
                        to="/newGroup"
                        className="font-semibold block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                    >
                        <button className="bg-blue-600 text-white rounded p-2 shadow-lg hover:bg-blue-700">New Group</button>
                    </Link>
                </div>
            </div>
            {groups &&
                groups.map((group) => (
                    <Link to={`/groups/${group.id}`} key={group.id}>
                        <div className="card rounded-xl hover:bg-gray-700 p-3 px-2 border-b border-gray-700">
                            <p className="text-lg font-semibold ml-4">{group.name}</p>
                            <p className="text-gray-400 pt-3 pb-2 text-sm ml-4">
                                {group.description}
                            </p>
                            <small className="flex flex-shrink justify-between pt-2 text-gray-500 ml-4">
                                <span className="font-semibold">{group.isPrivate ? "Private" : "Public"}</span>
                                <span className="text-blue-500">{isMember(user.id, group)}</span>
                            </small>
                        </div>
                    </Link>
                ))}
        </div>
    );
}

export default GroupList;