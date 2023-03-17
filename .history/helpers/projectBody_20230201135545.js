
// @return [{}]
export default function projectBody(body){
    let bodyKeys = [];
    let bodyValues = [];
    let members = [];
    let scholars = [];

    for(let i in body){
      bodyKeys.push(i);
      bodyValues.push(body[i])
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

    body.members = members;
    body.scholars = scholars;
    body.mypic = req.files.mypic.name;
    
    return new Project(body)
}