import { useParams } from "react-router-dom";
import MainContents from "./MainContents"
import NewHeader from './NewHeader';
import useUser from "../User/user";

const ProfilePage = () => {
    const username = useParams().username || useUser().userName;
    return (
        <>
            <NewHeader username={username}/>
            <MainContents username={username}/>
        </>
    )
}

export default ProfilePage;
