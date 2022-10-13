import axios from "axios"

export async function getUrlBaseVideo(linkEmbed: string) {
    console.log(linkEmbed)

    const { data } = await axios.get(linkEmbed, {
        headers: {
          
        },
    })
}