import keycloak from "../../keycloak";
function ProfileInfo () {
    return (
        <div>
            <div className="flex items-center flex-col mb-4 mt-4">
                <div className="h-14 w-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl"></div>
            </div>
            <div className="flex items-center flex-col">
                <div className="p-6 card">
                    <p><span className="font-bold">Name: </span>{keycloak.tokenParsed.name}</p>
                    <p><span className="font-bold">temp, Username: </span>{keycloak.tokenParsed.preferred_username}</p>
                    <p><span className="font-bold">Status: </span>{keycloak.tokenParsed.sub}</p>
                    <p><span className="font-bold">Fun Fact: </span></p>
                    <p className="whitespace-normal"><span className="font-bold">Bio: </span>
                        <br />
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis, maiores! Enim itaque aperiam modi? Neque, accusantium? Inventore, assumenda 
                        delectus corrupti deserunt officia maiores repellendus? Error cumque inventore aspernatur voluptatum vero.
                    </p>
                </div>
            </div>
        </div>
    );
}
export default ProfileInfo;