import keycloak from "../keycloak";
import CreateEventForm from "../components/event/CreateEventForm";

function CreateEventPage() {

    return (
        <div>
            {keycloak.tokenParsed &&
                <>
                    <CreateEventForm/>
                </>
                
            }
        </div>
    );
}
export default CreateEventPage;