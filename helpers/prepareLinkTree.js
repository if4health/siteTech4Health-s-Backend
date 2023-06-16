// module.exports = function prepareLinkTree(body){
// 	let bodyKeys = [];
// 	let bodyValues = [];
// 	let links = [];

// 	for(let i in body){
// 	  bodyKeys.push(i);
// 	  bodyValues.push(body[i])
// 	}

// 	bodyKeys.forEach((e) => {
// 		if(e.charAt(2) == 'n'){
// 			links.push(
// 				{
// 					"name" :  bodyValues[bodyKeys.indexOf(e)]
// 				}
// 			)
// 		}
// 	})

// 	body.links = links;

// 	return body;	
// }

module.exports = function prepareLinkTree(body){
	const {tittle, ...links} = body; // extrai a chave title e as demais chaves de links do objeto body
  
	const linkTree = {
	  tittle,
	  links: []
	};
  
	// for (let i = 1; i <= 3; i++) {
	//   const linkName = links[`linkName${i}`];
	//   const linkUrl = links[`linkUrl${i}`];
  
	//   if (linkName && linkUrl) { // verifica se os nomes e urls estão definidos
	// 	linkTree.links.push({
	// 	  name: linkName,
	// 	  url: linkUrl
	// 	});
	//   }
	// }

	let i = 1;
	let hasMoreLinks = true;

	while (hasMoreLinks) {
	  const linkName = links[`linkName${i}`];
	  const linkUrl = links[`linkUrl${i}`];

	  if (linkName && linkUrl) {
	    linkTree.links.push({
	      name: linkName,
	      url: linkUrl
	    });
	    i++;
	  } else {
	    hasMoreLinks = false;
	  }
	}

  
	return linkTree;
}