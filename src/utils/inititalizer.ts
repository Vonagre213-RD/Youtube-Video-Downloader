import chalk from "chalk";
import { fetchXmlData } from "./fetchXmlData.js";
import { downloadData } from "../Variables/downloadData.js";
export async function Initializer() {
    const xmlData = await fetchXmlData()

    downloadData.videosUrl = xmlData.downloadData.videosUrl.split('\n').map((url) => {
        return url.replaceAll('\n','').trim()})

        downloadData.videosUrl =  downloadData.videosUrl.filter(u =>  u.replaceAll(' ', '').length > 3)

        if (downloadData.videosUrl.length == 0) {
            console.log(chalk.red("!!Video urls is empty, please try again adding urls!!"))
            process.exit()
        }

        downloadData.format = xmlData.downloadData.format
        if(downloadData.format != "mp3" && downloadData.format != "mp4"){
            console.log(chalk.yellow("A valid format wasn't introduced, utilizing mp3 format by default"))
            downloadData.format = 'mp3'
        }
    downloadData.output = xmlData.downloadData.output

}   