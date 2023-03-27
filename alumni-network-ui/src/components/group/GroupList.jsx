import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


function GroupList({ groups }) {

    const { user, setUser } = useUser();


    function isMember(userId, group) {
        return group.users.some((u) => u.id === userId) ? "Member" : "Not A Member";
    }

    return (
        <div className="rounded-xl shadow-md card">
            <div className="pt-4 px-4">
                <div className="flex justify-between items-center p-0 m-0">
                    <p className="font-semibold text-gray-400 text-lg mb-2">Communities</p>
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
            {groups &&
                groups.map((group) => (
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
        </div>
    );
}

export default GroupList;