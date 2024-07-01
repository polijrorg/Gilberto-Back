interface IGetSellerVisitDTO {
  name: string,
  visit: {
    created_at: Date,
    storeVisited: string,
    grade: number,
    visitTemplate: {
      categories: {
        name: string,
        questions: string[],
      }[],
    },
  }[],
}

export default IGetSellerVisitDTO;
