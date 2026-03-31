import youtubeDl from "youtube-dl-exec"
import type { Flags } from 'youtube-dl-exec'
import cliProgress from 'cli-progress'
import chalk from "chalk"
import { resolve } from "node:dns"
import { rejects } from "node:assert"

export async function DownloadMedia(url: string, format: string, output: string) {


    const yt = youtubeDl.create('./bin/yt-dlp.exe')

    let options: Flags = {
        format: "",
    }

    if (format.toLowerCase() === "mp4") {
        options.format = "bestvideo+bestaudio/best",
            options.mergeOutputFormat = "mp4"

    }
    else {
        options.audioFormat = "mp3"
        options.format = "bestaudio"
        options.extractAudio = true
    }

    const raw = await yt.exec(url, {
        dumpSingleJson: true
    })

    const info = JSON.parse(raw.stdout)

    const title = info.title

    const data = yt.exec(url, {
        ...options,

        jsRuntimes: "node",
        output: `${output}/%(title)s.%(ext)s`
    })

    console.log(chalk.green(`\nDownloading ${title}`))


    const bar = new cliProgress.SingleBar({
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        format: 'Progress: {bar} {percentage}%/{total} | FileSize: {filetotal} | speed: {speed}',
        fps: 5,
        hideCursor: true,
    }, cliProgress.Presets.shades_classic)


    bar.start(100, 0)
    data.stdout?.on("data", (data: any) => {
        const line = data.toString()
        const chunkData = line.match(/\[download\]\s+(\S+)\s+\S+\s+(\S+)\s\S+\s+(\S+)\s(\S+)/)

        if (chunkData == null || chunkData[4] == "at")
            return;


        const currentProg = parseFloat(chunkData[1])
        const speed = chunkData[3]
        const filetotal = chunkData[2]

        functionUpdateBar()
        if (currentProg >= 100) {
            bar.stop()

        }

        function functionUpdateBar() {
            bar.update(currentProg, {
                speed: speed,
                filetotal: filetotal
            })
        }
    })

    return new Promise<void>((resolve, reject) => {
        data.on("close", () => resolve())

    })


}
