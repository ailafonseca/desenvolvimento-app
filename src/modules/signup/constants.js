const SetorEmpresaList = [
  { id: 1, text: 'Aeroespacial' },
  { id: 2, text: 'Agronegocio' },
  { id: 3, text: 'Automotivo' },
  { id: 4, text: 'Bens De Capital' },
  { id: 5, text: 'Borracha/Plástico' },
  { id: 6, text: 'Cerâmica' },
  { id: 7, text: 'Comércio / Varejo' },
  { id: 8, text: 'Construção Civil' },
  { id: 9, text: 'Construção Naval' },
  { id: 10, text: 'Economia / Criativa' },
  { id: 11, text: 'Economia / Turismo' },
  { id: 12, text: 'Gastronomia' },
  { id: 13, text: 'Eventos / Lazer' },
  { id: 14, text: 'Educacao' },
  { id: 15, text: 'Elétrico / Eletrônico' },
  { id: 16, text: 'Energia' },
  { id: 17, text: 'Fabricação / Alimentos / Bebidas' },
  { id: 18, text: 'Farmoquímico / Farmacêutico' },
  { id: 19, text: 'Financeiro' },
  { id: 20, text: 'Jurídico' },
  { id: 21, text: 'Madeira / Móveis' },
  { id: 22, text: 'Marketing / Mídias' },
  { id: 23, text: 'Meio Ambiente / Bioeconomia' },
  { id: 24, text: 'Mercado Imobiliário' },
  { id: 25, text: 'Metal / Mecânico / Metalurgia' },
  { id: 26, text: 'Mineração' },
  { id: 27, text: 'Papel / Celulose' },
  { id: 28, text: 'Pesca / Aquicultura' },
  { id: 29, text: 'Petróleo / Gás' },
  { id: 30, text: 'Químico' },
  { id: 31, text: 'Saúde / Bem-Estar' },
  { id: 32, text: 'Segurança / Defesa' },
  { id: 33, text: 'Social' },
  { id: 34, text: 'Tecnologia Da Informação / Telecomunicacoes' },
  { id: 35, text: 'Têxtil' },
  { id: 36, text: 'Confecção / Calcados' },
  { id: 37, text: 'Transporte' },
  { id: 38, text: 'Logística / Mobilidade' },
  { id: 99, text: 'Outros' }
]

const TipoEmpresaList = [
  { id: 1, text: 'Produtor Rural' },
  { id: 2, text: 'Indústria' },
  { id: 3, text: 'Distribuidor' },
  { id: 4, text: 'Atacado' },
  { id: 5, text: 'Varejo' },
  { id: 6, text: 'Restaurante' },
  { id: 7, text: 'OSC' }
]

const IsOng = (id) => parseInt(id) === 7

export { SetorEmpresaList, TipoEmpresaList, IsOng }
