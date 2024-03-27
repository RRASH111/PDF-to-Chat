# PDF to Chat

PDF to Chat is a web application designed to facilitate contextual discussions around PDF documents. It leverages modern technologies such as Next.js 14, TypeScript, tRPC, Prisma, and Kinde Auth to provide users with a seamless experience. By integrating LangChain, OpenAI API, and Pinecone, PDF to Chat enables users to upload their PDF files and engage in conversations based on the content of these documents.

## Features

- **Upload PDF Files**: Users can easily upload their own PDF files through the web interface.
- **Contextual Chat**: PDF to Chat extracts the content from the uploaded PDF files and allows users to engage in chat discussions based on this content.
- **Secure Authentication**: Kinde Auth ensures secure authentication for users accessing the application.
- **Advanced AI Integration**: The integration of LangChain, OpenAI API, and Pinecone enables advanced natural language processing and understanding, enhancing the contextual relevance of the chat discussions.

## Technologies Used

- **Next.js 14**: A popular React framework for building server-side rendered and statically generated web applications.
- **TypeScript**: A statically typed superset of JavaScript that enhances code maintainability and developer productivity.
- **tRPC**: A framework for building typesafe, fast, and reliable APIs in TypeScript.
- **Prisma**: A modern database toolkit for TypeScript and Node.js that simplifies database access and management.
- **Kinde Auth**: A secure authentication solution implemented to ensure user authentication and authorization.
- **LangChain**: A language processing tool utilized for text extraction and analysis from PDF files.
- **OpenAI API**: OpenAI's powerful API used for natural language understanding and generation.
- **Pinecone**: Pinecone is utilized for enhancing search capabilities or other AI-related functionalities within the application.

## Getting Started

To run the PDF to Chat application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/RRASH111/PDF-to-Chat.git
   ```

2. Navigate to the project directory:

   ```bash
   cd pdf-to-chat
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure environment variables. You might need to set up environment variables for authentication tokens and other sensitive information.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Access the application at `http://localhost:3000`.



## Acknowledgements

- **Next.js Community**: For the powerful framework enabling efficient web development.
- **Prisma Team**: For the robust database toolkit simplifying data access.
- **OpenAI Team**: For providing advanced natural language processing capabilities through the API.
