# Analytix - Social Media Analytics Platform

A comprehensive social media analytics dashboard that leverages Langflow, DataStax Astra DB, and GPT integration for real-time engagement analysis and AI-powered insights.

## Live Application
- Production URL: https://analytixs.vercel.app/
- Status: Active

## Overview

Analytix is a powerful analytics module that processes and analyzes engagement data from social media accounts. It combines DataStax Astra DB's vector database capabilities with Langflow's intelligent workflows to provide real-time analytics and GPT-powered insights.

## Core Features

- **Real-time Analytics Dashboard**
  - Performance overview cards
  - Interactive data visualizations
  - Detailed data grid with advanced filtering
  - Custom metric tracking

- **AI-Powered Analysis**
  - GPT-integrated insights generation
  - Intelligent chatbot assistant
  - Automated performance analysis
  - Post type comparison analytics

- **Data Management**
  - Real-time data processing
  - Advanced filtering and search
  - Sortable and paginated data views
  - Custom metric calculations

## Technical Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: DataStax Astra DB
- **AI Integration**: 
  - Langflow for workflow orchestration
  - Groq's llama-3-1-8b-instant for insights
- **Deployment**: Render Web Services

## Prerequisites

- Node.js (Latest LTS version)
- DataStax Astra DB account
- Groq's API access
- Langflow installation

## Installation

1. Clone the repository:
```bash
git clone https://github.com/biplawofficial/level_supermind_frontend.git

```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Required environment variables:
```
ASTRA_DB_TOKEN=your_token
BASE_API_URL=your_endpoint
FLOW_ID=your_key
APPLICATION_TOKEN=your_key
LANGFLOW_API_URL=your_url
```

## System Architecture

### Frontend Components
- Landing page with feature showcase
- Analytics dashboard with performance cards
- Detailed Data visualization section
- Chat interface for AI insights

### Backend Services
- Proxy server for API management
- Data processing pipeline
- Vector store implementation

## API Endpoints

### Chat API
```javascript
POST /chat
{
  "input_value": string,
  "requestId": string
}
```



## Data Models

### Post Data Structure
```typescript
interface PostData {
  Post_ID: string;
  Post_Type: 'Reel' | 'Carousel' | 'Static Image | 'Video"';
  Likes: number;
  Shares: number;
  Comments: number;
  Date_Posted: string;
  Time_posted: string;
}
```


## Development

### Running Locally
```bash
# Start development server
node server 

```


## Performance Optimizations
- Virtual scrolling for large datasets
- Response caching
- Lazy loading of components
- Asset optimization
- Connection pooling
- Request batching

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For technical support or queries:
1. Submit an issue in the GitHub repository
2. Contact the development team
3. Check the technical documentation

---

For detailed technical specifications and implementation details, please refer to the complete technical documentation.
