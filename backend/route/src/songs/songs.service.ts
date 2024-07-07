
import { Injectable } from '@nestjs/common';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song-dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';
import { SongInterface } from './dto/song-interface';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepo: Repository<Song>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}
  async getSongs(): Promise<SongInterface[]> {
    return this.songRepo.find();
  }
  getSong(id: string) {
            // const getSongDetails = await this.artistsRepository
    //   .createQueryBuilder('artist')
    //   .leftJoinAndSelect(
    //     'artist.user',
    //     'user',
    //   )
    //   .where( "artist.id = :id", {id: id})
    //   .getMany()

    // console.log(getSongDetails);

    // const getSongDetails = await this.songsRepository
    //   .createQueryBuilder('song')
    //   .innerJoinAndSelect(
    //     'song.artists',
    //     'artist'
    //   )
    //   .innerJoinAndSelect(
    //     'artist.user',
    //     'user'
    //   )
    //   .where('song.id = :id', {id})
    //   .getMany()
    
    // console.log('getSongDetails: ', getSongDetails);

    // return getSongDetails;
    
    return this.songRepo.findOneOrFail({ where: { id } });
  }
  async createSong(createSongDTO: CreateSongDTO) {
    const newSong = this.songRepo.create(createSongDTO);
    await this.songRepo.save(newSong);
    return newSong;
  }
  async updateSong(id, updateSongDTO: UpdateSongDTO): Promise<UpdateResult> {
    return this.songRepo.update({ id }, updateSongDTO);
  }
  async deleteSong(id: string): Promise<DeleteResult> {
    return this.songRepo.delete(id);
  }
  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepo.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');

    return paginate<Song>(queryBuilder, options);
  }
}
