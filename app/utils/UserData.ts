export default class UserData {
    constructor(
        id: number,
        name: string,
        email: string,
        profile_picture: string,
        description: string
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.profile_picture = profile_picture;
        this.description = description;
    }
    id: number;
    name: string;
    email: string;
    profile_picture: string;
    description: string;
}
