export default class UserData {
    constructor(
        name: string,
        email: string,
        profile_picture: string,
        description: string
    ) {
        this.name = name;
        this.email = email;
        this.profile_picture = profile_picture;
        this.description = description;
    }
    name: string;
    email: string;
    profile_picture: string;
    description: string;
}
