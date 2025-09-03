function getAuthors(authorsArray) {
  let authors = "";
  let cleanedArray = authorsArray.map((e) => {
    e.name;
  });

  cleanedArray.forEach((e) => {
    if (cleanedArray.length == e) {
      authors = authors + "e" + e;
    } else {
      authors = authors + e + "," + "<br/>";
    }
  });
  return authors;
}
