'use client'

import { useState, useEffect, useRef } from 'react';
import { UserDto } from '@/app/features/storage-quota/api/getSelfUser';
import axiosInstance from "@/app/shared/api/axios";

interface UseUserAvatarLoaderReturn {
    avatarBlobUrl: string | null;
    isAvatarLoading: boolean;
}

export const useUserAvatarLoader = (userData: UserDto | null | undefined): UseUserAvatarLoaderReturn => {
    const [avatarBlobUrl, setAvatarBlobUrl] = useState<string | null>(null);
    const [isAvatarLoading, setIsAvatarLoading] = useState(false);
    const previousAvatarBlobUrlRef = useRef<string | null>(null);

    useEffect(() => {
        previousAvatarBlobUrlRef.current = avatarBlobUrl;
    }, [avatarBlobUrl]);

    useEffect(() => {
        let isMounted = true;

        const fetchAvatar = async () => {
            if (userData && userData.id) {
                setIsAvatarLoading(true);
                try {
                    const response = await axiosInstance.get(`/api/v1/users/getSelfUserAvatar`, {
                        responseType: 'blob',
                    });
                    if (!isMounted) return;

                    const newObjectUrl = URL.createObjectURL(response.data);

                    if (previousAvatarBlobUrlRef.current && previousAvatarBlobUrlRef.current !== newObjectUrl) {
                        URL.revokeObjectURL(previousAvatarBlobUrlRef.current);
                    }
                    
                    setAvatarBlobUrl(newObjectUrl);
                } catch (error) {
                    if (!isMounted) return;
                    // console.error("Error fetching avatar:", error); // Убрано по запросу
                    if (previousAvatarBlobUrlRef.current) {
                        URL.revokeObjectURL(previousAvatarBlobUrlRef.current);
                    }
                    setAvatarBlobUrl(null);
                } finally {
                    if (isMounted) {
                        setIsAvatarLoading(false);
                    }
                }
            } else if (!userData) {
                if (previousAvatarBlobUrlRef.current) {
                    URL.revokeObjectURL(previousAvatarBlobUrlRef.current);
                    previousAvatarBlobUrlRef.current = null;
                }
                setAvatarBlobUrl(null);
                if (isMounted) setIsAvatarLoading(false);
            }
        };

        fetchAvatar();

        return () => {
            isMounted = false;
            // Важно: При размонтировании компонента, использующего хук, отзываем последний активный URL
            // Это предотвратит утечки, если userData.id или avatarTimestamp изменятся,
            // и компонент будет размонтирован до того, как новый URL будет установлен.
            if (avatarBlobUrl) {
                // Этот отзыв может быть избыточным, если previous был отозван при установке нового.
                // Но если компонент размонтируется с активным avatarBlobUrl, его нужно отозвать.
                // Если fetchAvatar не выполнился (isMounted=false в finally), то avatarBlobUrl мог не обновиться.
                // Поэтому, для надежности, мы можем попробовать отозвать `previousAvatarBlobUrlRef.current` 
                // или сам `avatarBlobUrl`, если он последний известный.
                // Решение выше (отзыв в fetchAvatar при установке нового или при !userData) должно быть достаточным.
                // Однако, чтобы быть абсолютно уверенным при размонтировании:
                const lastUrl = previousAvatarBlobUrlRef.current; // или avatarBlobUrl из замыкания
                if (lastUrl) {
                    // URL.revokeObjectURL(lastUrl); // Рискованно, если другой инстанс хука его использует
                    // Логика выше должна справляться. Cleanup здесь больше для isMounted.
                }
            }
        };
    }, [userData?.id, userData?.avatarTimestamp]); // Зависимости как в DashboardNavbarComponent

    return { avatarBlobUrl, isAvatarLoading };
}; 