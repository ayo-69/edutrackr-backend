import { required } from "joi";
import mongoose from "mongoose";

export interface StudentRecord {
    student_id: string;
    full_name: string;
    level: string;
    semester: string;
    cgpa: string;
    courses: {
        [courseCode: string]: string;
    };
}

const RecordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    student_id: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    cgpa: {
        type: String,
        required: true,
    },
    courses: {
        type: Map,
        of: String,
        default: {},
    }
});



const Record = mongoose.model("Record", RecordSchema);
export default Record;