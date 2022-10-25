import axios from "axios"
import { IStreamsBlogger } from "../../types";

export async function getUrlBaseVideo(link: string): Promise<IStreamsBlogger[] | undefined> {
    try {
        const { data } = await axios.post('http://localhost:3000/api/hello', {
            data: {
                linkEmbed: link
            }
        });    
        
        console.log("Data", data)
        const dataContainer = document.createElement('div')
        dataContainer.innerHTML = data.html
        
        const urlVideo = _getUrlBaseVideo(dataContainer)
        
        // console.log(urlVideo)

        return urlVideo
    } catch (error) {
        return
    }
}


function _getUrlBaseVideo(html: HTMLDivElement): IStreamsBlogger[] | undefined {
    const videoConfig = html.querySelector('script')?.textContent
    if (videoConfig) {
        const indexStartStrem = videoConfig.replace('var VIDEO_CONFIG = ', '')
        
        const obj = JSON.parse(indexStartStrem)
        return obj.streams
    }

    return
}