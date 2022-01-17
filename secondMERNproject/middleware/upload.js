const path = require("path")

/**************************************************/
/*************** BEGIN IMG UPLOAD *****************/
/**************************************************/

module.exports = {
    myImgUploadFunction: (req, res) => {
        if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }

      const file = req.files.mypic;
      console.log(__dirname+'/../public/images/'+file.name)

      var filetypes = /jpeg|jpg|png/;
      var mimetype = filetypes.test(file.mimetype);

      var extname = filetypes.test(path.extname(
                  file.name).toLowerCase());

      if (!mimetype || !extname) {
        return res.status(500).send("Error: File upload only supports the following filetypes - " + filetypes);
      }


      file.mv(`${__dirname}/../public/images/${file.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }

        // res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      });
      console.log('Exported!');
    },

    myPdfUploadFunction: (req, res) => {
        if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }

      const file = req.files.mywork;
      console.log(__dirname+'/../public/pdf/'+file.name)

      var filetypes = /pdf/;
      var mimetype = filetypes.test(file.mimetype);

      var extname = filetypes.test(path.extname(
                  file.name).toLowerCase());

      if (!mimetype || !extname) {
        return res.status(500).send("Error: File upload only supports the following filetypes - " + filetypes);
      }


      file.mv(`${__dirname}/../public/pdf/${file.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }

        // res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      });
      console.log('Exported!');
    },

    myUploadVar: 'Teste'
}
/**************************************************/
/**************** END IMG UPLOAD ******************/
/**************************************************/
