    export type LoginData = {
        login: string
    }

    export type ServerResponse = {
        message: string
    }

    export type IsLoading = {
        message: string
    }

    export interface CustomError extends Error {
        response: Response
    }

    export interface Response {
        data: {
            error: string
        }
    }