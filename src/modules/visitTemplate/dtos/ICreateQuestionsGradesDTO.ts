interface ICreateQuestionsGradesDTO {
  sellerId: string;
  questionsId: string;
  grade: number;
  visitId: string;
  comments?: string
}

export default ICreateQuestionsGradesDTO;
