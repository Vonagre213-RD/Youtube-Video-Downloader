import { FetchMedia } from "../fetching/FetchMedia.js"
import { DownloadMedia } from "./DownloadMedia.js"
import { reportCreator } from "../utils/reportCreator.js"
import { report } from "../Variables/report.js"
import { parseMetadata } from "../utils/parseMetadata.js"
import chalk from "chalk"


export async function BulkDownloader(urls: string[], format: string, output: string) {

 

    for (let url of urls) {
        try{
        let metadata = await FetchMedia(url, format, output)
        await DownloadMedia(url, format, output)

        report.downloadedVideos.push(parseMetadata(metadata))
        }
        catch(err){
            if(err instanceof Error){
                console.log(chalk.red(`!!!==== there was an error: ${err.message}!!!!`));
                continue;
            }
        }
    }

    reportCreator()
}