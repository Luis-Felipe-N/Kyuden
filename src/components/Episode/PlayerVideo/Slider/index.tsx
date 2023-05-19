import { SliderRadixUI } from '../../../SliderRadixUI'

interface ISliderProps {
    percentage: number;
    currentTime: number;
    onChangePercentage: (event: number) => void
}

export function Slider({ percentage, onChangePercentage }: ISliderProps){

    function handleChangePercentage(value: number[]) {
        onChangePercentage(Number(...value))
    }

    return (
        <>
            <SliderRadixUI
                value={[percentage]}
                handleChangeValue={handleChangePercentage}
                min={0} 
                max={100} 
                step={0.01} 
                aria-label="Tempo de video"
            />
        </>
    )
}