import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SongsService } from './songs.service';
import { Query } from '@nestjs/graphql';
import { CreateSongInput, Song } from '../graphql';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song-dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Resolver()
export class SongResolver {
  constructor(private songsService: SongsService) {}

  @Query('songs')
  async getSongs(): Promise<Song[]> {
    return this.songsService.getSongs();
  }

  @Query('song')
  async getSong(
    @Args('id')
    id: string,
  ): Promise<Song> {
    return this.songsService.getSong(id);
  }

  @Mutation('createSong')
  async createSong(
    @Args('createSongInput')
    args: CreateSongInput,
  ): Promise<Song> {
    return this.songsService.createSong(args);
  }
  @Mutation('updateSong')
  async updateSong(
    @Args('updateSongInput')
    args: UpdateSongDTO,
    @Args('id')
    id: string,
  ): Promise<UpdateResult> {
    return this.songsService.updateSong(id, args);
  }

  @Mutation('deleteSong')
  async deleteSong(
    @Args('id')
    id: string,
  ): Promise<DeleteResult> {
    return this.songsService.deleteSong(id);
  }
}
