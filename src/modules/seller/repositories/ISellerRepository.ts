import { Seller } from '@prisma/client';

import ICreateSellerDTO from '../dtos/ICreateSellerDTO';

interface ISellerRepository {
  create(data: ICreateSellerDTO): Promise<Seller>;
  delete(id: string): Promise<Seller>;
  getAllSellerFromASupervisor(supervisorId: string): Promise<Seller[] | null>;
  findByEmail(email: string): Promise<Seller | null>;
  findById(id: string): Promise<Seller | null>;
}

export default ISellerRepository;
