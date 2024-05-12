import { inject, injectable } from "tsyringe";

import { Visit } from "@prisma/client";

import IVisitRepository from "../repositories/IVisitRepository";

@injectable()
export default class GetAllVisitService {
  constructor(
    @inject("VisitRepository")
    private visitRepository: IVisitRepository
  ) {}

  public async execute(): Promise<Visit[] | null> {
    const seller = await this.visitRepository.getAll();

    return seller;
  }
}
