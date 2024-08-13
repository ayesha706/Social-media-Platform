const mongoose= require('mongoose');

module.exports.connectDB = async()=>{
mongoose.connect('mongodb://127.0.0.1:27017/media')
.then(()=>{
    console.log('DB connected');
})
.catch(err=>{
    console.error(err);
})
}