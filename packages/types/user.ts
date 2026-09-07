export type UserStatus = 'active' | 'blocked';

export interface User {
	id: number;
	name: string;
	email: string;
	status: UserStatus;
	avatarUrl?: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	name: string;
	email: string;
	password: string;
}

export interface LoginResponse {
	success: boolean;
	user?: User;
	accessToken?: string;
	message?: string;
}
