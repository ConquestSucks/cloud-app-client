'use client';

import { createContext, useContext } from 'react';
import { UserDto } from '@/app/features/storage-quota/api/getSelfUser';

interface UserContextType {
    userData: UserDto | undefined;
    isUserLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export default UserContext; 