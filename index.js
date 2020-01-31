const express = require("express");
const server = express();
server.use(express.json());




const projetos = [{"id":"0", "title":"nome exemplo", "task":[]}];

//middlewares

//xxxxxxxxxxglobal
 server.use((req, res, next) => {
  console.time("request");
    console.log(`Método: ${req.method}; URL: ${req.url}`);
    console.count("Quantidade de requisições");
  next();
  console.timeEnd("request")
 });
//xxxxxxxxxlocal
function checkIdExist (req, res, next){
  const {id} = req.params;
  const idFound = projetos.find(elemento => elemento.id == id);
  if(!idFound) {
    return res.status(400).json({"error":`Sinto mas o id:${id} não foi encontrado`});
  }

  next();
}
//listar projetos
 server.get("/projetos", (req, res) => {
  
   return res.json(projetos);
});

//cadastrar projetos
  server.post("/projetos", (req, res) => {
    const {id,title} = req.body;
    
    const projeto = {
      id,
      title,
      "task":[]
    }
    projetos.push(projeto);

    return res.json(projeto);
  });
//cadastrar tarefas
  server.post("/projetos/:id/tasks",checkIdExist, (req, res) => {
    const {id} = req.params;
    const {title} = req.body;

    const projetoEncontrado = projetos.find(elemento => elemento.id == id);

    projetoEncontrado.task.push(title);

    return res.json(projetos);

  });

//alterar projetos
  server.put("/projetos/:id",checkIdExist, (req, res) =>{
    const {id} = req.params;
    const {title} = req.body;
// o find() retorna o valor do primeiro elemento do array que satisfazer a função de teste, caso contrário retorna undefined
    const projetoT = projetos.find(elemento => elemento.id == id);

    projetoT.title = title;

    return res.json(projetos);

  });

//deletar projetos
  server.delete("/projetos/:id",checkIdExist, (req, res)=>{
    const {id} = req.params;
    const index = projetos.findIndex(elemento => elemento.id == id);

    projetos.splice(index,1);
    return res.send("<h3 style='color:#7dc44a'>Deletado com sucesso!</h3>");
  });

server.listen(8080);