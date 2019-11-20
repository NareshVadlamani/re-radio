import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { PubSubModule } from 'core/pub-sub/pub-sub.module';
import { RadioTypeOrmModule } from 'core/typeorm/typeorm.module';
import { ConfigModule } from 'core/config/config.module';
import { SongModule } from 'radio/song/song.module';
import { StationModule } from 'radio/station/station.module';
import { RealTimeSongsModule } from '../real-time-songs/real-time-songs.module';
import { RealTimeStationsWorker } from './real-time-stations.worker';
import { RealTimeStationService } from './real-time-stations.service';

@Module({
  imports: [
    ConfigModule,
    RadioTypeOrmModule,
    PubSubModule,
    StationModule,
    SongModule,
    forwardRef(() => RealTimeSongsModule),
  ],
  providers: [RealTimeStationsWorker, RealTimeStationService],
  exports: [RealTimeStationService],
})
export class RealTimeStationsModule implements OnModuleInit {
  constructor(private readonly realTimeStationsService: RealTimeStationsWorker) {}
  async onModuleInit() {
    await Promise.all([
      this.realTimeStationsService.scanAllStationsOnInitialization(),
      this.realTimeStationsService.subscribeOnlineUsersEvent(),
    ]);
  }
}
