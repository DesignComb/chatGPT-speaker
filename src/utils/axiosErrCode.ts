export const errorCodeType = function(code: number): string {
    let errMessage: string = "Unknown error";
    switch (code) {
        case 400:
            errMessage = 'Bad request';
            break;
        case 401:
            errMessage = 'Unauthorized, please log in again';
            break;
        case 403:
            errMessage = 'Access denied';
            break;
        case 404:
            errMessage = 'Request error, resource not found';
            break;
        case 405:
            errMessage = 'Request method not allowed';
            break;
        case 408:
            errMessage = 'Request timeout';
            break;
        case 500:
            errMessage = 'Internal server error';
            break;
        case 501:
            errMessage = 'Network not connected';
            break;
        case 502:
            errMessage = 'Network error';
            break;
        case 503:
            errMessage = 'Service unavailable';
            break;
        case 504:
            errMessage = 'Network timeout';
            break;
        case 505:
            errMessage = 'HTTP version not supported';
            break;
        default:
            errMessage = `Other connection error -- ${code}`;
    }
    return errMessage;
}