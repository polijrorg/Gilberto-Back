import { inject, injectable } from 'tsyringe';

import ISellerRepository from '../repositories/ISellerRepository';

@injectable()
export default class GetllManagerAndDirectorFromSellerService {
  constructor(
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
  ) {}

  public async execute(sellerId: string): Promise<{ managerId: string | null, directorId: string | null} | null> {
    const seller = await this.sellerRepository.getManagerAndDirectorFromSeller(sellerId);

    return seller;
  }
}
