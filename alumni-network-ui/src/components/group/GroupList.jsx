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
            <p className="pt-2 px-2 text-lg font-semibold text-gray-400 ">Communities</p>
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