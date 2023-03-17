import React from "react";
import { Link } from "react-router-dom";

function GroupList({ groups }) {
    return (
        <div>
            {groups &&
                groups.map((group) => (
                    <Link to="/" key={group.id}>
                        <div className="item-container">
                            <div>
                                <div className="bg-gray-800 rounded-lg border-slate-600 border-2 hover:border-slate-400 p-3 m-4">
                                    <p className="text-lg font-semibold">{group.name}</p>
                                    <p className="text-gray-400 pt-3 pb-2 text-sm">
                                        {group.description}
                                    </p>
                                    <small className="block pt-2 text-gray-500">
                                        {group.isPrivate ? "Private" : "Open"}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
        </div>
    );
}

export default GroupList;