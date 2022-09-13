
export const isVendedor = (perfil) => perfil && perfil.venda && perfil.venda.vendedor
export const isComprador = (perfil) => perfil && perfil.venda && perfil.venda.comprador
export const isDoador = (perfil) => perfil && perfil.doacao && perfil.doacao.doador
export const isDonatario = (perfil) => perfil && perfil.doacao && perfil.doacao.donatario
export const hasVenda = (perfil) => isVendedor(perfil) || isComprador(perfil)
export const hasDoacao = (perfil) => isDoador(perfil) || isDonatario(perfil)
export const isVendaEDoacao = (perfil) => hasVenda(perfil) && hasDoacao(perfil)
export const isSoVenda = (perfil) => hasVenda(perfil) && !hasDoacao(perfil)
export const isSoDoacao = (perfil) => !hasVenda(perfil) && hasDoacao(perfil)
export const isEmptyPerfil = (perfil) => !hasVenda(perfil) && !hasDoacao(perfil)
