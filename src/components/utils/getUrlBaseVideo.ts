import axios from "axios"
import { IStreamsBlogger } from "../../types";

export async function getUrlBaseVideo(linkEmbed: string): Promise<IStreamsBlogger[] | undefined> {
    try {
        const { data } = await axios.get('https://cors-anywhere.herokuapp.com/' + linkEmbed);    

        const dataContainer = document.createElement('div')
        dataContainer.innerHTML = data
        
        const urlVideo = _getUrlBaseVideo(dataContainer)

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