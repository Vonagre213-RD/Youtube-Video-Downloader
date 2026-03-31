
import type  { mediaBasicMetaData } from "./mediaBasicMetaData.js"
export type errorType = {
    error: string,
    url: string
}

export interface ReportInterface {
    errors: errorType[],
    downloadedVideos: mediaBasicMetaData[]
}