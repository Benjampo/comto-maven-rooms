import {createContext, useContext, useEffect, useState} from 'react';
import {auth, meetingsRef, provider} from "./firebase";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {getDocs} from "firebase/firestore";

// @ts-ignore
const MeetingsContext = createContext();

function MeetingsProvider(props: any) {
    const [meetings, setMeetings] = useState(null)

    useEffect(() => {
        if (!meetings) {
            getMeetings()
        }
    },[meetings])

    const getMeetings = async() => {
        let allMeetings = []
        await getDocs(meetingsRef).then((snapshot) => {
            snapshot.docs.forEach((meeting) => {
                allMeetings.push({...meeting.data(), id : meeting.id})
            })
            setMeetings(allMeetings)
        })
    }
    const actionsData = { meetings};
// @ts-ignore
    return <MeetingsContext.Provider value={actionsData} {...props} />;
}
function useMeetingContext() {
    return useContext(MeetingsContext);
}

export { MeetingsProvider, useMeetingContext };
