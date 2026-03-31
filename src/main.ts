import { BulkDownloader } from "./Downloader/bulkDownloader.js"
import { downloadData } from "./Variables/downloadData.js"
import { DownloadMedia } from "./Downloader/DownloadMedia.js"
import { Initializer } from "./utils/inititalizer.js"
import * as fs from 'fs'

async function Main() {
    await Initializer()
    BulkDownloader(downloadData.videosUrl, downloadData.format, downloadData.output)

}

Main()

