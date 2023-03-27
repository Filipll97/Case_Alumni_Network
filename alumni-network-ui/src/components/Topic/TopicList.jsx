import React from 'react';

function TopicList({ topics, activeTopics, toggleTopic }) {
    return (
        <div className="card rounded-xl shadow-lg">
            <p className="p-3 pt-5 text-lg font-semibold text-gray-400">Popular Topics</p>
            <ul className="">
                {topics &&
                    topics.map((topic) => (
                        <li key={topic.id}>
                            <button
                                onClick={() => toggleTopic(topic.id)}
                                className="flex items-center text-base rounded-lg w-full text-left px-1"
                            >
                                <span className='text-slate-400'>{topic.name}</span>
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