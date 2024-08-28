# App

GymPass style app

## RFs

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuario logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuario obter seu historico de check-ins;
- [ ] Deve ser possível o usuario buscar academias próximas;
- [ ] Deve ser possível o usuario buscar academias pelo nome;
- [ ] Deve ser possível o usuario realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuario;
- [ ] Deve ser possível cadastrar uma academia;

## RNs

- [ ] O usuario não pode se cadastrar com um email já cadastrado;
- [ ] O usuario não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuario não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser válidado até 20 minutos após criado;
- [ ] O check-in só pode ser válidado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs

- [ ] A senha do usuario precisar estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar páginadas com 20 itens por página;
- [ ] O usuario deve ser identificado por um JWT (JSON Web Token);
