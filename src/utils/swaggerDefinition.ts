import { Express,Request,Response } from "express";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from "swagger-ui-express";
import { version } from "../package.json"

const options:swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Quanter  Deliver API',
      version
    },
    components:{
        securitySchemas:{
            bearerAuth:{
                type:"https",
                scheme:"bearer",
                bearerFormat:"JWT"
            }
        }

    },
    security:[
        {
            bearerAuth:[]
        }
    ]
  },
  apis: ['./routes/*.ts','./models*.ts'], // Specify the path to your route files (replace with actual path)
};

const swaggerSpec = swaggerJSDoc(options);

 
function swaggerDocs(app:Express,port:number) {
    //SWAGGER PAGE
    app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec))
    //DOCS IN JSON FORMAT
    app.get("docs.json",(re:Request,res:Response)=>{
        res.setHeader("Content-Type","application/json");
        res.send(swaggerSpec)
    })

    console.log(`Docs AVAILABLE AT http://localhost:${port}/docs`);
    
}
export default swaggerDocs;