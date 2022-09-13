// Default status => complete, incomplete, can_answer, error
const vendas = [
  {
    idform: 'gONx6Bcn',
    url: 'https://saveaddsolutions.typeform.com/to/gONx6Bcn',
    name: 'Detalhes do interesse',
  },
  {
    idform: 'EYxrtgzb',
    url: 'https://saveaddsolutions.typeform.com/to/EYxrtgzb',
    name: 'Qualificação técnicas avançada',
  },
  {
    idform: 'wSVb6Bko',
    url: 'https://saveaddsolutions.typeform.com/to/wSVb6Bko',
    name: 'Capacidade de armazenamento avançado',
  },
  {
    idform: 'GfaiuUPf',
    url: 'https://saveaddsolutions.typeform.com/to/GfaiuUPf',
    name: 'Capacidade de retirada recorrente',
  },
  {
    idform: 'LM09Oyp2',
    url: 'https://saveaddsolutions.typeform.com/to/LM09Oyp2',
    name: 'Qualificação técnica básica',
  },
  {
    idform: 'mExfrj1o',
    url: 'https://saveaddsolutions.typeform.com/to/mExfrj1o',
    name: 'Capacidade de armazenamento básico',
  },
]

const doacao = [
  {
    idform: 'CS8jzd47',
    url: 'https://saveaddsolutions.typeform.com/to/CS8jzd47',
    name: 'Validação de perfil de ONG',
  },
  {
    idform: 'FC4Kr7jt',
    url: 'https://saveaddsolutions.typeform.com/to/FC4Kr7jt',
    name: 'Capacidade de retirada',
  },
  {
    idform: 'pBthZc',
    url: 'https://saveaddsolutions.typeform.com/to/pBthZc',
    name: 'Capacidade de armazenamento',
  },
  {
    idform: 'DGWbaZZl',
    url: 'https://saveaddsolutions.typeform.com/to/DGWbaZZl',
    name: 'Qualificação técnica de manuseio',
  },
]

export const trails = {
  doacao: doacao.map((el, index) => ({ ...el, idformold: `1${index + 1}`, status: 'can_answer' })),
  vendas: vendas.map((el, index) => ({ ...el, idformold: `2${index + 1}`, status: 'can_answer' })),
}
