
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class SignupInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class CreateSongInput {
    title: string;
}

export class UpdateSongInput {
    title?: Nullable<string>;
}

export class Artist {
    id: string;
}

export abstract class IQuery {
    abstract artists(): Artist[] | Promise<Artist[]>;

    abstract login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract songs(): Song[] | Promise<Song[]>;

    abstract song(id: string): Song | Promise<Song>;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export abstract class IMutation {
    abstract signup(signupInput: SignupInput): SignupResponse | Promise<SignupResponse>;

    abstract createSong(createSongInput: CreateSongInput): Song | Promise<Song>;

    abstract updateSong(id: string, updateSongInput: UpdateSongInput): UpdateResult | Promise<UpdateResult>;

    abstract deleteSong(id: string): DeleteResult | Promise<DeleteResult>;
}

export class SignupResponse {
    message: string;
}

export class LoginResponse {
    accessToken: string;
}

export class Song {
    id: string;
    title?: Nullable<string>;
}

export class UpdateResult {
    affected: number;
}

export class DeleteResult {
    affected: number;
}

type Nullable<T> = T | null;
