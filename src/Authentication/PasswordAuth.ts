import bcrypt from "bcrypt";

class PasswordAuth {
    public static Hash = (password: string): Promise<string> => {
        return bcrypt.hash(password, PasswordAuth.BCRYPT_SALT_ROUNDS)
            .then((hashedPassword) => {
                return hashedPassword;
            });
    }

    public static Compare = (password: string, storedHashedPassword: string) => {
        return bcrypt.compare(password, storedHashedPassword, (err, res) => {
            if (err) {
                throw new Error(err.message);
            }
            return res;
        });
    }

    private static BCRYPT_SALT_ROUNDS = 10;
}

export default PasswordAuth;
