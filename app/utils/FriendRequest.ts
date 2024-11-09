export default class FriendRequest {
    constructor(
        id: string,
        receiverID: number,
        inviterID: number,
        sendTime: string
    ) {
        this.id = id;
        this.receiverID = receiverID;
        this.inviterID = inviterID;
        this.sendTime = sendTime;
    }
    id: string;
    receiverID: number;
    inviterID: number;
    sendTime: string;
}
