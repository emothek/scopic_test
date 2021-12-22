import React, { useMemo, useState } from 'react';
import AppNavigation from './src/AppNavigation'; 
import AppContext, { AppState } from './src/AppContext'

export default function App() {

    const [userID, setUserID] = useState(AppState.userID)

    const appContextValue = useMemo(() => ({
        userID, setUserID
        }), [userID]);

    return(
        <AppContext.Provider value = {appContextValue}>
            <AppNavigation />
        </AppContext.Provider>
    )
}
