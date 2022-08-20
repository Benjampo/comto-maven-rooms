import {createContext, useContext, useEffect, useState} from 'react';
import {auth, db, meetingsRef, provider, usersRef} from "./firebase";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {addDoc, doc, getDocs, setDoc} from "firebase/firestore";

// @ts-ignore
const UserContext = createContext();

function UserProvider(props: any) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(setUser)
    }, [])

    function signInGoogle()  {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                setUser(result.user)

                setDoc(doc(db, 'users', result.user.uid),  {
                    uid: result.user.uid,
                    name: result.user.displayName,
                    image: result.user.photoURL,
                })
            })
    }

    function logOut() {
        auth.signOut().then(() => {
            setUser(null)
        })
    }
    const getMeetings = async() => {
        let meetings = []
        await getDocs(meetingsRef).then((snapshot) => {
            snapshot.docs.forEach((meeting) => {
                meetings.push({...meeting.data(), id : meeting.id})
            })
            setMeetings(meetings)
            console.log(meetings.id)
        })
    }
    const actionsData = { user, setUser, logOut, signInGoogle, getMeetings };
// @ts-ignore
    return <UserContext.Provider value={actionsData} {...props} />;
}
function useUserContext() {
    return useContext(UserContext);
}

export { UserProvider, useUserContext };
