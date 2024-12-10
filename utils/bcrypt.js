import bcrypt from "bcrypt";

const generatehashedPassword = async (password) => {
    return await bcrypt.hash(password, 10);
   
};

const  comparePassword = async(password,userPassword)=>{
    return await bcrypt.compare(password,userPassword)
}
export {generatehashedPassword,comparePassword};
