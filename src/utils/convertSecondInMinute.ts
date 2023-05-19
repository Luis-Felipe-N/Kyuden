export function convertSecondInMinute(second: number) {
    const hours = Math.floor(second / (60 * 60))
    const minutes = Math.floor((second % (60 * 60) / 60))
    const seconds = Math.floor(second % 60)
    
    if (hours) {
        return [hours, minutes, seconds].map((time) => String(time).padStart(2, '0')).join(':')
    }

    return [minutes, seconds].map((time) => String(time).padStart(2, '0')).join(':')
}