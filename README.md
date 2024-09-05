# App

GymPass style app

## RFs

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuario logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuario obter seu historico de check-ins;
- [ ] Deve ser possível o usuario buscar academias próximas;
- [x] Deve ser possível o usuario buscar academias pelo nome;
- [x] Deve ser possível o usuario realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuario;
- [x] Deve ser possível cadastrar uma academia;

## RNs

- [x] O usuario não pode se cadastrar com um email já cadastrado;
- [x] O usuario não pode fazer 2 check-ins no mesmo dia;
- [x] O usuario não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser válidado até 20 minutos após criado;
- [ ] O check-in só pode ser válidado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs

- [x] A senha do usuario precisar estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar páginadas com 20 itens por página;
- [ ] O usuario deve ser identificado por um JWT (JSON Web Token);
