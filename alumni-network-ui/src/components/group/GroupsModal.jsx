import React from 'react';
import GroupList from './GroupList';

function GroupsModal({ onClose, groups }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
            onClick={onClose}
        >
            {/* Modal content */}
            <div className="relative max-w-full lg:w-7/12 w-10/12 mx-auto my-6 card">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t dark:border-gray-700">
                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none dark:text-gray-100"
                        onClick={onClose}
                    >
                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none dark:text-gray-100">
                            ×
                        </span>
                    </button>
                </div>
                {/* Content */}
                <div className="relative flex-auto p-3">
                    <p className="my-4 text-lg leading-relaxed">
                        <GroupList groups={groups} />
                    </p>
                </div>
                {/* End of content */}
            </div>
        </div>
    );
}

export default GroupsModal;