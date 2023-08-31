export type RGB = {
  r: number
  g: number
  b: number
}

export const convertRGBObjectToString = (rgb: RGB) => {
  return `rbg(${rgb.r}, ${rgb.g}, ${rgb.b})`
}

export async function getPalette(imageUrl: string) {
  const image = new Image()
  image.src = imageUrl
  image.crossOrigin = 'Anonymous'

  await image.decode()

  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.drawImage(image, 0, 0)

  /**
   * getImageData returns an array full of RGBA values
   * each pixel consists of four values: the red value of the colour, the green, the blue and the alpha
   * (transparency). For array value consistency reasons,
   * the alpha is not from 0 to 1 like it is in the RGBA of CSS, but from 0 to 255.
   */
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  // Convert the image data to RGB values so its much simpler
  const rgbArray = buildRgb(imageData.data)

  /**
   * Color quantization
   * A process that reduces the number of colors used in an image
   * while trying to visually maintin the original image as much as possible
   */
  return quantization(rgbArray, 0)
}

const buildRgb = (imageData: Uint8ClampedArray) => {
  const rgbValues = []
  // note that we are loopin every 4!
  // for every Red, Green, Blue and Alpha
  for (let i = 0; i < imageData.length; i += 4) {
    const rgb = {
      r: imageData[i],
      g: imageData[i + 1],
      b: imageData[i + 2],
    }

    rgbValues.push(rgb)
  }

  return rgbValues
}

const quantization = (rgbValues: RGB[], depth: number): RGB[] => {
  const MAX_DEPTH = 4

  // Base case
  if (depth === MAX_DEPTH || rgbValues.length === 0) {
    const color = rgbValues.reduce(
      (prev, curr) => {
        prev.r += curr.r
        prev.g += curr.g
        prev.b += curr.b

        return prev
      },
      {
        r: 0,
        g: 0,
        b: 0,
      },
    )

    color.r = Math.round(color.r / rgbValues.length)
    color.g = Math.round(color.g / rgbValues.length)
    color.b = Math.round(color.b / rgbValues.length)

    return [color]
  }

  /**
   *  Recursively do the following:
   *  1. Find the pixel channel (red,green or blue) with biggest difference/range
   *  2. Order by this channel
   *  3. Divide in half the rgb colors list
   *  4. Repeat process again, until desired depth or base case
   */
  const componentToSortBy = findBiggestColorRange(rgbValues)
  rgbValues.sort((p1, p2) => {
    return p1[componentToSortBy] - p2[componentToSortBy]
  })

  const mid = rgbValues.length / 2
  return [
    ...quantization(rgbValues.slice(0, mid), depth + 1),
    ...quantization(rgbValues.slice(mid + 1), depth + 1),
  ]
}

const findBiggestColorRange = (rgbValues: RGB[]) => {
  /**
   * Min is initialized to the maximum value posible
   * from there we procced to find the minimum value for that color channel
   *
   * Max is initialized to the minimum value posible
   * from there we procced to fin the maximum value for that color channel
   */
  let rMin = Number.MAX_VALUE
  let gMin = Number.MAX_VALUE
  let bMin = Number.MAX_VALUE

  let rMax = Number.MIN_VALUE
  let gMax = Number.MIN_VALUE
  let bMax = Number.MIN_VALUE

  rgbValues.forEach((pixel) => {
    rMin = Math.min(rMin, pixel.r)
    gMin = Math.min(gMin, pixel.g)
    bMin = Math.min(bMin, pixel.b)

    rMax = Math.max(rMax, pixel.r)
    gMax = Math.max(gMax, pixel.g)
    bMax = Math.max(bMax, pixel.b)
  })

  const rRange = rMax - rMin
  const gRange = gMax - gMin
  const bRange = bMax - bMin

  // determine which color has the biggest difference
  const biggestRange = Math.max(rRange, gRange, bRange)
  if (biggestRange === rRange) {
    return 'r'
  } else if (biggestRange === gRange) {
    return 'g'
  } else {
    return 'b'
  }
}
