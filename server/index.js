const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const allowCORS = app => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
}
allowCORS(app)

const bueller = 'Life moves pretty fast. If you don\'t stop and look around once in awhile, you could miss it. I do have a test today, that wasn\'t bull-s--t. It\'s on European socialism. I mean really, what\'s the point. I\'m not European. I don\'t plan on being European, so who gives a crap if they\'re socialists. They could be fascist anarchists and it still wouldn\'t change the fact that I don\'t own a car. (Singing in shower) It\'s not that I condone fascism or any \'ism\' for that matter. Ism\'s, in my opinion, are not good. A person should not believe in an \'ism,\' he should believe in himself. I quote John Lesson: \'I don\'t believe in Beatles. I just believe in me.\' A good point there. After all, he was the walrus. I could be the walrus. I\'d still have to bum rides off of people.'

app.use(fileUpload())

app.get('/info', async (request, response) => {
  await sleep(3000)
  return response.send(bueller)
})

app.post('/upload', (request, response) => {
  console.log(request)
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
