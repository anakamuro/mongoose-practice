const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
  console.log('Connection OK!!!')
})
.catch(err=> {
    console.log('Connection error!!!');
    console.log(err);
})

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        maxLength: 20
    },
    price: {
        type: Number,
        required: true, 
        min: [0, 'price must be bigger than 0']
    }, 
    onSale: {
        type: Boolean, 
        default: false
    }, 
    categories: [String], 
    qty: {
        online: {
            type: Number, 
            default: 0
        }, 
        inStore: {
            type: Number, 
            default: 0
        },
    },
    size: {
        type: String, 
        enum: ['S', 'M', 'L']
    }
});

productSchema.methods.greet = function(){
    console.log('hello, yahooo')
    console.log(`- calling from ${this.name}`)
}
productSchema.methods.toggleOnSale = function(){
  this.onSale = !this.onSale;
  return this.save();
}
productSchema.statics.fireSale = function(newCat){
  return this.updateMany({}, { onSale: true, price: 0});
}
productSchema.methods.addCategory = function(newCat){
    this.categories.push(newCat)
    return this.save();
  }
const Product = mongoose.model('Product', productSchema);

const findProduct = async() => {
    const foundProduct = await Product.findOne({name: 'mountain bike'});
    console.log(foundProduct)
    await foundProduct.toggleOnSale()
    console.log(foundProduct)
    await foundProduct.addCategory('outdoor')
    console.log(foundProduct)
}

// findProduct()

Product.fireSale().then(msg => console.log(msg));

// const bike = new Product({
//     name: "jergy", 
//     price: 2980, 
//     categories: ['cycling'],
//     size: 'S'
// })

// bike.save()
// .then(data => {
//     console.log('success!!');
//     console.log(data);
// })
// .catch(err=> {
//     console.log('Error!!!');
//     console.log(err);
// })
// Product.findOneAndUpdate({name: 'air pump'}, {price: -1980}, {new: true, runValidators: true})
//         .then(data => {
//             console.log('success!!');
//             console.log(data);
//         })
//         .catch(err=> {
//             console.log('Error!!!');
//             console.log(err);
//         })