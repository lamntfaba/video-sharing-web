import IconSpinner from "../Icons/SpinIcon";

export default function Loading() {
    return <div className="flex items-center justify-center w-full h-full">
        <div className="flex justify-center items-center space-x-1 text-sm">
            <IconSpinner className="w-6 h-6 animate-spin" />
            <div>Loading ...</div>
        </div>
    </div>
}