const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const database = client.db("pro-man");
const projectCollection = database.collection("projects");

export const fetchProjects = async() => {
  try {
    const result = await projectCollection.find().toArray();
    return result;
  } catch(error) {
    console.log(error);
  }
}

export const fetchProject = async(id) => {
  try {
    const result = await projectCollection.findOne({id: id});
    return result;
  } catch(error) {
    console.log(error);
  }
}