class RoutesUtil {
    public static HandleJSON = (credentials: object | string) => {
        if (typeof credentials === 'string') {
            return JSON.parse(credentials);
        }
        return credentials;
    }
}

export default RoutesUtil;
