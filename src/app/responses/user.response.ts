export interface UserResponse {
    id: number;
    fullname: string;
    address: string;
    is_active: boolean;
    date_of_birth: Date;
    role: {
        id: string;
        name: string;
    };
}
