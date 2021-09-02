
module.exports = {
    multipleMongooseToObject: function(moongooses){
        return moongooses.map(moongoose => moongoose.toObject())
    },

    mongooseToObject: function (mongoose) {
            return mongoose ? mongoose.toObject() : mongoose;
    }
};