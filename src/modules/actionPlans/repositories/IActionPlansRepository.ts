import { ActionPlans } from '@prisma/client';

import ICreateActionPlansDTO from '../dtos/ICreateActionPlansDTO';
import IUpdateActionPlansDTO from '../dtos/IUpdateActionPlansDTO';

interface IActionPlansRepository {
  create(data: ICreateActionPlansDTO): Promise<ActionPlans & { seller: { email: string, name: string }, supervisor: { name: string } }>;
  delete(id: string): Promise<ActionPlans>;
  getAll(): Promise<ActionPlans[] | null>;
  getByIdSeller(idSeller: string): Promise<ActionPlans[] | null>;
  update(id: string, data: IUpdateActionPlansDTO): Promise<ActionPlans>;
  findById(id: string): Promise<ActionPlans | null>;
  markAsDone(id: string): Promise<ActionPlans>;
}

export default IActionPlansRepository;
