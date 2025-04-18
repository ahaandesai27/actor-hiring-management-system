import { useParams } from "react-router-dom";
import MainContents from "./MainContents"
import NewHeader from './NewHeader';

const ProfilePage = () => {
    const { username } = useParams();
    return (
        <>
            <NewHeader username={username}/>
            <MainContents username={username}/>
        </>
    )
}

export default ProfilePage;
