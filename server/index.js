const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

const allowCORS = app => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
}
allowCORS(app)

app.use(fileUpload())

app.post('/upload', (request, response) => {
  const file = request.files.fileToUpload
  if (file.size >= 32768) {
    console.log('file too large; returning 400')
//    response.statusCode = 400
//    response.write('File too large')
//    return response.end()

//    response.statusMessage = "File too large"
//    response.status(400).end()

    return response.status(400).send('File too large')
  }

  file.mv(`./upload${file.name}`, err => {
    if (err) {
      console.log('unable to move; returning 400')
      response.statusCode = 500
      response.write('unable to move file')
      return response.end()
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
