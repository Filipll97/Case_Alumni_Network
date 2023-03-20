import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function GroupList({ groups }) {

    const { user, setUser } = useUser();


    function isMember(userId, group) {
        return group.users.some((u) => u.id === userId) ? "Member" : null;
    }


    return (
        <div className="row-span-3 rounded-lg m-2 ml-12 mr-12 mt-12">
            <div className="text-center">
                <p className="mb-2 mt-2 text-lg font-semibold text-gray-400">Popular Groups</p>
            </div>
            {groups &&
                groups.map((group) => (
                    <Link to={`/groups/${group.id}`} key={group.id}>
                        <div className="bg-gray-800 rounded-lg border-slate-600 border-2 hover:border-slate-400 p-3 m-4">
                            <p className="text-lg font-semibold">{group.name}</p>
                            <p className="text-gray-400 pt-3 pb-2 text-sm">
                                {group.description}
                            </p>
                            <small className="flex flex-shrink justify-between pt-2 text-gray-500">
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