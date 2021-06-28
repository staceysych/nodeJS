import { ProductRepository } from '../repositories/productRepository';

export const get10LastRatings = async (ws, socket: any, message: any) => {
  const body = JSON.parse(message);
  if (body.type === 'lastRatings') {
    const repository = await new ProductRepository().create();
    const data = await repository.get10LastRatings();
    return socket.send(JSON.stringify(data));
  }
};
