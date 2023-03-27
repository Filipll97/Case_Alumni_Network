import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserGroup } from "@fortawesome/free-solid-svg-icons";

function GroupList({ groups }) {
    const { user, setUser } = useUser();
    const [showAll, setShowAll] = useState(false);

    function isMember(userId, group) {
        return group.users.some((u) => u.id === userId) ? "Member" : "Not A Member";
    }

    const toggleViewAll = () => {
        setShowAll(!showAll);
    };

    if (!groups) {
        return <div>Loading groups...</div>;
    }

    const displayedGroups = showAll ? groups : groups.slice(0, 3);

    return (
        <div className="rounded-xl shadow-md card">
            <div className="pt-4 px-4">
                <div className="flex justify-between items-center p-0 m-0">
                    <p className="font-semibold text-gray-400 text-lg mb-2"><FontAwesomeIcon className="mr-2" icon={faUserGroup} />Communities</p>
                    <Link
                        to="/newGroup"
                        className="font-semibold block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                    >
                        <button className="card text-white rounded p-2 shadow-lg hover:bg-gray-700 text-sm font-medium border border-gray-500 mb-3">
                            New <FontAwesomeIcon className="ml-1 text-green-500" icon={faPlus} />
                        </button>
                    </Link>
                </div>
            </div>
            {displayedGroups &&
                displayedGroups.map((group) => (
                    <Link to={`/groups/${group.id}`} key={group.id}>
                        <div className="hover:bg-gray-700 p-3 px-2 border-b border-gray-700">
                            <p className="text-lg font-semibold ml-4">{group.name}</p>
                            <p className="text-gray-400 pt-3 pb-2 text-sm ml-4">
                                {group.description}
                            </p>
                            <small className="flex flex-shrink justify-between pt-2 text-gray-500 ml-4">
                                <span className="font-semibold">{group.isPrivate ? "Private" : "Public"}</span>
                                {isMember(user.id, group) == "Member" &&
                                    <span className="text-green-500">Member</span>
                                }
                                {isMember(user.id, group) === "Not A Member" &&
                                    <span className="text-blue-500">Not a Member</span>
                                }
                            </small>
                        </div>
                    </Link>
                ))}
            {groups.length > 3 && (
                <button
                    onClick={toggleViewAll}
                    className="block w-full text-center py-2 text-gray-300 rounded hover:bg-gray-700 focus:outline-none text-sm font-bold"
                >
                    {showAll ? "View Less" : "View All"}
                </button>
            )}
        </div>
    );
}

export default GroupList;
