const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())
const port = 3000;

const Filme = mongoose.model('Film', { 
    title: String, 
    description: String,
    image_url: String,
    trailer_url: String
});

app.post('/', async (req, res) => {
    const film = new Filme({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })
    await film.save()
    return res.send(film)
})

app.get('/', async (req, res) => {
    const films = await Filme.find()
    return res.send(films)
});

app.delete("/:id", async(req, res) =>{
    const film = await Filme.findByIdAndDelete(req.params.id)
    return res.send(film)
});

app.put('/:id', async (req, res) => {
    const film = await Filme.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })
    return res.send(film);
});

app.listen(port, () => {
    mongoose.connect('mongodb+srv://lucassrs2022:fbKnf7sSqaC9eHC1@cluster0.sqfei5c.mongodb.net/?retryWrites=true&w=majority');
    console.log(`teste feito pela porta ${port}`)
});
