import { useParams } from "react-router-dom";
import MainContents from "./MainContents"
import NewHeader from './NewHeader';
import useUser from "../../User/user";
import Navbar from "../../Navbar";

const ProfilePage = () => {
    const username = useParams().username || useUser().userName;
    return (
        <>
            <div className="bg-gray text-white">
                <NewHeader username={username}/>
                <MainContents username={username}/>
            </div>
        </>
    )
}

export default ProfilePage;
