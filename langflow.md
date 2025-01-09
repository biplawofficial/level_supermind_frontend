# LangFlow Pipeline Documentation

This document explains the LangFlow pipeline design for processing social media engagement data and generating meaningful chat outputs based on user input. Each component of the pipeline is described below, along with its connections to other components to illustrate the flow of data.

![image](https://github.com/user-attachments/assets/5df7ddc3-4a86-4b84-94e0-a12cfbf8917e)



---

## **1. File Component**
**Purpose:** Loads the social media engagement data file into the pipeline.
- **Path:** `social_media_engagement.csv`
- **Output:** Provides raw data for processing.

---

## **2. Split Text Component**
**Purpose:** Splits the input text data into smaller chunks based on specified criteria for better processing.
- **Inputs:**
  - **Data Inputs:** Connected from the File component.
  - **Chunk Overlap:** 200
  - **Chunk Size:** 800
  - **Separator:** Default separator for splitting text.
- **Output:** Provides text chunks as output for further processing.

---

## **3. Chat Input Component**
**Purpose:** Receives user input for querying the pipeline.
- **Input:** Text input field for user queries.
- **Output:** Sends user queries downstream for processing.

---

## **4. Combine Text Component**
**Purpose:** Concatenates two text sources into a single text chunk.
- **Inputs:**
  - **First Text:** Receives processed chunks from the Split Text component.
  - **Second Text:** Optionally combines with additional inputs.
  - **Delimiter:** Specifies the delimiter for concatenation.
- **Output:** Combined text used for retrieval and further analysis.

---

## **5. Astra DB Component**
**Purpose:** Provides a vector database for storing and retrieving data with search capabilities.
- **Inputs:**
  - **Database:** `social`
  - **Collection:** `data`
  - **Embedding Model:** Uses Astra Vectorize with Hugging Face.
  - **Model:** `BAAI/bge-small-en-v1.5`
- **Output:** Processes data for retrieval and connects to the Groq component.

---

## **6. Parse Data Component**
**Purpose:** Converts retrieved data into plain text format following a specified template.
- **Inputs:**
  - **Template:** `{text}`
  - **Data:** Receives retrieved data from Astra DB.
- **Output:** Parsed text prepared for generating responses.

---

## **7. Groq Component**
**Purpose:** Generates text output using a language model.
- **Inputs:**
  - **Input:** Receives parsed data from the Parse Data component.
  - **System Message:** Allows additional system-level instructions.
  - **Groq API Key:** Configures API access.
  - **Model:** `llama-3-1-8b-instant`
  - **Temperature:** 0.1 for low randomness and more deterministic output.
- **Output:** Text generated based on input data.

---

## **8. Chat Output Component**
**Purpose:** Displays the final chat response to the user.
- **Input:** Receives processed text from the Groq component.
- **Output:** Displays the generated message to the user in the Playground.

---

## **Pipeline Flow Overview:**
1. **File** loads social media engagement data.
2. **Split Text** divides the data into smaller chunks for efficient processing.
3. **Chat Input** takes user queries.
4. **Combine Text** merges relevant text data for contextual understanding.
5. **Astra DB** stores and retrieves relevant data using embeddings.
6. **Parse Data** formats retrieved data into plain text.
7. **Groq** processes the text using a language model and generates responses.
8. **Chat Output** displays the generated response to the user.

---


