import {
  Seller,
} from '@prisma/client';

import ICreateSellerDTO from '../dtos/ICreateSellerDTO';
import IUpdateSellerDTO from '../dtos/IUpdateSellerDTO';
import ReceiveSellerInfosDTO from '../dtos/IReceiveSellerInfosDTO';

interface ISellerRepository {
  create(data: ICreateSellerDTO): Promise<Seller>;
  delete(id: string): Promise<Seller>;
  getAllSellerFromASupervisor(supervisorId: string): Promise<Seller[] | null>;
  getAllSellerPendenteFromASupervisor(supervisorId: string): Promise<Seller[] | null>;
  getAllSellerMentoriaFromASupervisor(supervisorId: string): Promise<Seller[] | null>;
  getAllSellerVisitaFromASupervisor(supervisorId: string): Promise<Seller[] | null>;
  getAllSellerFromAManager(managerId: string): Promise<Seller[] | null>;
  getAllSellerFromADirector(directorId: string): Promise<Seller[] | null>;
  getAllSellerFromACompany(companyId: string): Promise<Seller[] | null>;
  updateSeller(id: string, data: IUpdateSellerDTO): Promise<Seller>;
  findByEmail(email: string): Promise<Seller | null>;
  findById(id: string): Promise<Seller | null>;
  findByIdAndData(id: string, day: string): Promise<ReceiveSellerInfosDTO | null>;
}

export default ISellerRepository;
