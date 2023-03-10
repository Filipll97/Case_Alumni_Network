import keycloak from "../keycloak";
import ProfileInfo from "../components/porfile/ProfileInfo";

function ProfilePage() {
    
    return (
        <div>
            {keycloak.tokenParsed &&
                <>
                    <ProfileInfo/>
                </>
            }
        </div>
    );
}
export default ProfilePage;
