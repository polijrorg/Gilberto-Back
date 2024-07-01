import {
  Seller, Visit, VisitTemplate, Categories, Questions,
  QuestionsGrades,
} from '@prisma/client';

type ReceiveSellerInfosDTO =
    Seller & {
        visit: (Visit & {
          visitTemplate: VisitTemplate & {
            categories: (Categories & {
              questions: (Questions & {
                grade: QuestionsGrades[]
              })[]
            })[]
          }
        })[]
      }

export default ReceiveSellerInfosDTO;
