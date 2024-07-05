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
    {
      text: `Relatório de Visita - ${data.sellerVisits.name} - Dia ${data.day}`,
      style: 'header',
    },
    ...data.sellerVisits.visit?.map((sellerVisit, index) => [
      {
        text: `Visita ${index + 1}: ${sellerVisit.storeVisited} - Horário: ${sellerVisit.created_at.getHours()}:${sellerVisit.created_at.getMinutes()} - Nota Geral: ${sellerVisit.grade}/5`,
        style: 'subheader',
      },
      ...sellerVisit.visitTemplate.categories?.map((categoria, catIndex) => [
        {
          text: `${catIndex + 1} - ${categoria.name}`,
          style: 'category',
          marginLeft: 20,
        },
        {
          ul: [
            ...categoria.questions?.map((question, quesIndex) => [
              {
                text: `${quesIndex + 1} - ${question.question}: ${question.grade.filter((grade) => grade.questionsId === question.id && grade.sellerId === sellerVisit.sellerId).map((grade) => grade.grade)}/5`,
                marginLeft: 20,
              },
            ]) ?? [],
          ],
          marginLeft: 20,
        },
      ]) ?? [],
      { text: '', marginBottom: 20 }]) ?? [],
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10],
      alignment: 'center',
    },
    subheader: {
      fontSize: 14,
      bold: true,
      margin: [0, 10, 0, 5],
      color: 'blue',
    },
    category: {
      fontSize: 12,
      bold: true,
      margin: [0, 10, 0, 5],
    },
  },

  /* content: [
    { text: `Relatório de Visita - ${data.sellerVisits.name} - Dia ${data.day}` },
    ...(data.sellerVisits.visit?.map((sellerVisit, index) => ([
      {
        text: `Visita ${index + 1}: Loja ${sellerVisit.storeVisited} - Horário: ${sellerVisit.created_at.getHours()}:${sellerVisit.created_at.getMinutes()} -
      Nota Geral: ${sellerVisit.grade}/5`,
      },
      ...(sellerVisit.visitTemplate.categories?.map((categoria, catIndex) => ([
        {
          text: `${catIndex + 1} - ${categoria.name}`,
          style: 'category',
          marginLeft: 20,
        },
        {
          ul: [
            ...(categoria.questions?.map((question, quesIndex) => ([
              `${quesIndex + 1} - ${question.question} : ${question.grade.filter((grade) => grade.questionsId === question.id
                && grade.sellerId === sellerVisit.sellerId).map((grade) => grade.grade)}/5`,
            ])) ?? []),
          ],
          marginLeft: 20,
        },
      ])) ?? []),
    ])) ?? []),
  ], */
});
