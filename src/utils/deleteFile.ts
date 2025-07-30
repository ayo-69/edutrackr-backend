import { unlink } from "fs/promises";

export default function deleteFile(path: string): void {
    unlink(path)
        .then(() => {
            console.log(`File deleted: ${path}`);
            return true;
        })
        .catch((error) => {
            console.error(`Error deleting file: ${path}`, error);
            return false;
        });
}