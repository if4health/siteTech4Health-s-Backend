export default function parseToArray(){
    let bodyKeys = [];
    let bodyValues = [];
    let members = [];
    let scholars = [];

    for(let i in req.body){
      bodyKeys.push(i);
      bodyValues.push(req.body[i])
    }

    bodyKeys.forEach((e) => {
      if(e.charAt(1) == 'e'){
        members.push(
          {
            "name" :  bodyValues[bodyKeys.indexOf(e)]
          }
        )
      }
    })

    bodyKeys.forEach((e) => {
      if(e.charAt(1) == 'c'){
        scholars.push(
          {
            "name" :  bodyValues[bodyKeys.indexOf(e)]
          }
        )
      }
    })

    req.body.members = members;
    req.body.scholars = scholars;
    req.body.mypic = req.files.mypic.name;
    
    const project = new Project(req.body)
}