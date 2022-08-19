import {createContext, useContext, useState} from 'react';

// @ts-ignore
const UserContext = createContext();

function UserProvider(props: any) {
    const [user, setUser] = useState(null)

    const actionsData = { user, setUser };
// @ts-ignore
    return <UserContext.Provider value={actionsData} {...props}> </>;
}
function useActionContext() {
    return useContext(UserContext);
}

export { UserProvider, useActionContext };
