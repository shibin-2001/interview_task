// import bcrypt from "bcry?pt";

const bcrypt = require('bcrypt')
async function main(){
    const Salt = await bcrypt.genSalt();
    let password = await bcrypt.hash('admin', Salt);
    console.log(password)
}
main()