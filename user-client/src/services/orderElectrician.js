import axios from 'axios';

export var orderElectrician = function(id, user) { 

    var order= {
        elecId: id,
        user: user
    }
    return new Promise((resolve, reject)=>{
        axios('http://localhost:2000/order/',{
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            data: order
          }).then((response)=> {
                  resolve(response);
          })
          .catch((err) => {
                  console.log(err);
                  reject(err);
          })
  })
}
 