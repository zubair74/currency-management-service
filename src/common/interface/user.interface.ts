export interface UserKey {
    id: number;
}
  
export interface User extends UserKey {
    username: string;
    password: string
}