import { AuthStackScreen, OnBoardStackScreen } from './StackNav';

import React from 'react';

const Routes = () => {
    const alreadyLaunched = false;

    // Skip onboarding screen

    if (alreadyLaunched) {
        return (
            <AuthStackScreen />
        );
    }

    return (
        <OnBoardStackScreen />
    );
}

export default Routes;