interface ICreateActionPlansDTO {
  title: string;
  comments: string;
  prize: string;
  sellerId: string;
  supervisorId: string;
  visitId?: string;
  moduleId?: string;
}

export default ICreateActionPlansDTO;
