import { ChromaClient, OpenAIEmbeddingFunction } from "./deps.ts";
const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: Deno.env.get("OPENAI_API_KEY"),
});
const client = new ChromaClient({
  path: "http://localhost:8000",
});

const collection = await client.getOrCreateCollection({
  name: "chord",
  embeddingFunction: embedder,
});
await collection.add({
  ids: ["id1", "id2", "id3"],
  documents: ["lorem ipsum", "doc2", "doc3"],
});

const results = await collection.query({
  nResults: 2,
  queryTexts: ["lorem ipsum"],
});
console.log("results", results);
