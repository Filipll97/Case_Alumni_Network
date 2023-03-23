import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function GroupList({ groups }) {

    const { user, setUser } = useUser();


    function isMember(userId, group) {
        return group.users.some((u) => u.id === userId) ? "Member" : "Not A Member";
    }

    return (
        <div className="row-span-2 rounded-lg m-2 mr-12 mt-12 shadow-md card">
            <p className="m-4 text-lg font-semibold text-gray-400 pb-4">Communities</p>
            {groups &&
                groups.map((group) => (
                    <Link to={`/groups/${group.id}`} key={group.id}>
                        <div className="card hover:bg-gray-700 p-3 px-2 border-b border-gray-700">
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
