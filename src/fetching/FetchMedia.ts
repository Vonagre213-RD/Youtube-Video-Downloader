import youtubeDl from "youtube-dl-exec"
import * as fs from 'fs'
import type { mediaFullMetadata } from "../types/DownloadMetaData_Type.js"

export async function FetchMedia(url: string, format: string, output: string){

    const yt = youtubeDl.create('./bin/yt-dlp.exe')
    
    
    const payloadData = await yt(url, {
        dumpSingleJson: true,
        skipDownload: true,
        noWarnings: true,
        jsRuntimes: "node",
    })
    
    let stringData = await JSON.stringify(payloadData)

    let metadata: mediaFullMetadata = await JSON.parse(stringData)
  
    return metadata
}    
