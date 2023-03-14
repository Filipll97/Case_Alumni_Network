import { useUser } from '../context/UserContext';

function PostPage() {

    const [user, setUser] = useUser({});

    // const dataToSend = {};
    // const response = await postPostInfo(dataToSend);
    // console.log(response)

    return (

        <div className="p-2">
            <div>
                <p>{user.username}</p>
            </div>
        </div>
    );
}
export default PostPage;