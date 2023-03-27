import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";

function TopicList({ topics, activeTopics, toggleTopic }) {
    return (
        <div className="card rounded-lg shadow-lg">
            <p className="p-3 pt-5 font-bold text-lg text-gray-400"><FontAwesomeIcon className="mr-2" icon={faFireFlameCurved} />Popular Topics</p>
            <ul className="">
                {topics &&
                    topics.map((topic) => (
                        <li key={topic.id}>
                            <button
                                onClick={() => toggleTopic(topic.id)}
                                className="flex items-center text-base rounded-lg w-full text-left px-1"
                            >
                                <span className="text-slate-300 text-sm font-medium">{topic.name}</span>
                                {activeTopics.includes(topic.id) ? (
                                    <span className="text-green-500 font-bold ml-auto hover:text-red-600 p-1">✔</span>
                                ) : (
                                    <span className="text-blue-500 font-medium ml-auto hover:text-green-600 text-2xl">+</span>
                                )}
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default TopicList;