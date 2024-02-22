const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
  console.log('Connection OK!!!')
})
.catch(err=> {
    console.log('Connection error!!!');
    console.log(err);
})

const personSchema = new mongoose.Schema({
    first: String, 
    last: String
});

personSchema.virtual('fullName').get(function(){
    return `${this.first} ${this.last}`
})
personSchema.pre('save', async function(){
    this.first = 'hoge';
    this.last = 'moge';
    console.log('I will save from now')
})
personSchema.post('save', async function(){
    console.log('I saved')
})

const Person = mongoose.model('Person', personSchema)