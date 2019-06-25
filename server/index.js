const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

app.use(fileUpload())

app.post('/upload', (request, response) => {
  if (Object.keys(request.files).length == 0)
    return response.status(400).send('No files were uploaded.')

  const file = request.files.fileToUpload
  if (file.size >= 32768)
    return response.status(400).send('File too large')

  file.mv(`./upload${file.name}`, err => {
    if (err) {
      response.status = 500
      response.send('unable to move file')
      response.end()
    }
    else
      return response.send('file uploaded')
  })
})

const port = 3001
app.listen(port, (err) => {
  if (err)
    return console.log('ERROR: ', err);

  console.log(`server listening on ${port}`);
})
