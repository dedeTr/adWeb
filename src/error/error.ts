export interface AdwebError {
    code: string
    httpStatus: number
    title: string
    detailEn: string
    detailId: string
    message: string
}

interface CommonError {
    validationError(message: string): AdwebError
    databaseError(message: string): AdwebError
    fileServiceError(message: string): AdwebError
    messageServiceError(message: string): AdwebError
    thirdPartyError(service: string, message: string): AdwebError
    libraryError(message: string): AdwebError
    dataNotFound(notFoundEntity: string): AdwebError
}

export const commonError: CommonError = {
    validationError: function (message: string) {
        const err: AdwebError = {
            code: '00001',
            httpStatus: 404,
            title: 'Validation Error',
            detailEn: message,
            detailId: message,
            message: message
        }

        return err;
    },
    databaseError: function (message: string) {
        const err: AdwebError = {
            code: '00002',
            httpStatus: 500,
            title: 'Database Error',
            detailEn: message,
            detailId: message,
            message: message
        }

        return err;
    },
    fileServiceError: function (message: string) {
        const err: AdwebError = {
            code: '00003',
            httpStatus: 500,
            title: 'File Service Error',
            detailEn: message,
            detailId: message,
            message: message
        }

        return err;
    },
    messageServiceError: function (message: string) {
        const err: AdwebError = {
            code: '00004',
            httpStatus: 500,
            title: 'Message Service Error',
            detailEn: message,
            detailId: message,
            message: message
        }

        return err;
    },
    thirdPartyError: function (service: string, message: string) {
        const err: AdwebError = {
            code: '00005',
            httpStatus: 500,
            title: `${service} error`,
            detailEn: message,
            detailId: message,
            message: message
        }

        return err;
    },
    libraryError: function (message: string) {
        const err: AdwebError = {
            code: '00006',
            httpStatus: 500,
            title: 'Library Error',
            detailEn: message,
            detailId: message,
            message: message
        }

        return err;
    },
    dataNotFound: function (notFoundEntity: string) {
        const err: AdwebError = {
            code: '00007',
            httpStatus: 404,
            title: 'Data not found',
            detailEn: `${notFoundEntity} not found`,
            detailId: `Data ${notFoundEntity} tidak ditemukan`,
            message: `Data ${notFoundEntity} tidak ditemukan`
        }

        return err;
    }
}

export interface AdwebinternalError{
    wrongEmailOrPassword: AdwebError
    unauthorized: AdwebError
}

export const AdwebinternalError: AdwebinternalError = {
    wrongEmailOrPassword: {
        code: '00008',
        httpStatus: 401,
        title: 'Invalid Credential',
        detailEn: 'Wrong Email or Password',
        detailId: 'Email atau password salah',
        message: 'Email atau password salah'
    },
    unauthorized: {
        code: '0009',
        httpStatus: 401,
        title: 'Forbidden',
        detailEn: 'Session invalid',
        detailId: 'Sesi tidak valid',
        message: 'Sesi tidak valid'
    }
}