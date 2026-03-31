import { report } from "../Variables/report.js";
import { XMLParser } from "fast-xml-parser";
import * as fs from 'fs'
import type { XMLdownloadDataType} from "../types/downloadDataType.js";
import Chalk from "chalk";

export async function fetchXmlData() {
    const parser = new XMLParser({attributeNamePrefix: "", ignoreAttributes: false});
    const downloadFilePath = "./downloadData.xml"

    if (!fs.existsSync(downloadFilePath)) {

        console.log(Chalk.red("!==== The downloadData.xml file doesn't exists, creating it ====!"))
        fs.writeFileSync(downloadFilePath,
            `
            <downloadData format=""  output="">
            <videosUrl>
            </videosUrl>
            </downloadData>
        `
        )
        console.log(Chalk.green("!==== The downloadData.xml file was created successfully, put your data in it===!"))

        process.exit();
    }
    const downloadFile = fs.readFileSync(downloadFilePath)
    const xmlData: XMLdownloadDataType = await parser.parse(downloadFile)
    return xmlData
}