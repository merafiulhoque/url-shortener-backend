import { PROCESS_JOB } from "../../../types/index.ts";
import { readTxtFile } from "./readTxtFile.ts";

    export async function bulkProcessor(job: PROCESS_JOB){
        try {
            await readTxtFile(job)
        } catch (error) {
            console.log("Error caught.")
        }
    }   