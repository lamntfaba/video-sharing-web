export default interface VideoType {
    videoId: string;
    url: string;
    title: string;
    createBy: string;
    likedList?: string[];
    dislikedList?: string[];
}