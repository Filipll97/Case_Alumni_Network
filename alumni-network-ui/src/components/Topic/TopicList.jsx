import React from 'react';

function TopicList({ topics, activeTopics, toggleTopic }) {
    return (
        <div className="card rounded-xl shadow-lg">
            <p className="pt-2 px-2 text-lg font-semibold text-gray-400">Popular Topics</p>
            <ul className="">
                {topics &&
                    topics.map((topic) => (
                        <li key={topic.id}>
                            <button
                                onClick={() => toggleTopic(topic.id)}
                                className={`flex items-center text-base font-normal rounded-lg w-full text-left p-2 text-md ${activeTopics.includes(topic.id)
                                    ? 'bg-gray-700 text-white'
                                    : 'text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <span className='text-slate-400'>{topic.name}</span>
                                {activeTopics.includes(topic.id) ? (
                                    <span className="text-blue-500 font-bold ml-auto">✔</span>
                                ) : (
                                    <span className="text-blue-500 font-bold ml-auto">Add</span>
                                )}
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default TopicList;