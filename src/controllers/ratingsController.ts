import { RatingsService } from '../services';

export const get10LastRatings = async (ws, socket: any, message: any) => {
  const body = JSON.parse(message);
  if (body.type === 'lastRatings') {
    const ratings = await RatingsService.getLastRatings();
    return socket.send(JSON.stringify(ratings));
  }
};
