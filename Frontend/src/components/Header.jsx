import ProfilePicture from "./ProfilePicture"
import EditProfile from "./EditProfile"

function Header() {
    return (
        <>
            <header>
            <nav>
                <ProfilePicture />
                <section>
                    <span>actor's @ handle</span>
                    <span>actor's full name</span>
                </section>
                <EditProfile />
            </nav>
            </header>
        </>
    )
}

export default Header