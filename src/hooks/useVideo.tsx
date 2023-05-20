import { useContext } from "react";
import { VideoContext } from "../context/VideoContext";

export function useVideo() {
    const value = useContext(VideoContext)

    return (
        value
    )
}