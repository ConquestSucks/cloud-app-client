import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSelfUser } from '../api/updateSelfUser';
import { UserDto } from '../api/getSelfUser';

export const useUpdateSelfUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<UserDto & { avatarFile?: File }>) => updateSelfUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["selfUser"] });
            queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
        },
        onError: (error) => {
            console.error("Error updating profile:", error);
        }
    });
}; 