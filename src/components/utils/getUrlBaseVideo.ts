import axios, { CancelTokenSource } from 'axios'
import { IStreamsBlogger } from '../../types'

export async function getUrlBaseVideo(
  link: string,
  signal: CancelTokenSource | false = false,
): Promise<IStreamsBlogger[] | undefined> {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAINURL}/api/extractor`,
      {
        cancelToken: signal,
        data: {
          linkEmbed: link,
          userAgent: window.navigator.userAgent,
        },
      },
    )

    const dataContainer = document.createElement('div')
    dataContainer.innerHTML = data.html

    const urlVideo = _getUrlBaseVideo(dataContainer)

    return urlVideo
  } catch (error) {}
}

function _getUrlBaseVideo(html: HTMLDivElement): IStreamsBlogger[] | undefined {
  const videoConfig = html.querySelector('script')?.textContent
  if (videoConfig) {
    const indexStartStrem = videoConfig.replace('var VIDEO_CONFIG = ', '')

    const obj = JSON.parse(indexStartStrem)
    return obj.streams
  }
}
