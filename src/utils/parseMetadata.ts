import type { mediaBasicMetaData } from "../types/mediaBasicMetaData.js";
import type { mediaFullMetadata } from "../types/DownloadMetaData_Type.js";
import { report } from "../Variables/report.js";


export function parseMetadata(metadata: mediaFullMetadata){

    const basicMetadata: mediaBasicMetaData = {
        view_count: metadata.view_count,
        id: metadata.id,
        title: metadata.title,
        channel_name: metadata.channel,
        channel_url: metadata.channel_url,
        duration: metadata.duration,
        average_rating: metadata.average_rating
    }

    return basicMetadata
}