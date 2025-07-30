// Upload, process and store CSV data


import { createReadStream } from 'fs';
import csvParser from 'csv-parser';
import Record from '../models/Record';

export interface StudentRecord {
  Student_ID: string;
  Full_Name: string;
  Level: string;
  Semester: string;
  CGPA: string;
  courses: {
    [courseCode: string]: string
  };
}


export function parseAndStore(filepath: string): Promise<StudentRecord[]> {
    const records: StudentRecord[] = [];

    return new Promise((resolve, reject) => {
        createReadStream(filepath)
        .pipe(csvParser())
        .on('data', (row) => {
            records.push(row)
        })
        .on('end', () => {
            resolve(records)
        })
        .on('error', (err) => {
            reject()
        });
    });

}