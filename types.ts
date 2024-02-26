export type EventType = "postCreated" | "commentCreated" | "commentModerated" | "commentUpdated";
export interface IComment {
    id: string;
    postID: string;
    text: string;
    status: CommentStatus

}
export type CommentStatus = 'pending' | 'approved' | 'rejected'

export type IPost = {
    id: string,
    title: string,
    comments: IComment[]
}
export type BlogEvent = {
    type: EventType,
    data: IPost | IComment
}