const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)

        console.log('Database is connected')
    } catch (error) {
        console.error(error.message)
        // exit process with failure
        process.exit(1)
    }


}

module.exports = connectDB