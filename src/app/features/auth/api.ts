export const PostUserLogin = async (login: string): Promise<number> => {
    const formData = new FormData();

    formData.append('login', login);

    try {
        const res = await fetch('https://localhost:5141/api/v1/users/authenticate', {
            method: 'POST',
            body: formData,
        });

        console.log('response', res);
        return res.status;
    } catch (error) {
        console.error('Ошибка при fetch:', error);
        throw error;
    }
};

