interface ICreateVisitDTO {
  storeVisited: string;
  dateVisited: string;
  grade?: number;
  comments?: string;
  sellerId: string;
  visitTemplateId: string;
}

export default ICreateVisitDTO;
