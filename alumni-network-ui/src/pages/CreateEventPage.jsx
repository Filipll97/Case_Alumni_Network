import keycloak from "../keycloak";

function CreateEventPage() {

    return (
        <div>
            {keycloak.tokenParsed &&
                <div>
                    <div className="flex items-center flex-col mt-4">
                        <div className="p-6 card">
                            <form className="max-w-sm">
                               
                                <div className="flex flex-col items-center mb-6">
                                    <div className="w-full">
                                        <label className="text-white font-bold mb-1 pr-4" for="EventName">
                                            Event Name
                                        </label>
                                    </div>
                                    <div className="w-full">
                                        <input className="bg-white shadow appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
                                        text-gray-700 focus:outline-none focus:border-blue-400" id="EventName"
                                          type="text" placeholder=""/>
                                    </div>
                                </div>
                                
                        
                                <div className="flex flex-col items-center mb-6">
                                    <div className="w-full pb-1">
                                        <label className="text-white font-bold" for="Description">
                                            Description
                                        </label>
                                    </div>
                                    <div>
                                        <textarea className="bg-white shadow appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
                                        text-gray-700 focus:outline-none focus:border-blue-400" id="Description" rows="4" cols="50">
                                        </textarea>
                                    </div>
                                </div>

                                <div className="flex flex-row justify-around gap-5 mb-6">
                                    <h3 className="p-2 pl-0 font-bold text-white">Allow guests to join Event: </h3>
                                    <div className="flex items-center justify-center pr-3 bg-white border border-gray-200 rounded">
                                        <label for="bordered-radio-1" className=" p-2 text-sm font-medium">Yes</label>
                                        <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/>
                                    </div>
                                    <div className="flex items-center justify-center  pr-3 border bg-white border-gray-200 rounded">
                                        <label for="bordered-radio-2" className="p-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                        <input checked id="bordered-radio-2" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                                    </div>
                                </div>

                                <div className="flex flex-col mb-6">
                                    <label class="block mb-2 font-bold text-white" for="BannerImage">Select a banner image: </label>
                                    <input class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                                     bg-gray-50 focus:outline-none" id="BannerImage" type="file"/>
                                </div>

                               
                                <div className="flex items-center">
                                    <div className="m-auto">
                                        <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none 
                                        text-white font-bold py-2 px-4 rounded" type="button">
                                            Create Event
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
export default CreateEventPage;