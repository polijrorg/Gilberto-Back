import { TDocumentDefinitions } from 'pdfmake/interfaces';
import IReceiveSellerVisitInfosDTO from '@modules/seller/dtos/IReceiveSellerInfosDTO';

// Interface que deve conter todas as variáveis utilizadas no PDF
interface IDocumentTemplate {
    sellerVisits: IReceiveSellerVisitInfosDTO,
    day: string,
}

// Definição do documento
export default (data: IDocumentTemplate): TDocumentDefinitions => ({
  content: [
    { text: `Relatório de Visita - ${data.sellerVisits.name} - Dia ${data.day}`, style: 'header' },
    ...(data.sellerVisits.visit?.map((sellerVisit, index) => ([
      { text: `Visita ${index + 1}: Loja ${sellerVisit.storeVisited} - Horário: ${sellerVisit.created_at.getHours()}:${sellerVisit.created_at.getMinutes()} - Nota Geral: ${sellerVisit.grade}/5`, style: 'subheader' },
      ...(sellerVisit.visitTemplate.categories?.map((categoria, catIndex) => ([
        {
          text: `${catIndex + 1} - ${categoria.name}`,
          style: 'category',
          marginLeft: 20,
        },
        {
          ul: [
            ...(categoria.questions?.map((question, quesIndex) => ([
              `${quesIndex + 1} - ${question.question} : ${question.grade.filter((grade) => grade.questionsId === question.id).map((grade) => grade.grade)}/5`,
            ])) ?? []),
          ],
          marginLeft: 20,
        }])) ?? []),
    ])) ?? []),
  ],
});
