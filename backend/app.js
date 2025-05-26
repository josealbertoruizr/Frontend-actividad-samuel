import express from 'express';
import {createClient} from '@supabase/supabase-js'
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const supabase = supabaseClient.createClient({
  apiKey: process.env.SUPABASE_ANON_KEY,
  project: process.env.SUPABASE_URL
});

app.get('/todos', async (req, res) => {
    const {data, error} = await supabase
        .from('tareas')
        .select()
    res.send(data);
});

app.get('/todos/:id', async (req, res) => {
    const {data, error} = await supabase
        .from('tareas')
        .select()
        .is('id', req.params.id)
    res.send(data);
});

app.post('/todos', async (req, res) => {
    const {error} = await supabase
        .from('tareas')
        .insert({
            tarea_name: req.body.tarea_name,
            tarea_description: req.body.tarea_description,
        })
    if (error) {
        res.send(error);
    }
    res.send("created!!");
});

app.put('/todos/:id', async (req, res) => {
    const {error} = await supabase
        .from('tareas')
        .update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        })
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("updated!!");
});

app.delete('/todos/:id', async (req, res) => {
    const {error} = await supabase
        .from('products')
        .delete()
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("deleted!!")

});

app.get('/', (req, res) => {
    res.send("Hello I am working my friend Supabase <3");
});

app.get('*', (req, res) => {
    res.send("Hello again I am working my friend to the moon and behind <3");
});

app.listen(5000, () => {
    console.log("Ready on http://localhost:5000");
});