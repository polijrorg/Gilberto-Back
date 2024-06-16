import {
  Seller, Visit, VisitTemplate, Categories, Questions,
} from '@prisma/client';

type ReceiveSellerInfosDTO =
    Seller & {
        visit: (Visit & {
          visitTemplate: VisitTemplate & {
            category: (Categories & {
              questions: Questions[]
            })[]
          }
        })[]
      }

export default ReceiveSellerInfosDTO;
