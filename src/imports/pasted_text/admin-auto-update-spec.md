IMPORTANTE — ALTERAÇÕES 100% AUTOMÁTICAS E GLOBAIS

Quero que o sistema de administração do site funcione de forma totalmente automática.

NÃO quero depender de:
- Deploy manual;
- Make Settings → Supabase → Deploy;
- Edge Function que precise ser publicada manualmente;
- Rebuild manual;
- Vercel Deploy manual;
- Git push para atualizar conteúdo;
- Alterações no código-fonte;
- LocalStorage;
- SessionStorage;
- Cache local;
- Polling obrigatório de 6 segundos.

OBJETIVO:

Quando eu entrar em:

/admin

e alterar qualquer conteúdo do site e clicar em "Salvar", essa alteração deve:

1. Ser enviada automaticamente para o backend/API;
2. Ser salva automaticamente no banco de dados;
3. Ser considerada a nova versão oficial do conteúdo;
4. Atualizar automaticamente o site público;
5. Funcionar para TODOS os dispositivos;
6. Funcionar para TODOS os navegadores;
7. Funcionar para qualquer pessoa que acessar o site;
8. Continuar funcionando mesmo depois que eu fechar o computador;
9. Continuar funcionando mesmo se nenhum dispositivo estiver com o site aberto;
10. NÃO exigir nenhum deploy manual.

FLUXO OBRIGATÓRIO:

/admin
   ↓
Salvar alteração
   ↓
API / Backend
   ↓
Banco de dados
   ↓
Conteúdo atualizado
   ↓
Site público

O banco de dados/backend deve ser a FONTE OFICIAL dos conteúdos do site.

O navegador NÃO deve ser a fonte oficial dos dados.

EXEMPLO:

Estou no computador A.

Entro em:

/admin

Altero:

"Da Semente à Mesa, do Campo à Nação"

para:

"Cooperar para o Brasil Alimentar"

Clico em "Salvar".

O sistema deve automaticamente:

→ salvar no banco;
→ confirmar o salvamento;
→ invalidar/atualizar qualquer cache necessário;
→ disponibilizar imediatamente o novo conteúdo.

Depois disso:

Computador A → mostra o novo texto
Computador B → mostra o novo texto
Celular → mostra o novo texto
Tablet → mostra o novo texto
Outro navegador → mostra o novo texto
Novo visitante → mostra o novo texto

SEM DEPLOY.

SEM PRECISAR CLICAR EM "DEPLOY".

SEM PRECISAR PUBLICAR O PROJETO NOVAMENTE.

SEM PRECISAR ALTERAR O CÓDIGO.

SEM PRECISAR ESPERAR UMA NOVA BUILD.

PERSISTÊNCIA:

Todas as alterações administrativas devem ser persistentes no banco de dados.

Se eu:

1. Alterar o conteúdo;
2. Salvar;
3. Fechar o /admin;
4. Desligar meu computador;
5. Abrir o site amanhã em outro computador;

o conteúdo alterado deve continuar lá.

ATUALIZAÇÃO EM TEMPO REAL:

Se o site estiver aberto em vários dispositivos no momento da alteração, tentar atualizar esses dispositivos automaticamente usando um mecanismo real de realtime, como Supabase Realtime/WebSocket/SSE.

Exemplo:

Computador A:
/admin → altera conteúdo → Salvar

Computador B:
site aberto

Computador C:
site aberto

Assim que A salvar, B e C devem receber a atualização automaticamente, sem precisar atualizar manualmente a página.

IMPORTANTE:

O realtime é apenas para atualização instantânea.

A persistência NÃO pode depender do realtime.

Mesmo que nenhum usuário esteja conectado no momento da alteração, o conteúdo deve continuar salvo no banco.

Se o realtime estiver indisponível temporariamente, o sistema ainda deve funcionar normalmente porque o conteúdo já estará persistido no banco.

NÃO USAR POLLING COMO SOLUÇÃO PRINCIPAL.

Não quero uma solução baseada em:

"consultar o banco a cada 6 segundos".

Isso pode ser utilizado apenas como fallback excepcional, mas não como mecanismo principal.

CACHE:

Garantir que CDN, frontend, API, ISR, SSR, SSG ou qualquer outro mecanismo de cache não faça o site apresentar conteúdo antigo depois que uma alteração for salva.

Depois de salvar uma alteração administrativa, invalidar/revalidar automaticamente o cache necessário.

IMAGENS:

O mesmo vale para imagens.

Quando eu trocar uma imagem pelo /admin:

→ fazer upload automaticamente para o storage;
→ salvar a URL no banco;
→ atualizar o conteúdo;
→ disponibilizar a nova imagem globalmente.

A imagem não pode ficar armazenada apenas no computador do administrador.

ERROS:

Se o salvamento falhar:

- NÃO mostrar "salvo" falsamente;
- informar claramente o erro;
- permitir tentar novamente;
- não perder a alteração digitada.

Se o salvamento for concluído:

mostrar algo como:

"Alteração salva e publicada automaticamente."

Não mostrar mensagens dizendo que é necessário fazer deploy.

ADMIN:

O painel /admin deve funcionar como um CMS real.

Qualquer conteúdo que eu possa editar no painel deve estar conectado ao backend/banco de dados.

Não deixar conteúdo administrativo importante hardcoded no frontend.

TESTE OBRIGATÓRIO:

Depois de implementar, testar:

TESTE 1:
Abrir /admin no computador A.

TESTE 2:
Abrir o site público no computador B.

TESTE 3:
Abrir o site público no celular.

TESTE 4:
Alterar um texto pelo computador A.

TESTE 5:
Clicar em Salvar.

TESTE 6:
Confirmar que a alteração foi salva no banco.

TESTE 7:
Confirmar que os dispositivos que já estavam com o site aberto recebem a atualização.

TESTE 8:
Fechar todos os dispositivos.

TESTE 9:
Abrir o site novamente em outro dispositivo.

TESTE 10:
Confirmar que a alteração continua lá.

TESTE 11:
NÃO fazer nenhum deploy durante esse teste.

CRITÉRIO FINAL DE ACEITAÇÃO:

Eu quero poder fazer:

/admin → alterar → salvar

E pronto.

Depois disso, o conteúdo novo deve ser GLOBAL e PERMANENTE.

Não quero precisar fazer absolutamente nenhuma etapa adicional.

A única ação manual necessária para alterar o conteúdo deve ser:

ENTRAR NO /ADMIN → ALTERAR → SALVAR.

Todo o restante deve acontecer automaticamente no servidor.