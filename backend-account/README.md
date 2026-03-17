Signup 

POST /signup
Input: name (string), email (string), document (string), password (string)
Output: accountId (uuid)

* name deve ser composto de nome e sobrenome
* email deve seguir as regras de formação do email
* document deve ser validado com a regra do cpf
* password deve ter no mínimo 8 caracteres