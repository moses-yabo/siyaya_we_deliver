import { Request, Response,RequestHandler } from "express";
import shipping_model from "../models/ShippingSchema";
import { shipping_Type } from "../types/productsTypes";



export const get_all_shippings:RequestHandler = async(req,res):Promise<void>=>{

    try {
      const products = await shipping_model.find({});
        if(!products) return;
    
        res
        .status(200)
        .json({
          status:"success",
          data:products
          
        });
      
      
    } catch (error) {

      if (error || res.statusCode >= 400) {
        res
        .status(401)
        .json({
          status:"failed",
          msg:{error}
        });
      }
    }
   
  }



  export const get_shippings_by_id:RequestHandler = async(req,res):Promise<void> => {
   
    
    const shippingId:string = req.params["shippingId"];
      
    try {
      const shipping = await shipping_model.findById(shippingId);
      console.log(shipping);
      
    
      if(!shipping) return;
      res
      .status(200)
      .json({
        status:"success",
        data:shipping
      });

    } catch (error) {
      res
      .status(404)
      .json({
        status:"Failed",
        msg:error
      });
    }

    }
  

    export const create_shipping:RequestHandler = async (req,res):Promise<void> =>{
  
  
        try {
          const newShipping = await shipping_model.create(req.body);
  
          if (!newShipping)  return;
  
          res
          .status(201)
          .json({
            status:"success!",
            data:newShipping
          });
  
        } catch (error) {
          res
          .status(401)
          .json({
            status:"failed",
            msg:{error}
          });
        }

      };


      export const updateOne_shipping:RequestHandler = async(req,res):Promise<void>=>{
      
          try {
           const  shippingId = req.params["shippingId"];
           
           const updatedProduct =  await shipping_model.updateOne(
            {_id:shippingId},
            {$set:req.body}
            );
           
    
            if (updatedProduct.modifiedCount === 0) {
              res.status(404).json({
                status:"failed",
                msg:"Shipping not found or not updated"
              });
              return;
            }
    
           res
           .status(200)
           .json({
            status:"success !",
            data:updatedProduct
          
           });
    
    
          } catch (error) {
            res
            .status(404)
            .json({
              status:"failed 😭",
              msg:"An Error Occured during an update",
              err:{error}
            });
          }
        }
      
      
        export const updateMany_shipping:RequestHandler = async (req,res):Promise<void>=>{
          
            const shippingId = req.params["shippingId"];
            try {
      
             const updatedShipp =  await shipping_model.findByIdAndUpdate(
              shippingId,
              req.body,
              {
      
              new:true,
              runValidators:true
      
              }
             );
             if (!updatedShipp?.isModified) {
              res.status(404).json({
                status: "failed 😭",
                msg: "Shipping not found"
              });
              return;
             };
      
             res
             .status(200)
             .json({
              status:"success !",
              data:{
                msg:"updated shippment ...",
                updatedShipp
              }
             });
      
            } catch (error) {
              res
              .status(500)
              .json({
                status:"failed 😭",
                msg:"An Error Occured during update ",
                err:error
              });
            }
          }
        
          export const  remove_shipping:RequestHandler = async(req,res):Promise<void>=>{
            
              const shippingId  = req.params["shippingId"];
              try {
        
               const removedShipp =  await shipping_model.findByIdAndDelete({_id:shippingId},{$set:req.body});
               if (!removedShipp) return ;
               res
               .status(204)
               .json({
                status:"success !",
                data:{
                  msg:"removed shippment ...",
              
                }
               });
              } catch (error) {
                res
                .status(404)
                .json({
                  status:"failed 😭",
                  msg:{error}
                });
              };
            };
