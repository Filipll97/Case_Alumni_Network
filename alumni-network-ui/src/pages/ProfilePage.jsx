import keycloak from "../keycloak";
import ProfileInfo from "../components/profile/ProfileInfo";

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
