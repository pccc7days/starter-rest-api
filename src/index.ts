import CyclicDb from "@cyclic.sh/dynamodb"
import express, { Request, Response } from 'express';
const dotenv = require('dotenv');
dotenv.config();

const db = CyclicDb(process.env.CYCLIC_DB)

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
app.use(express.static('public', options))

app.get('/:col/:key', async (req: Request, res: Response) => {
    const col = req.params.col
    const key = req.params.key
    console.log(`from collection: ${col} get key: ${key} with params ${JSON.stringify(req.params)}`)
    const item = await db.collection(col).get(key)
    console.log(JSON.stringify(item, null, 2))
    res.json(item).end()
});

app.get('/:col', async (req: Request, res: Response) => {
    const col = req.params.col
    console.log(`list collection: ${col} with params: ${JSON.stringify(req.params)}`)
    const items = await db.collection(col).list()
    console.log(JSON.stringify(items, null, 2))
    res.json(items).end()
});

app.post('/:col/:key', async (req: Request, res: Response) => {
    console.log(req.body)

    const col = req.params.col
    const key = req.params.key
    console.log(`from collection: ${col} set key: ${key} with params ${JSON.stringify(req.params)}`)
    const item = await db.collection(col).set(key, req.body)
    console.log(JSON.stringify(item, null, 2))
    res.json(item).end()
});

// Delete an item
app.delete('/:col/:key', async (req: Request, res: Response) => {
    const col = req.params.col
    const key = req.params.key
    console.log(`from collection: ${col} delete key: ${key} with params ${JSON.stringify(req.params)}`)
    const item = await db.collection(col).delete(key)
    console.log(JSON.stringify(item, null, 2))
    res.json(item).end()
});

app.use('*', (req, res) => {
    res.json({ msg: 'no route handler found' }).end()
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});