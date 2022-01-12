import { products } from './data';

export async function insertSeedData(ks: any) {
  // Keystone API changed, so we need to check for both versions to get keystone
  const keystone = ks.keystone || ks;
  const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter;

  console.log(`🌱 Inserting Seed Data: ${products.length} Products`);
  //grabbing Keystone Mongoose adapter
  const { mongoose } = adapter;
  //loop over every single product
  for (const product of products) {
    console.log(`  🛍️ Adding Product: ${product.name}`);
    const { _id } = await mongoose
    //taking product image create image then create product
    .model('ProductImage')
    .create({ image: product.photo, altText: product.description });
    product.photo = _id;
    await mongoose.model('Product').create(product);
  }
  console.log(`✅ Seed Data Inserted: ${products.length} Products`);
  console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``);
  process.exit();
}
