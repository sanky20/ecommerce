import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config(); // why do we need this? -> to use the environment variables in the .env file 

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".green.inverse);
    process.exit();

  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};



if(process.argv[2]=== '-d')
{
    destroyData();
}
else
{
    importData();
}



// console.log(process.argv);

// // on running command -> node backend/seeder -d
// // we get output-> 
// /*
// [
//   'C:\\Program Files\\nodejs\\node.exe',
//   'G:\\Web Development\\ecommerce\\backend\\seeder',
//   '-d'
// ]
// */
// // whatever is after backend/seeder is passed as an element stored in the array 


