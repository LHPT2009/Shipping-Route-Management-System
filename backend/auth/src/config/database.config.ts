import { Artist } from "src/modules/artists/artist.entity";
import { Song } from "src/modules/songs/song.entity";
import { User } from "src/modules/users/user.entity";


export const databaseConfig = {
    type: 'postgres',
    database: 'test',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'aB123789#',
    entities: [Song, Artist, User],
    synchronize: true,
}