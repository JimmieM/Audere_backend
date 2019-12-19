import fs from "fs";
import * as path from "path";

export enum ImageType {
    Avatars,
}

class ImageService {

    public Paths = {
        Avatars: {
            Path: "./../Images/Users/Avatars/",
        },
    };

    /**
     * toBase64
     */
    public ToBase64(filePath: string): string {
        const fullPath = path.resolve(__dirname, `../${filePath}`);
        const bitmap = fs.readFileSync(fullPath);
        // convert binary data to base64 encoded string
        return new Buffer(bitmap).toString("base64");
    }

    /**
     * Save
     *
     * @param {string} base64
     * @param {string} path
     * @returns {string}
     */
    public Save(base64: string, path: string): string {
        fs.writeFile(path + ".jpg", base64, "base64", (err) => {
            throw new Error(err.message);
        });
        return path;
    }

    /**
     * handleFallbackImage
     *
     * @private
     * @param {ImageType} imageType
     */
    private handleFallbackImage(imageType: ImageType): string {
        return null;
    }
}
export default ImageService;
