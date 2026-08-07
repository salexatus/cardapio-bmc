// Base da API REST (backend Django). Em produção, o Pages injeta
// PUBLIC_API_URL no build; o default cobre o domínio de produção.
export const API_URL = (
  import.meta.env.PUBLIC_API_URL || 'https://apicardapiobmc.limadesigner.com.br'
).replace(/\/$/, '')
