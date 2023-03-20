import keycloak from "../keycloak";
import ProfileInfo from "../components/Profile/ProfileInfo";

function ProfilePage() {

    return (
        <div>
            {keycloak.tokenParsed &&
                <>
                    <ProfileInfo />
                </>
            }
        </div>
    );
}

export default ProfilePage;
