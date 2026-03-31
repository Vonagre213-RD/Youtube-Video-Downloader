import { report } from "../Variables/report.js";
import * as fs from 'fs'


export function reportCreator(){
    const reportsDir = "./Reports"
    if(!fs.existsSync(reportsDir)){
        fs.mkdirSync(reportsDir)
    }

    const reportCount = fs.readdirSync('./Reports').length
    
    const stringReport = JSON.stringify(report, null, 1)
    fs.writeFileSync(`${reportsDir}/report${reportCount}.json`, stringReport)

}