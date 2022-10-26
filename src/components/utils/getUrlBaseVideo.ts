import axios from "axios"
import { IStreamsBlogger } from "../../types";

export async function getUrlBaseVideo(link: string): Promise<IStreamsBlogger[] | undefined> {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_DOMAINURL}/api/extractor`, {
            data: {
                linkEmbed: link,
                userAgent: window.navigator.userAgent
            }
        });    
        
        console.log("Data", data)
        const dataContainer = document.createElement('div')
        dataContainer.innerHTML = data.html
        
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