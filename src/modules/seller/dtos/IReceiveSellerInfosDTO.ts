import {
  Questions,
  Seller, Visit, VisitTemplate, Categories,
  QuestionsGrades,
} from '@prisma/client';

type ReceiveSellerInfosDTO =
    Seller & {
        visit: (Visit & {
          QuestionsGrades: QuestionsGrades[]
          visitTemplate: VisitTemplate & {
            categories: (Categories & {
              questions: Questions[]
            })[]
          }
        })[]
      }

export default ReceiveSellerInfosDTO;
