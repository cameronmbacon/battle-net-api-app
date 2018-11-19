const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    // sub: '78649020',
    sub: String,
    // id: 78649020,
    bnetId: String,
    // battletag: 'BaconIsMetaL#1101',
    battletag: String,
    // provider: 'bnet',
    provider: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;