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
    data.sellerVisits.visit.forEach((sellerVisit, index) => ([
      { text: `Visita ${index + 1}: Loja ${sellerVisit.storeVisited} - Horário: ${sellerVisit.created_at.getHours()}:${sellerVisit.created_at.getMinutes()} - Nota Geral: ${sellerVisit.grade}/5`, style: 'subheader' },

      { text: `\tCategoria 1`, style: 'category', marginLeft: 20 },
      {
        ul: [
          `Pergunta 1: Nota`,
        ],
        marginLeft: 20,
      },

    ])),
    // { text: 'Relatório de Visita - Bruno - Dia 11/06/2024', style: 'header' },

    // { text: 'Visita 1: Loja 16 - Horário: 12:50 - Nota Geral: 5/5', style: 'subheader' },

    // { text: '\tCategoria 1', style: 'category', marginLeft: 20 },
    // {
    //   ul: [
    //     'Pergunta 1: Nota',
    //     'Pergunta 2: Nota',
    //     'Pergunta 3: Nota',
    //   ],
    //   marginLeft: 20,
    // },

    // data.visitas.forEach((visita, index) => {
    //     content.push({
    //         text: `Visita ${index + 1}: Loja ${visita.loja} - Horário: ${visita.horario} - Nota Geral: ${visita.notaGeral}/5`,
    //         style: 'subheader'
    //     });

    //     visita.categorias.forEach(categoria => {
    //         content.push({ text: categoria.nome, style: 'category' });

  //         categoria.perguntas.forEach(pergunta => {
  //             content.push(`Pergunta ${pergunta.pergunta}: Nota ${pergunta.nota}`);
  //         });
  //     });
  // });
  ],
});
