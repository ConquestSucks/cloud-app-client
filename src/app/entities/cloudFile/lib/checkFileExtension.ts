import extensions from './extensions.json'

function checkFileExtension(ext: string) {
    const path = "/file/"
    if (extensions.image.includes(ext))
         return `${path + "img"}`
    else if (extensions.video.includes(ext))
        return `${path + "video"}`

    return `${path + "unknown"}`
};

export default checkFileExtension;